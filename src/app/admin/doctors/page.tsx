"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowLeft,
  UserCircle,
  Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  adminDeleteDoctor,
  adminGetAllDoctors,
} from "@/lib/actions/doctors.action";
import {
  Doctor,
  DoctorGender,
  DoctorSpecialty,
  DoctorStatus,
} from "@/lib/domains/doctors.domain";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { getImage } from "@/lib/appwrite/bucket";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [doctorImages, setDoctorImages] = useState<Record<string, string>>({});

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await adminGetAllDoctors();
        if (response.error) {
          toast(response.error);
        } else {
          setDoctors(response.data as unknown as Doctor[]);
        }
      } catch {
        toast("Failed to fetch doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Add new useEffect for loading images
  useEffect(() => {
    const loadDoctorImages = async () => {
      const imagePromises = doctors.map(async (doctor) => {
        if (!doctor.photo_url) return null;

        try {
          const response = await getImage(doctor.photo_url);
          if (response.data?.file) {
            // Convert ArrayBuffer to Blob and create object URL
            const blob = new Blob([response.data.file]);
            const imageUrl = URL.createObjectURL(blob);

            return {
              id: doctor.$id,
              url: imageUrl,
            };
          }
        } catch (error) {
          console.error(
            `Failed to load image for doctor ${doctor.$id}:`,
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

      setDoctorImages(imageMap);
    };

    if (doctors.length > 0) {
      loadDoctorImages();
    }
  }, [doctors]);

  const handleDeleteDoctor = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await adminDeleteDoctor(id);
      if (response.error) {
        toast(response.error);
      } else {
        toast("Doctor deleted successfully");
        // Remove the deleted doctor from the list
        setDoctors(doctors.filter((doctor) => doctor.$id !== id));
      }
    } catch {
      toast("Failed to delete doctor");
    } finally {
      setIsDeleting(false);
      setConfirmDelete(null);
    }
  };

  const handleExportCSV = () => {
    try {
      // Use filtered doctors to respect current filters
      const dataToExport = filteredDoctors;

      if (dataToExport.length === 0) {
        toast("No doctors to export");
        return;
      }

      // Define CSV headers
      const headers = [
        "ID",
        "Photo URL",
        "First Name",
        "Last Name",
        "Email",
        "Phone",
        "Date of Birth",
        "Gender",
        "Address",
        "Specialty",
        "Department",
        "Medical License Number",
        "Years of Experience",
        "Status",
        "Education and Training",
        "Biography",
        "Languages",
        "Working Hours",
      ];

      // Convert doctors data to CSV rows
      const csvRows = dataToExport.map((doctor) => [
        doctor.$id,
        doctor.photo_url || "",
        doctor.first_name,
        doctor.last_name,
        doctor.email,
        doctor.phone,
        doctor.dob ? new Date(doctor.dob).toLocaleDateString() : "",
        DoctorGender[doctor.gender],
        doctor.address.replace(/,/g, ";"), // Replace commas to avoid CSV issues
        doctor.specialty,
        doctor.department,
        doctor.medical_license_number,
        doctor.years_of_experience,
        getStatusName(doctor.status),
        doctor.education_and_training?.replace(/,/g, ";") || "",
        doctor.biography?.replace(/,/g, ";") || "",
        doctor.languages?.replace(/,/g, ";") || "",
        doctor.working_hours?.replace(/,/g, ";") || "",
      ]);

      // Combine headers and rows
      const csvContent = [headers, ...csvRows]
        .map((row) => row.map((field) => `"${field}"`).join(","))
        .join("\n");

      // Create and download the file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `doctors-export-${new Date().toISOString().split("T")[0]}.csv`
      );
      link.style.visibility = "hidden";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast(`Exported ${dataToExport.length} doctors to CSV`);
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast("Failed to export CSV");
    }
  };

  // Get status name from enum
  const getStatusName = (status: DoctorStatus) => {
    return DoctorStatus[status];
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const fullName = `${doctor.first_name} ${doctor.last_name}`.toLowerCase();
    const matchesSearch =
      fullName.includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      specialtyFilter === "all" ||
      doctor.specialty.toString() === specialtyFilter;

    const matchesStatus =
      statusFilter === "all" || doctor.status.toString() === statusFilter;

    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, specialtyFilter, statusFilter]);

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
                <CardTitle>Doctors</CardTitle>
                <CardDescription>
                  A list of all doctors in the system
                </CardDescription>
              </div>
              <div className="flex gap-2">
                {/* <Button variant="outline" asChild>
                  <Link href="/admin/doctors/import">
                    <Upload className="mr-2 h-4 w-4" />
                    Import Doctors
                  </Link>
                </Button> */}
                <Button variant="outline" onClick={handleExportCSV}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
                <Button asChild>
                  <Link href="/admin/doctors/create">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Doctor
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
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={specialtyFilter}
                  onValueChange={setSpecialtyFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    {Object.keys(DoctorSpecialty)
                      .filter((key) => !isNaN(Number(key)))
                      .map((key) => (
                        <SelectItem key={key} value={key}>
                          {DoctorSpecialty[Number(key)]}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {Object.keys(DoctorStatus)
                      .filter((key) => !isNaN(Number(key)))
                      .map((key) => (
                        <SelectItem key={key} value={key}>
                          {DoctorStatus[Number(key)]}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
            {loading ? (
              <div className="flex justify-center py-8">
                <p>Loading doctors...</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>License</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentDoctors.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4">
                          No doctors found
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentDoctors.map((doctor) => (
                        <TableRow key={doctor.$id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 overflow-hidden rounded-full bg-muted flex items-center justify-center">
                                {doctorImages[doctor.$id] ? (
                                  <Image
                                    src={doctorImages[doctor.$id]}
                                    alt={`${doctor.first_name} ${doctor.last_name}`}
                                    width={40}
                                    height={40}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <UserCircle className="h-6 w-6 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <p>
                                  Dr. {doctor.first_name} {doctor.last_name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {doctor.department}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{doctor.email}</p>
                              <p className="text-sm text-muted-foreground">
                                {doctor.phone}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{doctor.specialty}</Badge>
                          </TableCell>
                          <TableCell>
                            {doctor.years_of_experience} years
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {doctor.medical_license_number}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                doctor.status === DoctorStatus.ACTIVE
                                  ? "default"
                                  : doctor.status === DoctorStatus.ON_LEAVE
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {getStatusName(doctor.status)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link
                                    href={`/admin/doctors/${doctor.$id}/edit`}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    View / Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => setConfirmDelete(doctor.$id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Pagination */}
            {filteredDoctors.length > 0 && (
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
              Are you sure you want to delete this doctor? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => confirmDelete && handleDeleteDoctor(confirmDelete)}
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
