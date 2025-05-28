"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Upload } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for existing doctor
const mockDoctor = {
  id: "1",
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@medicare-hospital.com",
  phone: "+1 (555) 123-4567",
  dateOfBirth: "1980-05-15",
  gender: "female",
  specialty: "cardiology",
  department: "cardiology",
  licenseNumber: "MD123456",
  education:
    "Harvard Medical School (2005), Massachusetts General Hospital Residency (2009), Cleveland Clinic Fellowship (2011)",
  experience: "15",
  biography:
    "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in diagnosing and treating heart conditions.",
  languages: ["English", "Spanish"],
  consultationFee: "250",
  workingHours: {
    monday: { start: "09:00", end: "17:00", available: true },
    tuesday: { start: "", end: "", available: false },
    wednesday: { start: "09:00", end: "17:00", available: true },
    thursday: { start: "", end: "", available: false },
    friday: { start: "09:00", end: "13:00", available: true },
    saturday: { start: "", end: "", available: false },
    sunday: { start: "", end: "", available: false },
  },
  emergencyContact: "John Johnson - +1 (555) 123-4568",
  address: "123 Medical Drive, Healthville, State 12345",
  certifications:
    "American Board of Internal Medicine, American College of Cardiology, Advanced Cardiac Life Support",
  awards:
    "Excellence in Clinical Care (2016), Outstanding Researcher Award (2018)",
  publications:
    "Advances in Cardiac Imaging Techniques (2015), Long-term Outcomes of Stent Placement (2017)",
  status: "Active",
};

export default function EditDoctorPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    specialty: "",
    department: "",
    licenseNumber: "",
    education: "",
    experience: "",
    biography: "",
    languages: [] as string[],
    consultationFee: "",
    workingHours: {
      monday: { start: "", end: "", available: false },
      tuesday: { start: "", end: "", available: false },
      wednesday: { start: "", end: "", available: false },
      thursday: { start: "", end: "", available: false },
      friday: { start: "", end: "", available: false },
      saturday: { start: "", end: "", available: false },
      sunday: { start: "", end: "", available: false },
    },
    emergencyContact: "",
    address: "",
    certifications: "",
    awards: "",
    publications: "",
    status: "Active",
  });

  useEffect(() => {
    // Load existing doctor data
    if (params.id === "1") {
      setFormData(mockDoctor);
    }
  }, [params.id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWorkingHoursChange = (
    day: string,
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day as keyof typeof prev.workingHours],
          [field]: value,
        },
      },
    }));
  };

  const handleLanguageChange = (language: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      languages: checked
        ? [...prev.languages, language]
        : prev.languages.filter((lang) => lang !== language),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating doctor:", formData);
    // Handle form submission
  };

  const availableLanguages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Arabic",
    "Hindi",
    "Portuguese",
  ];
  const specialties = [
    "Cardiology",
    "Neurology",
    "Pediatrics",
    "Orthopedics",
    "Dermatology",
    "Oncology",
    "Gynecology",
    "Urology",
    "Psychiatry",
    "Emergency Medicine",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/doctors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Doctors
            </Link>
          </Button>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Basic doctor details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo Upload */}
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <div>
                  <Button type="button" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Recommended: Square image, at least 400x400px
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      handleInputChange("gender", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>
                Medical credentials and specialization
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty *</Label>
                <Select
                  value={formData.specialty}
                  onValueChange={(value) =>
                    handleInputChange("specialty", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem
                        key={specialty}
                        value={specialty.toLowerCase()}
                      >
                        {specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) =>
                    handleInputChange("department", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((dept) => (
                      <SelectItem key={dept} value={dept.toLowerCase()}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">Medical License Number *</Label>
                <Input
                  id="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={(e) =>
                    handleInputChange("licenseNumber", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience *</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) =>
                    handleInputChange("experience", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="consultationFee">Consultation Fee ($)</Label>
                <Input
                  id="consultationFee"
                  type="number"
                  value={formData.consultationFee}
                  onChange={(e) =>
                    handleInputChange("consultationFee", e.target.value)
                  }
                />
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
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="education">Education & Training</Label>
                <Textarea
                  id="education"
                  value={formData.education}
                  onChange={(e) =>
                    handleInputChange("education", e.target.value)
                  }
                  rows={4}
                  placeholder="Medical school, residency, fellowships, etc."
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="biography">Biography</Label>
                <Textarea
                  id="biography"
                  value={formData.biography}
                  onChange={(e) =>
                    handleInputChange("biography", e.target.value)
                  }
                  rows={4}
                  placeholder="Professional background and expertise"
                />
              </div>
            </CardContent>
          </Card>

          {/* Languages */}
          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
              <CardDescription>
                Languages the doctor can communicate in
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {availableLanguages.map((language) => (
                  <div key={language} className="flex items-center space-x-2">
                    <Checkbox
                      id={language}
                      checked={formData.languages.includes(language)}
                      onCheckedChange={(checked) =>
                        handleLanguageChange(language, checked as boolean)
                      }
                    />
                    <Label htmlFor={language}>{language}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Working Hours */}
          <Card>
            <CardHeader>
              <CardTitle>Working Hours</CardTitle>
              <CardDescription>
                Set the doctor&apos;s availability schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(formData.workingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center gap-4">
                    <div className="w-28">
                      <Checkbox
                        id={`${day}-available`}
                        checked={hours.available}
                        onCheckedChange={(checked) =>
                          handleWorkingHoursChange(
                            day,
                            "available",
                            checked as boolean
                          )
                        }
                      />
                      <Label
                        htmlFor={`${day}-available`}
                        className="ml-2 capitalize"
                      >
                        {day}
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={hours.start}
                        onChange={(e) =>
                          handleWorkingHoursChange(day, "start", e.target.value)
                        }
                        disabled={!hours.available}
                        className="w-32"
                      />
                      <span>to</span>
                      <Input
                        type="time"
                        value={hours.end}
                        onChange={(e) =>
                          handleWorkingHoursChange(day, "end", e.target.value)
                        }
                        disabled={!hours.available}
                        className="w-32"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/doctors">Cancel</Link>
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Update Doctor
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
