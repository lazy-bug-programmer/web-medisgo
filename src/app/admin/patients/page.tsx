"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  ArrowLeft,
  Loader2,
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
  adminDeletePatient,
  adminGetAllPatients,
} from "@/lib/actions/patients.action";
import {
  Patient,
  PatientBloodType,
  PatientGender,
} from "@/lib/domains/patients.domain";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatDate } from "@/lib/utils";

// Helper function to format patient data for display
const formatPatientForDisplay = (patient: Patient) => {
  const bloodTypeMap: Record<number, string> = {
    [PatientBloodType.A_POSITIVE]: "A+",
    [PatientBloodType.A_NEGATIVE]: "A-",
    [PatientBloodType.B_POSITIVE]: "B+",
    [PatientBloodType.B_NEGATIVE]: "B-",
    [PatientBloodType.AB_POSITIVE]: "AB+",
    [PatientBloodType.AB_NEGATIVE]: "AB-",
    [PatientBloodType.O_POSITIVE]: "O+",
    [PatientBloodType.O_NEGATIVE]: "O-",
  };

  const genderMap: Record<number, string> = {
    [PatientGender.MALE]: "Male",
    [PatientGender.FEMALE]: "Female",
    [PatientGender.OTHERS]: "Other",
  };

  return {
    id: patient.$id,
    name: `${patient.first_name} ${patient.last_name}`,
    email: patient.email,
    dateOfBirth: formatDate(new Date(patient.dob)),
    gender: genderMap[patient.gender] || "Unknown",
    bloodType: bloodTypeMap[patient.blood_type] || "Unknown",
    status: "Active", // You might want to add a status field to your Patient domain
    emergencyContact: `${patient.emergency_contact_name} - ${patient.emergency_contact_phone}`,
  };
};

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await adminGetAllPatients();
        if (result.error) {
          setError(result.error);
        } else {
          setPatients((result.data as unknown as Patient[]) || []);
        }
      } catch (err) {
        setError("Failed to fetch patients. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleDeletePatient = async (patientId: string) => {
    if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
        const result = await adminDeletePatient(patientId);
        if (result.error) {
          setError(result.error);
        } else {
          // Remove the deleted patient from the state
          setPatients(patients.filter((p) => p.$id !== patientId));
        }
      } catch (err) {
        setError("Failed to delete patient. Please try again later.");
        console.error(err);
      }
    }
  };

  const displayPatients = patients.map(formatPatientForDisplay);

  const filteredPatients = displayPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      patient.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

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
                <CardTitle>Patients</CardTitle>
                <CardDescription>
                  A list of all patients in the system
                </CardDescription>
              </div>
              <Button asChild>
                <Link href="/admin/patients/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Patient
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Error display */}
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Filters */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-lg">Loading patients...</span>
              </div>
            ) : (
              <>
                {/* Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date of Birth</TableHead>
                        <TableHead>Blood Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPatients.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={7}
                            className="text-center py-8 text-muted-foreground"
                          >
                            {searchTerm || statusFilter !== "all"
                              ? "No patients match your search criteria"
                              : "No patients found in the system"}
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPatients.map((patient) => (
                          <TableRow key={patient.id}>
                            <TableCell className="font-medium">
                              <div>
                                <p>{patient.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {patient.gender}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>{patient.email}</TableCell>
                            <TableCell>{patient.dateOfBirth}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {patient.bloodType}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  patient.status === "Active"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {patient.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link
                                      href={`/admin/patients/${patient.id}/edit`}
                                    >
                                      <Edit className="mr-2 h-4 w-4" />
                                      View / Edit
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() =>
                                      handleDeletePatient(patient.id)
                                    }
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

                {/* Pagination */}
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredPatients.length} of {patients.length}{" "}
                    patients
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      1
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
