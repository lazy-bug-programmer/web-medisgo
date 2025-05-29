/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";

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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import {
  getPatientById,
  adminUpdatePatient,
} from "@/lib/actions/patients.action";
import {
  PatientBloodType,
  PatientEmergencyContactRelationship,
  PatientGender,
} from "@/lib/domains/patients.domain";

// Zod schema for form validation - similar to create page
const patientSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  bloodType: z.string().optional(),
  address: z.string().optional(),
  emergencyContactName: z.string().min(1, "Emergency contact name is required"),
  emergencyContactPhone: z
    .string()
    .min(1, "Emergency contact phone is required"),
  emergencyContactRelation: z.string().min(1, "Relationship is required"),
  medicalHistory: z.string().optional(),
  allergies: z.string().optional(),
  currentMedications: z.string().optional(),
  insuranceProvider: z.string().optional(),
  insurancePolicyNumber: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

export default function EditPatientPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [registrationDate, setRegistrationDate] = useState<string>("");

  const [formData, setFormData] = useState<PatientFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
    medicalHistory: "",
    allergies: "",
    currentMedications: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
  });

  useEffect(() => {
    const fetchPatient = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await getPatientById(params.id);

        if (result.error) {
          setError(result.error);
          return;
        }

        if (!result.data) {
          setError("Patient not found");
          return;
        }

        const patient = result.data;

        // Format date
        const dobDate = new Date(patient.dob);
        const formattedDob = dobDate.toISOString().split("T")[0];

        // Set registration date
        const createdAt = new Date(patient.$createdAt);
        setRegistrationDate(createdAt.toISOString().split("T")[0]);

        // Convert gender enum to string
        const genderMap: Record<number, string> = {
          [PatientGender.MALE]: "male",
          [PatientGender.FEMALE]: "female",
          [PatientGender.OTHERS]: "other",
        };

        // Convert blood type enum to string
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

        // Convert relationship enum to string
        const relationshipMap: Record<number, string> = {
          [PatientEmergencyContactRelationship.PARENT]: "parent",
          [PatientEmergencyContactRelationship.SIBLING]: "sibling",
          [PatientEmergencyContactRelationship.SPOUSE]: "spouse",
          [PatientEmergencyContactRelationship.CHILD]: "child",
          [PatientEmergencyContactRelationship.FRIEND]: "friend",
          [PatientEmergencyContactRelationship.OTHER]: "other",
        };

        setFormData({
          firstName: patient.first_name,
          lastName: patient.last_name,
          email: patient.email,
          phone: patient.phone || "",
          dateOfBirth: formattedDob,
          gender: genderMap[patient.gender] || "other",
          bloodType: bloodTypeMap[patient.blood_type] || "",
          address: patient.address || "",
          emergencyContactName: patient.emergency_contact_name,
          emergencyContactPhone: patient.emergency_contact_phone,
          emergencyContactRelation:
            relationshipMap[patient.emergency_contact_relationship] || "other",
          medicalHistory: patient.medical_history || "",
          allergies: patient.allergies || "",
          currentMedications: patient.current_medications || "",
          insuranceProvider: patient.insurance_provider || "",
          insurancePolicyNumber: patient.insurance_policy_number || "",
        });
      } catch {
        setError("Failed to load patient data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatient();
  }, [params.id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear validation error for this field if it exists
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    try {
      patientSchema.parse(formData);
      setValidationErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0].toString()] = err.message;
          }
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast("Please fix the form errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert form data to match the Patient domain model
      const patientData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        dob: new Date(formData.dateOfBirth),
        gender:
          formData.gender === "male"
            ? PatientGender.MALE
            : formData.gender === "female"
            ? PatientGender.FEMALE
            : PatientGender.OTHERS,
        address: formData.address || "",
        emergency_contact_name: formData.emergencyContactName,
        emergency_contact_phone: formData.emergencyContactPhone,
        emergency_contact_relationship: getEmergencyContactRelationship(
          formData.emergencyContactRelation
        ),
        blood_type: getBloodType(formData.bloodType || ""),
        allergies: formData.allergies || "",
        current_medications: formData.currentMedications || "",
        medical_history: formData.medicalHistory || "",
        insurance_provider: formData.insuranceProvider || "",
        insurance_policy_number: formData.insurancePolicyNumber || "",
      };

      const result = await adminUpdatePatient(params.id, patientData);

      if (result.error) {
        toast(result.error);
      } else {
        toast("Patient updated successfully");
        router.push("/admin/patients");
      }
    } catch {
      toast("Failed to update patient. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to convert string values to enum values - same as create page
  const getBloodType = (value: string): PatientBloodType => {
    switch (value) {
      case "A+":
        return PatientBloodType.A_POSITIVE;
      case "A-":
        return PatientBloodType.A_NEGATIVE;
      case "B+":
        return PatientBloodType.B_POSITIVE;
      case "B-":
        return PatientBloodType.B_NEGATIVE;
      case "AB+":
        return PatientBloodType.AB_POSITIVE;
      case "AB-":
        return PatientBloodType.AB_NEGATIVE;
      case "O+":
        return PatientBloodType.O_POSITIVE;
      case "O-":
        return PatientBloodType.O_NEGATIVE;
      default:
        return PatientBloodType.O_POSITIVE; // Default value
    }
  };

  const getEmergencyContactRelationship = (
    value: string
  ): PatientEmergencyContactRelationship => {
    switch (value) {
      case "parent":
        return PatientEmergencyContactRelationship.PARENT;
      case "sibling":
        return PatientEmergencyContactRelationship.SIBLING;
      case "spouse":
        return PatientEmergencyContactRelationship.SPOUSE;
      case "child":
        return PatientEmergencyContactRelationship.CHILD;
      case "friend":
        return PatientEmergencyContactRelationship.FRIEND;
      default:
        return PatientEmergencyContactRelationship.OTHER;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg">Loading patient data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-4xl">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/patients">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Patients
            </Link>
          </Button>

          <Alert variant="destructive" className="mt-6">
            <AlertDescription>
              {error}. Please try again or go back to the patients list.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/patients">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Patients
            </Link>
          </Button>

          {/* Patient Information - Updated to remove status controls */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>
                Current patient registration information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-muted-foreground">Patient ID</p>
                  <p className="font-medium">#{params.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Registration Date
                  </p>
                  <p className="font-medium">{registrationDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Basic patient details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  required
                  className={validationErrors.firstName ? "border-red-500" : ""}
                />
                {validationErrors.firstName && (
                  <p className="text-sm text-red-500">
                    {validationErrors.firstName}
                  </p>
                )}
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
                  className={validationErrors.lastName ? "border-red-500" : ""}
                />
                {validationErrors.lastName && (
                  <p className="text-sm text-red-500">
                    {validationErrors.lastName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className={validationErrors.email ? "border-red-500" : ""}
                />
                {validationErrors.email && (
                  <p className="text-sm text-red-500">
                    {validationErrors.email}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  required
                  className={validationErrors.phone ? "border-red-500" : ""}
                />
                {validationErrors.phone && (
                  <p className="text-sm text-red-500">
                    {validationErrors.phone}
                  </p>
                )}
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
                  className={
                    validationErrors.dateOfBirth ? "border-red-500" : ""
                  }
                />
                {validationErrors.dateOfBirth && (
                  <p className="text-sm text-red-500">
                    {validationErrors.dateOfBirth}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                >
                  <SelectTrigger
                    className={validationErrors.gender ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.gender && (
                  <p className="text-sm text-red-500">
                    {validationErrors.gender}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Select
                  value={formData.bloodType}
                  onValueChange={(value) =>
                    handleInputChange("bloodType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contact</CardTitle>
              <CardDescription>Emergency contact information</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="emergencyContactName">Contact Name *</Label>
                <Input
                  id="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={(e) =>
                    handleInputChange("emergencyContactName", e.target.value)
                  }
                  required
                  className={
                    validationErrors.emergencyContactName
                      ? "border-red-500"
                      : ""
                  }
                />
                {validationErrors.emergencyContactName && (
                  <p className="text-sm text-red-500">
                    {validationErrors.emergencyContactName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactPhone">Contact Phone *</Label>
                <Input
                  id="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={(e) =>
                    handleInputChange("emergencyContactPhone", e.target.value)
                  }
                  required
                  className={
                    validationErrors.emergencyContactPhone
                      ? "border-red-500"
                      : ""
                  }
                />
                {validationErrors.emergencyContactPhone && (
                  <p className="text-sm text-red-500">
                    {validationErrors.emergencyContactPhone}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContactRelation">Relationship *</Label>
                <Select
                  value={formData.emergencyContactRelation}
                  onValueChange={(value) =>
                    handleInputChange("emergencyContactRelation", value)
                  }
                >
                  <SelectTrigger
                    className={
                      validationErrors.emergencyContactRelation
                        ? "border-red-500"
                        : ""
                    }
                  >
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="sibling">Sibling</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {validationErrors.emergencyContactRelation && (
                  <p className="text-sm text-red-500">
                    {validationErrors.emergencyContactRelation}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle>Medical Information</CardTitle>
              <CardDescription>
                Medical history and current health information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="medicalHistory">Medical History</Label>
                <Textarea
                  id="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={(e) =>
                    handleInputChange("medicalHistory", e.target.value)
                  }
                  rows={4}
                  placeholder="Previous surgeries, chronic conditions, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) =>
                    handleInputChange("allergies", e.target.value)
                  }
                  rows={3}
                  placeholder="Food allergies, drug allergies, environmental allergies, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentMedications">Current Medications</Label>
                <Textarea
                  id="currentMedications"
                  value={formData.currentMedications}
                  onChange={(e) =>
                    handleInputChange("currentMedications", e.target.value)
                  }
                  rows={3}
                  placeholder="List current medications with dosages"
                />
              </div>
            </CardContent>
          </Card>

          {/* Insurance Information */}
          <Card>
            <CardHeader>
              <CardTitle>Insurance Information</CardTitle>
              <CardDescription>Patient insurance details</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Input
                  id="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={(e) =>
                    handleInputChange("insuranceProvider", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurancePolicyNumber">Policy Number</Label>
                <Input
                  id="insurancePolicyNumber"
                  value={formData.insurancePolicyNumber}
                  onChange={(e) =>
                    handleInputChange("insurancePolicyNumber", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/patients">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Updating..." : "Update Patient"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
