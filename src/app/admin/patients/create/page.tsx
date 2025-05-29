"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Save, UserPlus, Users } from "lucide-react";
import { z } from "zod";
import { useRouter } from "next/navigation";

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
import { createPatient } from "@/lib/actions/patients.action";
import { getAllUsers } from "@/lib/actions/user.action";
import {
  PatientBloodType,
  PatientEmergencyContactRelationship,
  PatientGender,
} from "@/lib/domains/patients.domain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Models } from "appwrite";

// Zod schema for form validation
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
  userId: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientSchema>;

export default function CreatePatientPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [users, setUsers] = useState<Models.User<Models.Preferences>[]>([]);
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
    userId: "",
  });

  useEffect(() => {
    // Fetch users for the dropdown
    const fetchUsers = async () => {
      const response = await getAllUsers();
      if (response.data) {
        setUsers(response.data);
      }
    };

    fetchUsers();
  }, []);

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

  const handleUserSelect = (userId: string) => {
    const selectedUser = users.find((user) => user.$id === userId);
    if (selectedUser) {
      setFormData({
        ...formData,
        userId: selectedUser.$id,
        firstName: selectedUser.name.split(" ")[0] || "",
        lastName: selectedUser.name.split(" ").slice(1).join(" ") || "",
        phone: selectedUser.phone || "",
        email: selectedUser.email || "",
        // Other fields remain empty to be filled manually
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
        user_id: formData.userId || "",
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        dob: new Date(formData.dateOfBirth),
        phone: formData.phone,
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

      const result = await createPatient(patientData);

      if (result.error) {
        toast(result.error);
      } else {
        toast("Patient created successfully");
        router.push("/admin/patients");
      }
    } catch (error) {
      console.error("Error creating patient:", error);
      toast("Failed to create patient. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to convert string values to enum values
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

          {/* Patient Data Source Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Source</CardTitle>
              <CardDescription>Choose how to add the patient</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="manual">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="manual">
                    <UserPlus className="mr-2 h-4 w-4" />
                    New Patient
                  </TabsTrigger>
                  <TabsTrigger value="existing">
                    <Users className="mr-2 h-4 w-4" />
                    From Existing User
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="existing" className="mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="userId">Select User</Label>
                    <Select
                      value={formData.userId}
                      onValueChange={(value) => {
                        handleUserSelect(value);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.$id} value={user.$id}>
                            {user.name} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Selecting a user will prefill some basic information.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
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
                  className={`${
                    validationErrors.firstName ? "border-red-500" : ""
                  }`}
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
                  className={`${
                    validationErrors.lastName ? "border-red-500" : ""
                  }`}
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
                  className={`${
                    validationErrors.email ? "border-red-500" : ""
                  }`}
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
              {isSubmitting ? "Creating..." : "Create Patient"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
