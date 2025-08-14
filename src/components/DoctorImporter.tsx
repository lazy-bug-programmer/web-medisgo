"use client";

import React, { useState } from "react";
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
import { createDoctorWithImage } from "@/lib/actions/doctors.action";
import { downloadImageFromUrl } from "@/lib/actions/image.action";
import {
  DoctorGender,
  DoctorSpecialty,
  DoctorDepartment,
  DoctorStatus,
} from "@/lib/domains/doctors.domain";
import { Upload, Check, X, AlertCircle, FileText } from "lucide-react";
import { toast } from "sonner";

interface ScrapedDoctor {
  name: string;
  credentials: string;
  specialty: string;
  imageUrl: string;
  address: string;
}

// Helper functions
function mapSpecialtyToEnum(specialty: string): DoctorSpecialty {
  const specialtyLower = specialty.toLowerCase();

  if (
    specialtyLower.includes("cardiology") ||
    specialtyLower.includes("cardiac")
  ) {
    return DoctorSpecialty.CARDIOLOGY;
  }
  if (specialtyLower.includes("dermatology")) {
    return DoctorSpecialty.DERMATOLOGY;
  }
  if (
    specialtyLower.includes("gastroenterology") ||
    specialtyLower.includes("hepatology")
  ) {
    return DoctorSpecialty.GASTROENTEROLOGY;
  }
  if (
    specialtyLower.includes("neurology") ||
    specialtyLower.includes("neurosurgery")
  ) {
    return DoctorSpecialty.NEUROLOGY;
  }
  if (
    specialtyLower.includes("oncology") ||
    specialtyLower.includes("radiotherapy")
  ) {
    return DoctorSpecialty.ONCOLOGY;
  }
  if (
    specialtyLower.includes("paediatrics") ||
    specialtyLower.includes("pediatrics")
  ) {
    return DoctorSpecialty.PEDIATRICS;
  }
  if (specialtyLower.includes("psychiatry")) {
    return DoctorSpecialty.PSYCHIATRY;
  }
  if (specialtyLower.includes("radiology")) {
    return DoctorSpecialty.RADIOLOGY;
  }
  if (
    specialtyLower.includes("surgery") ||
    specialtyLower.includes("surgical")
  ) {
    return DoctorSpecialty.SURGERY;
  }
  if (specialtyLower.includes("urology")) {
    return DoctorSpecialty.UROLOGY;
  }

  return DoctorSpecialty.OTHER;
}

function mapSpecialtyToDepartment(specialty: string): DoctorDepartment {
  const specialtyLower = specialty.toLowerCase();

  if (specialtyLower.includes("emergency")) {
    return DoctorDepartment.EMERGENCY;
  }
  if (specialtyLower.includes("intensive care")) {
    return DoctorDepartment.INTENSIVE_CARE;
  }
  if (
    specialtyLower.includes("surgery") ||
    specialtyLower.includes("surgical")
  ) {
    return DoctorDepartment.SURGERY;
  }
  if (
    specialtyLower.includes("paediatrics") ||
    specialtyLower.includes("pediatrics")
  ) {
    return DoctorDepartment.PEDIATRICS;
  }
  if (
    specialtyLower.includes("obstetrics") ||
    specialtyLower.includes("gynaecology") ||
    specialtyLower.includes("gynecology")
  ) {
    return DoctorDepartment.OBSTETRICS_GYNECOLOGY;
  }
  if (specialtyLower.includes("psychiatry")) {
    return DoctorDepartment.PSYCHIATRY;
  }
  if (specialtyLower.includes("radiology")) {
    return DoctorDepartment.RADIOLOGY;
  }
  if (specialtyLower.includes("oncology")) {
    return DoctorDepartment.ONCOLOGY;
  }

  return DoctorDepartment.GENERAL_MEDICINE;
}

