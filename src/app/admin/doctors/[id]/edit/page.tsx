/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, UserCircle } from "lucide-react";
import Image from "next/image";

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
import { toast } from "sonner";
import {
  getDoctorById,
  updateDoctorWithImage,
} from "@/lib/actions/doctors.action";
import {
  Doctor,
  DoctorGender,
  DoctorSpecialty,
  DoctorDepartment,
  DoctorStatus,
} from "@/lib/domains/doctors.domain";
import { getImage } from "@/lib/appwrite/bucket";

export default function EditDoctorPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [originalDoctor, setOriginalDoctor] = useState<Doctor | null>(null);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    gender: DoctorGender.MALE,
    specialty: DoctorSpecialty.CARDIOLOGY,
    department: DoctorDepartment.GENERAL_MEDICINE,
    medical_license_number: "",
    education_and_training: "",
    years_of_experience: 0,
    biography: "",
    languages: ["English"],
    address: "",
    status: DoctorStatus.ACTIVE,
    working_hours: {
      monday: { start: "09:00", end: "17:00", available: true },
      tuesday: { start: "09:00", end: "17:00", available: true },
      wednesday: { start: "09:00", end: "17:00", available: true },
      thursday: { start: "09:00", end: "17:00", available: true },
      friday: { start: "09:00", end: "17:00", available: true },
      saturday: { start: "09:00", end: "17:00", available: false },
      sunday: { start: "09:00", end: "17:00", available: false },
    },
  });

  // Fetch doctor data on page load
  useEffect(() => {
    const fetchDoctor = async () => {
      setIsLoading(true);
      try {
        const id = params.id;
        const response = await getDoctorById(id);
        if (response.error) {
          toast(response.error);
          router.push("/admin/doctors");
          return;
        }

        const doctor = response.data as unknown as Doctor;
        setOriginalDoctor(doctor);

        // Parse JSON strings into objects
        const languages = doctor.languages
          ? JSON.parse(doctor.languages)
          : ["English"];
        const workingHours = doctor.working_hours
          ? JSON.parse(doctor.working_hours)
          : {
              monday: { start: "09:00", end: "17:00", available: true },
              tuesday: { start: "09:00", end: "17:00", available: true },
              wednesday: { start: "09:00", end: "17:00", available: true },
              thursday: { start: "09:00", end: "17:00", available: true },
              friday: { start: "09:00", end: "17:00", available: true },
              saturday: { start: "09:00", end: "17:00", available: false },
              sunday: { start: "09:00", end: "17:00", available: false },
            };

        // Convert date to string format for the input
        const dobString =
          doctor.dob instanceof Date
            ? doctor.dob.toISOString().split("T")[0]
            : new Date(doctor.dob).toISOString().split("T")[0];

        setFormData({
          first_name: doctor.first_name,
          last_name: doctor.last_name,
          email: doctor.email,
          phone: doctor.phone,
          dob: dobString,
          gender: doctor.gender,
          specialty: doctor.specialty,
          department: doctor.department,
          medical_license_number: doctor.medical_license_number,
          education_and_training: doctor.education_and_training || "",
          years_of_experience: doctor.years_of_experience,
          biography: doctor.biography || "",
          languages,
          address: doctor.address || "",
          status: doctor.status,
          working_hours: workingHours,
        });

        // Load doctor image if available
        if (doctor.photo_url) {
          loadDoctorImage(doctor.photo_url);
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
        toast("Failed to load doctor data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctor();
  }, [params.id, router]); // Only depend on params.id and router

  const loadDoctorImage = async (photoUrl: string) => {
    try {
      const response = await getImage(photoUrl);
      if (response.data?.file) {
        // Convert ArrayBuffer to Blob and create object URL
        const blob = new Blob([response.data.file]);
        const imageUrl = URL.createObjectURL(blob);
        setPhotoPreview(imageUrl);
      }
    } catch (error) {
      console.error("Error loading doctor image:", error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleWorkingHoursChange = (
    day: string,
    field: string,
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      working_hours: {
        ...prev.working_hours,
        [day]: {
          ...prev.working_hours[day as keyof typeof prev.working_hours],
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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalDoctor) return;

    setIsSubmitting(true);

    try {
      // Prepare doctor data
      const doctorData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        dob: new Date(formData.dob),
        gender: Number(formData.gender),
        address: formData.address,
        specialty: Number(formData.specialty),
        department: Number(formData.department),
        medical_license_number: formData.medical_license_number,
        years_of_experience: Number(formData.years_of_experience),
        status: Number(formData.status),
        education_and_training: formData.education_and_training,
        biography: formData.biography,
        languages: JSON.stringify(formData.languages),
        working_hours: JSON.stringify(formData.working_hours),
      };

      // Submit the form data with the photo if changed
      const response = await updateDoctorWithImage(
        originalDoctor.$id,
        doctorData,
        photoFile || undefined
      );

      if (response.error) {
        toast(response.error);
      } else {
        toast("Doctor updated successfully");
        router.push("/admin/doctors");
      }
    } catch {
      toast("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableLanguages = [
    "English",
    "Indonesian",
    "Malay",
    "Mandarin",
    "Cantonese",
    "Hokkien",
    "Hindi",
    "Portuguese",
  ];

  // Helper function to get enum options for select
  const getEnumOptions = (enumObject: any) => {
    return Object.keys(enumObject)
      .filter((key) => !isNaN(Number(key)))
      .map((key) => ({ value: key, label: enumObject[Number(key)] }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading doctor data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
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
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {photoPreview ? (
                    <Image
                      src={photoPreview}
                      alt="Doctor preview"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserCircle className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleUploadClick}
                  >
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
                  <Label htmlFor="first_name">First Name *</Label>
                  <Input
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) =>
                      handleInputChange("first_name", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name *</Label>
                  <Input
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) =>
                      handleInputChange("last_name", e.target.value)
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
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => handleInputChange("dob", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={formData.gender.toString()}
                    onValueChange={(value) =>
                      handleInputChange("gender", Number(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      {getEnumOptions(DoctorGender).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
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
                  value={formData.specialty.toString()}
                  onValueChange={(value) =>
                    handleInputChange("specialty", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {getEnumOptions(DoctorSpecialty).map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={formData.department.toString()}
                  onValueChange={(value) =>
                    handleInputChange("department", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {getEnumOptions(DoctorDepartment).map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="medical_license_number">
                  Medical License Number *
                </Label>
                <Input
                  id="medical_license_number"
                  value={formData.medical_license_number}
                  onChange={(e) =>
                    handleInputChange("medical_license_number", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="years_of_experience">
                  Years of Experience *
                </Label>
                <Input
                  id="years_of_experience"
                  type="number"
                  value={formData.years_of_experience}
                  onChange={(e) =>
                    handleInputChange("years_of_experience", e.target.value)
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status.toString()}
                  onValueChange={(value) =>
                    handleInputChange("status", Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {getEnumOptions(DoctorStatus).map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="education_and_training">
                  Education & Training
                </Label>
                <Textarea
                  id="education_and_training"
                  value={formData.education_and_training}
                  onChange={(e) =>
                    handleInputChange("education_and_training", e.target.value)
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
                {Object.entries(formData.working_hours).map(([day, hours]) => (
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
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Updating..." : "Update Doctor"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
