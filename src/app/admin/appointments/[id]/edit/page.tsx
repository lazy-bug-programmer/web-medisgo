"use client";

import type React from "react";

import { useState, useEffect } from "react";
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

// Mock data
const patients = [
  { id: "1", name: "John Doe", email: "john.doe@email.com" },
  { id: "2", name: "Jane Smith", email: "jane.smith@email.com" },
  { id: "3", name: "Robert Brown", email: "robert.brown@email.com" },
  { id: "4", name: "Maria Garcia", email: "maria.garcia@email.com" },
];

const doctors = [
  { id: "1", name: "Dr. Sarah Johnson", specialty: "Cardiology" },
  { id: "2", name: "Dr. Michael Chen", specialty: "Neurology" },
  { id: "3", name: "Dr. Emily Rodriguez", specialty: "Pediatrics" },
  { id: "4", name: "Dr. David Patel", specialty: "Orthopedics" },
];

// Mock existing appointment data
const mockAppointment = {
  id: "1",
  patientId: "1",
  doctorId: "1",
  date: "2024-01-20",
  time: "09:00",
  type: "consultation",
  duration: "30",
  notes: "Regular checkup for cardiac health",
  priority: "normal",
  status: "confirmed",
  reason: "Routine cardiac examination",
};

export default function EditAppointmentPage({
  params,
}: {
  params: { id: string };
}) {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    date: "",
    time: "",
    type: "",
    duration: "",
    notes: "",
    priority: "",
    status: "",
    reason: "",
  });

  const [patientOpen, setPatientOpen] = useState(false);
  const [doctorOpen, setDoctorOpen] = useState(false);

  useEffect(() => {
    // Load existing appointment data
    if (params.id === "1") {
      setFormData(mockAppointment);
    }
  }, [params.id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating appointment:", formData);
    // Handle form submission
  };

  const selectedPatient = patients.find((p) => p.id === formData.patientId);
  const selectedDoctor = doctors.find((d) => d.id === formData.doctorId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
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
                        ? selectedPatient.name
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
                              key={patient.id}
                              value={patient.name}
                              onSelect={() => {
                                handleInputChange("patientId", patient.id);
                                setPatientOpen(false);
                              }}
                            >
                              <div>
                                <p className="font-medium">{patient.name}</p>
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
                        ? selectedDoctor.name
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
                              key={doctor.id}
                              value={doctor.name}
                              onSelect={() => {
                                handleInputChange("doctorId", doctor.id);
                                setDoctorOpen(false);
                              }}
                            >
                              <div>
                                <p className="font-medium">{doctor.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {doctor.specialty}
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
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Appointment Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select appointment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">Consultation</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="routine-checkup">
                      Routine Checkup
                    </SelectItem>
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
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
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
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="no-show">No Show</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Input
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => handleInputChange("reason", e.target.value)}
                  placeholder="Brief description of the visit reason"
                />
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
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Update Appointment
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
