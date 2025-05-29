"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Clock,
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
  adminGetAllAppointments,
  adminDeleteAppointment,
} from "@/lib/actions/appointments.action";
import { adminGetAllPatients } from "@/lib/actions/patients.action";
import { getDoctors } from "@/lib/actions/doctors.action";
import {
  AppointmentType,
  AppointmentPriority,
  Appointment,
} from "@/lib/domains/appointments.domain";
import { Patient } from "@/lib/domains/patients.domain";
import { Doctor } from "@/lib/domains/doctors.domain";
import { toast } from "sonner";

// Define interface for the patient and doctor maps
interface PatientMap {
  [key: string]: Patient;
}

interface DoctorMap {
  [key: string]: Doctor;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<PatientMap>({});
  const [doctors, setDoctors] = useState<DoctorMap>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch appointments
        const appointmentsResult = await adminGetAllAppointments();
        if (appointmentsResult.error) {
          toast(appointmentsResult.error);
          return;
        }

        // Fetch patients and create a map for easy lookup
        const patientsResult = await adminGetAllPatients();
        const patientsMap: PatientMap = {};
        if (patientsResult.data) {
          patientsResult.data.forEach((patient) => {
            // Ensure patient is of correct type before adding to map
            patientsMap[patient.$id] = patient as unknown as Patient;
          });
        }

        // Fetch doctors and create a map for easy lookup
        const doctorsResult = await getDoctors();
        const doctorsMap: DoctorMap = {};
        if (doctorsResult.data) {
          doctorsResult.data.forEach((doctor) => {
            // Ensure doctor is of correct type before adding to map
            doctorsMap[doctor.$id] = doctor as unknown as Doctor;
          });
        }

        // Cast appointments to correct type
        setAppointments(appointmentsResult.data as unknown as Appointment[]);
        setPatients(patientsMap);
        setDoctors(doctorsMap);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleDeleteAppointment = async (appointmentId: string) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      setIsDeleting(true);
      try {
        const result = await adminDeleteAppointment(appointmentId);
        if (result.error) {
          toast(result.error);
        } else {
          toast("Appointment cancelled successfully");
          // Remove from the list
          setAppointments(
            appointments.filter((app) => app.$id !== appointmentId)
          );
        }
      } catch {
        toast("Failed to cancel appointment");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    // Get patient and doctor data
    const patient = patients[appointment.patient_id];
    const doctor = doctors[appointment.doctor_id];

    if (!patient || !doctor) return false;

    const patientName =
      `${patient.first_name} ${patient.last_name}`.toLowerCase();
    const doctorName = `${doctor.first_name} ${doctor.last_name}`.toLowerCase();

    const matchesSearch =
      searchTerm === "" ||
      patientName.includes(searchTerm.toLowerCase()) ||
      doctorName.includes(searchTerm.toLowerCase());

    const matchesType =
      typeFilter === "all" ||
      appointment.appointment_type.toString() === typeFilter;

    const matchesPriority =
      priorityFilter === "all" ||
      appointment.priority.toString() === priorityFilter;

    return matchesSearch && matchesType && matchesPriority;
  });

  const formatDate = (dateString: string | Date): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const formatTime = (dateString: string | Date): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const getDurationLabel = (durationValue: number): string => {
    switch (durationValue) {
      case 0:
        return "Short";
      case 1:
        return "Medium";
      case 2:
        return "Long";
      default:
        return "Unknown";
    }
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
                <CardTitle>Appointments</CardTitle>
                <CardDescription>
                  A list of all appointments in the system
                </CardDescription>
              </div>
              <Button asChild>
                <Link href="/admin/appointments/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Appointment
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
                    placeholder="Search appointments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={priorityFilter}
                  onValueChange={setPriorityFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="0">{AppointmentPriority[0]}</SelectItem>
                    <SelectItem value="1">{AppointmentPriority[1]}</SelectItem>
                    <SelectItem value="2">{AppointmentPriority[2]}</SelectItem>
                    <SelectItem value="3">{AppointmentPriority[3]}</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="0">{AppointmentType[0]}</SelectItem>
                    <SelectItem value="1">{AppointmentType[1]}</SelectItem>
                    <SelectItem value="2">{AppointmentType[2]}</SelectItem>
                    <SelectItem value="3">{AppointmentType[3]}</SelectItem>
                    <SelectItem value="4">{AppointmentType[4]}</SelectItem>
                    <SelectItem value="5">{AppointmentType[5]}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Loading state */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading appointments...</span>
              </div>
            ) : (
              <>
                {/* Table */}
                {filteredAppointments.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAppointments.map((appointment) => {
                          const patient = patients[appointment.patient_id];
                          const doctor = doctors[appointment.doctor_id];
                          if (!patient || !doctor) return null;

                          return (
                            <TableRow key={appointment.$id}>
                              <TableCell className="font-medium">
                                {patient.first_name} {patient.last_name}
                              </TableCell>
                              <TableCell>
                                {doctor.first_name} {doctor.last_name}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <div>
                                    <p className="text-sm">
                                      {formatDate(appointment.datetime)}
                                    </p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {formatTime(appointment.datetime)}
                                    </p>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {
                                    AppointmentType[
                                      appointment.appointment_type
                                    ]
                                  }
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {getDurationLabel(appointment.duration)}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    appointment.priority === 3
                                      ? "destructive"
                                      : appointment.priority === 2
                                      ? "default"
                                      : appointment.priority === 1
                                      ? "secondary"
                                      : "outline"
                                  }
                                >
                                  {AppointmentPriority[appointment.priority]}
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
                                        href={`/admin/appointments/${appointment.$id}/edit`}
                                      >
                                        <Edit className="mr-2 h-4 w-4" />
                                        View / Edit
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() =>
                                        handleDeleteAppointment(appointment.$id)
                                      }
                                      disabled={isDeleting}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Cancel
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <p className="text-muted-foreground mb-4">
                      No appointments found
                    </p>
                    <Button asChild>
                      <Link href="/admin/appointments/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Schedule New Appointment
                      </Link>
                    </Button>
                  </div>
                )}

                {/* Pagination - Basic version for now */}
                {filteredAppointments.length > 0 && (
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredAppointments.length} of{" "}
                      {appointments.length} appointments
                    </p>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
