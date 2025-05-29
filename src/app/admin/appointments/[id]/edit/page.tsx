/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Search, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

import {
  getAppointmentById,
  adminUpdateAppointment,
} from "@/lib/actions/appointments.action";
import { adminGetAllPatients } from "@/lib/actions/patients.action";
import { getDoctors } from "@/lib/actions/doctors.action";
import {
  AppointmentType,
  AppointmentPriority,
  Appointment,
} from "@/lib/domains/appointments.domain";
import { Patient } from "@/lib/domains/patients.domain";
import { Doctor, DoctorSpecialty } from "@/lib/domains/doctors.domain";

// Define interface for the patient and doctor maps
interface PatientMap {
  [key: string]: Patient;
}

interface DoctorMap {
  [key: string]: Doctor;
}

export default function EditAppointmentPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    datetime: "",
    appointment_type: "",
    duration: "",
    priority: "",
    notes: "",
  });

  const [id, setId] = useState<string>("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patientMap, setPatientMap] = useState<PatientMap>({});
  const [doctorMap, setDoctorMap] = useState<DoctorMap>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [patientOpen, setPatientOpen] = useState(false);
  const [doctorOpen, setDoctorOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        setId(await params.id);

        // Fetch appointment
        const appointmentResult = await getAppointmentById(params.id);
        if (appointmentResult.error) {
          toast(appointmentResult.error);
          return;
        }

        const appointment = appointmentResult.data as unknown as Appointment;

        // Format the datetime for the form with error handling
        let formattedDatetime = "";
        try {
          const date = new Date(appointment.datetime);
          if (!isNaN(date.getTime())) {
            // Check if date is valid
            formattedDatetime = date.toISOString().slice(0, 16); // Format as "YYYY-MM-DDThh:mm"
          } else {
            // If date is invalid, use current date
            formattedDatetime = new Date().toISOString().slice(0, 16);
            console.warn(
              "Invalid appointment date detected, using current date instead"
            );
          }
        } catch (error) {
          console.error("Error formatting date:", error);
          formattedDatetime = new Date().toISOString().slice(0, 16);
        }

        // Set form data
        setFormData({
          patient_id: appointment.patient_id,
          doctor_id: appointment.doctor_id,
          datetime: formattedDatetime,
          appointment_type: appointment.appointment_type.toString(),
          duration: appointment.duration.toString(),
          priority: appointment.priority.toString(),
          notes: appointment.notes || "",
        });

        // Fetch patients and doctors
        const [patientsResult, doctorsResult] = await Promise.all([
          adminGetAllPatients(),
          getDoctors(),
        ]);

        if (patientsResult.data) {
          const patientsData = patientsResult.data as unknown as Patient[];
          setPatients(patientsData);

          // Create patient map for easy lookup
          const patientMapData: PatientMap = {};
          patientsData.forEach((patient) => {
            patientMapData[patient.$id] = patient;
          });
          setPatientMap(patientMapData);
        }

        if (doctorsResult.data) {
          const doctorsData = doctorsResult.data as unknown as Doctor[];
          setDoctors(doctorsData);

          // Create doctor map for easy lookup
          const doctorMapData: DoctorMap = {};
          doctorsData.forEach((doctor) => {
            doctorMapData[doctor.$id] = doctor;
          });
          setDoctorMap(doctorMapData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast("Failed to load appointment data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Convert form data to appointment format
      const appointmentData = {
        patient_id: formData.patient_id,
        doctor_id: formData.doctor_id,
        datetime: new Date(formData.datetime),
        appointment_type: Number(formData.appointment_type),
        duration: Number(formData.duration),
        priority: Number(formData.priority),
        notes: formData.notes,
      };

      const result = await adminUpdateAppointment(id, appointmentData);

      if (result.error) {
        toast(result.error);
      } else {
        toast("Appointment updated successfully");
        router.push("/admin/appointments");
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast("Failed to update appointment");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPatient = patientMap[formData.patient_id];
  const selectedDoctor = doctorMap[formData.doctor_id];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>Loading appointment data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/appointments">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Appointments
            </Link>
          </Button>

          {/* Patient and Doctor Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Patient & Doctor</CardTitle>
              <CardDescription>
                Update patient and doctor for this appointment
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="patient">Patient *</Label>
                <Popover open={patientOpen} onOpenChange={setPatientOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={patientOpen}
                      className="w-full justify-between"
                    >
                      {selectedPatient
                        ? `${selectedPatient.first_name} ${selectedPatient.last_name}`
                        : "Select patient..."}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search patients..." />
                      <CommandList>
                        <CommandEmpty>No patient found.</CommandEmpty>
                        <CommandGroup>
                          {patients.map((patient) => (
                            <CommandItem
                              key={patient.$id}
                              value={`${patient.first_name} ${patient.last_name}`}
                              onSelect={() => {
                                handleInputChange("patient_id", patient.$id);
                                setPatientOpen(false);
                              }}
                            >
                              <div>
                                <p className="font-medium">
                                  {patient.first_name} {patient.last_name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {patient.email}
                                </p>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor">Doctor *</Label>
                <Popover open={doctorOpen} onOpenChange={setDoctorOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={doctorOpen}
                      className="w-full justify-between"
                    >
                      {selectedDoctor
                        ? `${selectedDoctor.first_name} ${selectedDoctor.last_name}`
                        : "Select doctor..."}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search doctors..." />
                      <CommandList>
                        <CommandEmpty>No doctor found.</CommandEmpty>
                        <CommandGroup>
                          {doctors.map((doctor) => (
                            <CommandItem
                              key={doctor.$id}
                              value={`${doctor.first_name} ${doctor.last_name}`}
                              onSelect={() => {
                                handleInputChange("doctor_id", doctor.$id);
                                setDoctorOpen(false);
                              }}
                            >
                              <div>
                                <p className="font-medium">
                                  {doctor.first_name} {doctor.last_name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {DoctorSpecialty[doctor.specialty]}
                                </p>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          {/* Appointment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Appointment Details</CardTitle>
              <CardDescription>
                Update the date, time, and type of appointment
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="datetime">Date and Time *</Label>
                <Input
                  id="datetime"
                  type="datetime-local"
                  value={formData.datetime}
                  onChange={(e) =>
                    handleInputChange("datetime", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type *</Label>
                <Select
                  value={formData.appointment_type}
                  onValueChange={(value) =>
                    handleInputChange("appointment_type", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">{AppointmentType[0]}</SelectItem>
                    <SelectItem value="1">{AppointmentType[1]}</SelectItem>
                    <SelectItem value="2">{AppointmentType[2]}</SelectItem>
                    <SelectItem value="3">{AppointmentType[3]}</SelectItem>
                    <SelectItem value="4">{AppointmentType[4]}</SelectItem>
                    <SelectItem value="5">{AppointmentType[5]}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration *</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) =>
                    handleInputChange("duration", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Short</SelectItem>
                    <SelectItem value="1">Medium</SelectItem>
                    <SelectItem value="2">Long</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    handleInputChange("priority", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">{AppointmentPriority[0]}</SelectItem>
                    <SelectItem value="1">{AppointmentPriority[1]}</SelectItem>
                    <SelectItem value="2">{AppointmentPriority[2]}</SelectItem>
                    <SelectItem value="3">{AppointmentPriority[3]}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  rows={4}
                  placeholder="Additional notes about the appointment..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/appointments">Cancel</Link>
            </Button>
            <Button type="submit" disabled={submitting}>
              <Save className="mr-2 h-4 w-4" />
              {submitting ? "Updating..." : "Update Appointment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
