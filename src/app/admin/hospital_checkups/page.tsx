"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  Stethoscope,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import { HospitalCheckups } from "@/lib/domains/hospital_checkups.domain";
import { Hospital } from "@/lib/domains/hospitals.domain";
import {
  adminGetAllHospitalCheckups,
  adminDeleteHospitalCheckup,
} from "@/lib/actions/hospital_checkups.action";
import { adminGetAllHospitals } from "@/lib/actions/hospitals.action";
import { getImage } from "@/lib/appwrite/bucket";

export default function HospitalCheckupsPage() {
  const [hospitalCheckups, setHospitalCheckups] = useState<HospitalCheckups[]>(
    []
  );
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [hospitalFilter, setHospitalFilter] = useState("all");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [checkupImages, setCheckupImages] = useState<Record<string, string>>(
    {}
  );

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch both hospital checkups and hospitals
        const [checkupsResponse, hospitalsResponse] = await Promise.all([
          adminGetAllHospitalCheckups(),
          adminGetAllHospitals(),
        ]);

        if (checkupsResponse.error) {
          toast(checkupsResponse.error);
        } else {
          setHospitalCheckups(
            checkupsResponse.data as unknown as HospitalCheckups[]
          );
        }

        if (hospitalsResponse.error) {
          toast(hospitalsResponse.error);
        } else {
          setHospitals(hospitalsResponse.data as unknown as Hospital[]);
        }
      } catch {
        toast("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Load images for hospital checkups
  useEffect(() => {
    const loadCheckupImages = async () => {
      const imagePromises = hospitalCheckups.map(async (checkup) => {
        if (!checkup.image_url) return null;

        try {
          const response = await getImage(checkup.image_url);
          if (response.data?.file) {
            // Convert ArrayBuffer to Blob and create object URL
            const blob = new Blob([response.data.file]);
            const imageUrl = URL.createObjectURL(blob);

            return {
              id: checkup.$id,
              url: imageUrl,
            };
          }
        } catch (error) {
          console.error(
            `Failed to load image for checkup ${checkup.$id}:`,
            error
          );
        }
        return null;
      });

      const results = await Promise.all(imagePromises);
      const imageMap: Record<string, string> = {};

      results.forEach((result) => {
        if (result) {
          imageMap[result.id] = result.url;
        }
      });

      setCheckupImages(imageMap);
    };

    if (hospitalCheckups.length > 0) {
      loadCheckupImages();
    }
  }, [hospitalCheckups]);

  const handleDeleteHospitalCheckup = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await adminDeleteHospitalCheckup(id);
      if (response.error) {
        toast(response.error);
      } else {
        toast("Hospital checkup deleted successfully");
        // Remove the deleted checkup from the list
        setHospitalCheckups(
          hospitalCheckups.filter((checkup) => checkup.$id !== id)
        );
      }
    } catch {
      toast("Failed to delete hospital checkup");
    } finally {
      setIsDeleting(false);
      setConfirmDelete(null);
    }
  };

  // Get hospital name by ID
  const getHospitalName = (hospitalId: string) => {
    const hospital = hospitals.find((h) => h.$id === hospitalId);
    return hospital?.name || "Unknown Hospital";
  };

  const filteredCheckups = hospitalCheckups.filter((checkup) => {
    const matchesSearch =
      checkup.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      checkup.short_description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      getHospitalName(checkup.hospital_id)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesHospital =
      hospitalFilter === "all" || checkup.hospital_id === hospitalFilter;

    return matchesSearch && matchesHospital;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredCheckups.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCheckups = filteredCheckups.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, hospitalFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Hospital Checkups</CardTitle>
                <CardDescription>
                  A list of all hospital checkups in the system
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button asChild>
                  <Link href="/admin/hospital_checkups/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Hospital Checkup
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search checkups..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={hospitalFilter}
                  onValueChange={setHospitalFilter}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Hospitals</SelectItem>
                    {hospitals.map((hospital) => (
                      <SelectItem key={hospital.$id} value={hospital.$id}>
                        {hospital.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div className="flex justify-center py-8">
                <p>Loading hospital checkups...</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Hospital</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentCheckups.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <Stethoscope className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">
                            No hospital checkups found
                          </p>
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentCheckups.map((checkup) => (
                        <TableRow key={checkup.$id}>
                          <TableCell>
                            <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
                              {checkupImages[checkup.$id] ? (
                                <Image
                                  src={checkupImages[checkup.$id]}
                                  alt={checkup.title}
                                  width={48}
                                  height={48}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <Stethoscope className="h-6 w-6 text-muted-foreground" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="font-medium">{checkup.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {checkup.short_description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {getHospitalName(checkup.hospital_id)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="font-medium">
                              ${checkup.price.toFixed(2)}
                            </span>
                          </TableCell>
                          <TableCell>
                            {new Date(checkup.$createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="outline" asChild>
                                <Link
                                  href={`/admin/hospital_checkups/${checkup.$id}/edit`}
                                >
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setConfirmDelete(checkup.$id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {filteredCheckups.length > 0 && (
              <div className="mt-6 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum: number;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={
                          currentPage === pageNum ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!confirmDelete}
        onOpenChange={(open) => !open && setConfirmDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this hospital checkup? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                confirmDelete && handleDeleteHospitalCheckup(confirmDelete)
              }
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
