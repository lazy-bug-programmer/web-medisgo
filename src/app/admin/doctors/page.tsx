"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  ArrowLeft,
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

// Mock data for doctors
const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@medicare-hospital.com",
    phone: "+1 (555) 123-4567",
    specialty: "Cardiology",
    experience: "15 years",
    status: "Active",
    image: "/placeholder.svg?height=40&width=40&text=SJ",
    licenseNumber: "MD123456",
    department: "Cardiology",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    email: "michael.chen@medicare-hospital.com",
    phone: "+1 (555) 234-5678",
    specialty: "Neurology",
    experience: "12 years",
    status: "Active",
    image: "/placeholder.svg?height=40&width=40&text=MC",
    licenseNumber: "MD234567",
    department: "Neurology",
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@medicare-hospital.com",
    phone: "+1 (555) 345-6789",
    specialty: "Pediatrics",
    experience: "10 years",
    status: "Active",
    image: "/placeholder.svg?height=40&width=40&text=ER",
    licenseNumber: "MD345678",
    department: "Pediatrics",
  },
  {
    id: "4",
    name: "Dr. David Patel",
    email: "david.patel@medicare-hospital.com",
    phone: "+1 (555) 456-7890",
    specialty: "Orthopedics",
    experience: "18 years",
    status: "On Leave",
    image: "/placeholder.svg?height=40&width=40&text=DP",
    licenseNumber: "MD456789",
    department: "Orthopedics",
  },
];

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      specialtyFilter === "all" ||
      doctor.specialty.toLowerCase() === specialtyFilter;
    const matchesStatus =
      statusFilter === "all" ||
      doctor.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/dashboard">
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
              <Button asChild>
                <Link href="/admin/doctors/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Doctor
                </Link>
              </Button>
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
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Table */}
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
                  {filteredDoctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={doctor.image || "/placeholder.svg"}
                              alt={doctor.name}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p>{doctor.name}</p>
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
                      <TableCell>{doctor.experience}</TableCell>
                      <TableCell className="font-mono text-sm">
                        {doctor.licenseNumber}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            doctor.status === "Active"
                              ? "default"
                              : doctor.status === "On Leave"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {doctor.status}
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
                              <Link href={`/admin/doctors/${doctor.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/doctors/${doctor.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredDoctors.length} of {doctors.length} doctors
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