function parseName(fullName: string): { firstName: string; lastName: string } {
  const cleanName = fullName
    .replace(/^(Dr|Dato'|Prof|Mr|Ms|Mrs)\.?\s+/i, "")
    .replace(/,?\s+(DSPN|BCN|PKN|DJN|PJK|DMPN|JMN|AMP|BSK|BCK|BKM).*$/i, "")
    .trim();

  const nameParts = cleanName.split(/\s+/);

  if (nameParts.length === 1) {
    return { firstName: nameParts[0], lastName: "" };
  } else if (nameParts.length === 2) {
    return { firstName: nameParts[0], lastName: nameParts[1] };
  } else {
    return {
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(" "),
    };
  }
}

interface ProcessResult {
  doctor: string;
  status: "success" | "error";
  message: string;
}

export default function DoctorImporter() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentDoctor, setCurrentDoctor] = useState<string>("");
  const [results, setResults] = useState<ProcessResult[]>([]);
  const [progress, setProgress] = useState(0);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [scrapedDoctors, setScrapedDoctors] = useState<ScrapedDoctor[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
      parseCsvFile(file);
    } else {
      toast.error("Please select a valid CSV file");
    }
  };

  const parseCsvFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split("\n").filter((line) => line.trim());

      if (lines.length < 2) {
        toast.error("CSV file must contain at least a header and one data row");
        return;
      }

      const headers = lines[0]
        .split(",")
        .map((h) => h.trim().replace(/"/g, ""));

      // Validate headers
      const expectedHeaders = [
        "Doctor Name",
        "Credentials",
        "Specialty",
        "Image URL",
        "Address",
      ];
      const hasValidHeaders = expectedHeaders.every((header) =>
        headers.some((h) => h.toLowerCase().includes(header.toLowerCase()))
      );

      if (!hasValidHeaders) {
        toast.error(
          "CSV must contain headers: Doctor Name, Credentials, Specialty, Image URL, Address"
        );
        return;
      }

      const doctors: ScrapedDoctor[] = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i]
          .split(",")
          .map((v) => v.trim().replace(/"/g, ""));

        if (values.length >= 5) {
          doctors.push({
            name: values[0],
            credentials: values[1],
            specialty: values[2],
            imageUrl: values[3],
            address: values[4],
          });
        }
      }

      setScrapedDoctors(doctors);
      toast.success(`Loaded ${doctors.length} doctors from CSV`);
    };

    reader.readAsText(file);
  };

  const processDoctors = async () => {
    if (scrapedDoctors.length === 0) {
      toast.error("Please upload a CSV file first");
      return;
    }

    setIsProcessing(true);
    setResults([]);
    setProgress(0);

    const processResults: ProcessResult[] = [];

    for (let i = 0; i < scrapedDoctors.length; i++) {
      const scrapedDoctor = scrapedDoctors[i];
      setCurrentDoctor(scrapedDoctor.name);
      setProgress(((i + 1) / scrapedDoctors.length) * 100);

      try {
        const { firstName, lastName } = parseName(scrapedDoctor.name);

        // Download the profile image using server action
        const imageFileName = `${firstName}_${lastName}_profile.jpg`;
        console.log(`Processing ${scrapedDoctor.name} - downloading image...`);

        const imageResult = await downloadImageFromUrl(
          scrapedDoctor.imageUrl,
          imageFileName
        );

        let profileImage: File | undefined;
        if (!imageResult.success) {
          console.warn(
            `Failed to download image for ${scrapedDoctor.name}: ${imageResult.error}`
          );
        } else {
          console.log(
            `Successfully downloaded image for ${scrapedDoctor.name}`
          );
          profileImage = imageResult.file;
        }

        const doctorData = {
          first_name: firstName,
          last_name: lastName,
          email: "", // Empty instead of auto-generated
          phone: "", // Empty instead of auto-generated
          dob: new Date(), // Current date as placeholder
          gender: DoctorGender.MALE, // Default value
          address: scrapedDoctor.address,
          specialty: mapSpecialtyToEnum(scrapedDoctor.specialty),
          department: mapSpecialtyToDepartment(scrapedDoctor.specialty),
          medical_license_number: "", // Empty instead of auto-generated
          years_of_experience: 0, // Default to 0
          status: DoctorStatus.ACTIVE,
          education_and_training: scrapedDoctor.credentials,
          biography: `${scrapedDoctor.name} is a specialist in ${scrapedDoctor.specialty}. ${scrapedDoctor.credentials}`,
          languages: JSON.stringify([]), // Empty array
          working_hours: JSON.stringify({
            monday: { start: "", end: "", available: false },
            tuesday: { start: "", end: "", available: false },
            wednesday: { start: "", end: "", available: false },
            thursday: { start: "", end: "", available: false },
            friday: { start: "", end: "", available: false },
            saturday: { start: "", end: "", available: false },
            sunday: { start: "", end: "", available: false },
          }),
          photo_url: "", // This will be set by createDoctorWithImage when image is uploaded
        };

        console.log(`Creating doctor record for ${scrapedDoctor.name}...`);

        const response = await createDoctorWithImage(doctorData, profileImage);

        if (response.error) {
          console.error(
            `Failed to create doctor ${scrapedDoctor.name}:`,
            response.error
          );
          processResults.push({
            doctor: scrapedDoctor.name,
            status: "error",
            message: response.error,
          });
        } else {
          console.log(`Successfully created doctor: ${scrapedDoctor.name}`);
          processResults.push({
            doctor: scrapedDoctor.name,
            status: "success",
            message: profileImage
              ? "Successfully created with image"
              : "Successfully created (no image)",
          });
        }

        // Small delay to avoid overwhelming the server
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        processResults.push({
          doctor: scrapedDoctor.name,
          status: "error",
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }

      setResults([...processResults]);
    }

    setIsProcessing(false);
    setCurrentDoctor("");

    const successCount = processResults.filter(
      (r) => r.status === "success"
    ).length;
    const errorCount = processResults.filter(
      (r) => r.status === "error"
    ).length;

    toast(`Import completed: ${successCount} successful, ${errorCount} failed`);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Import Doctors from CSV File
        </CardTitle>
        <CardDescription>
          Upload a CSV file with headers: Doctor Name, Credentials, Specialty,
          Image URL, Address
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="csv-file">Upload CSV File</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={isProcessing}
            />
          </div>

          {scrapedDoctors.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <FileText className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">
                {scrapedDoctors.length} doctors loaded and ready to import
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button
            onClick={processDoctors}
            disabled={isProcessing || scrapedDoctors.length === 0}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <AlertCircle className="mr-2 h-4 w-4 animate-spin" />
                Processing {currentDoctor}...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Import {scrapedDoctors.length} Doctors
              </>
            )}
          </Button>
        </div>

        {isProcessing && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              {Math.round(progress)}% complete - Currently processing:{" "}
              {currentDoctor}
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Import Results</h3>
            <div className="max-h-96 overflow-y-auto space-y-2">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    result.status === "success"
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {result.status === "success" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <X className="h-4 w-4 text-red-600" />
                    )}
                    <span className="font-medium">{result.doctor}</span>
                  </div>
                  <span
                    className={`text-sm ${
                      result.status === "success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {result.message}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600">
              Success: {results.filter((r) => r.status === "success").length} |
              Errors: {results.filter((r) => r.status === "error").length}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
