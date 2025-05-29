"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Search } from "lucide-react";

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

import { createAppointment } from "@/lib/actions/appointments.action";
import { adminGetAllPatients } from "@/lib/actions/patients.action";
import { getDoctors } from "@/lib/actions/doctors.action";
import {
  AppointmentPriority,
  AppointmentType,
} from "@/lib/domains/appointments.domain";
import { Patient } from "@/lib/domains/patients.domain";
import { Doctor } from "@/lib/domains/doctors.domain";
import { toast } from "sonner";

export default function CreateAppointmentPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    patient_id: "",
    doctor_id: "",
    datetime: "",
    appointment_type: "",
    duration: "",
    priority: "",
    notes: "",
  });

  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [patientOpen, setPatientOpen] = useState(false);
  const [doctorOpen, setDoctorOpen] = useState(false);

  useEffect(() => {
    // Fetch patients and doctors on component mount
    const fetchData = async () => {
      const patientsResult = await adminGetAllPatients();
      if (patientsResult.data) {
        setPatients(patientsResult.data as unknown as Patient[]);
      }

      const doctorsResult = await getDoctors();
      if (doctorsResult.data) {
        setDoctors(doctorsResult.data as unknown as Doctor[]);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Format date and time into a datetime object
      const dateTime = new Date(formData.datetime);

      const appointmentData = {
        patient_id: formData.patient_id,
        doctor_id: formData.doctor_id,
        datetime: dateTime,
        appointment_type: Number(formData.appointment_type),
        duration: Number(formData.duration),
        priority: Number(formData.priority),
        notes: formData.notes || "",
      };

      const result = await createAppointment(appointmentData);

      if (result.error) {
        toast(result.error);
      } else {
        toast("Appointment created successfully");
        router.push("/admin/appointments");
      }
    } catch {
      toast("Failed to create appointment");
    } finally {
      setLoading(false);
    }
  };

  const selectedPatient = patients.find((p) => p.$id === formData.patient_id);
  const selectedDoctor = doctors.find((d) => d.$id === formData.doctor_id);

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
              <CardTitle>Patient & Doctor Selection</CardTitle>
              <CardDescription>
                Select the patient and doctor for this appointment
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
                                  {AppointmentType[doctor.specialty]}
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
                Set the date, time, and type of appointment
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
            <Button type="submit" disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Scheduling..." : "Schedule Appointment"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
