"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DoctorImporter from "@/components/DoctorImporter";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImportDoctorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/doctors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Doctors
            </Link>
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>Import Doctors from Loh Guan Lye Website</CardTitle>
              <CardDescription>
                This tool will import doctor information scraped from the Loh
                Guan Lye Specialists Centre website. Each doctor&apos;s profile
                will be created with their image, credentials, and specialty
                information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    What will be imported:
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Doctor names and credentials</li>
                    <li>• Profile images from the website</li>
                    <li>• Specialties and departments</li>
                    <li>• Generated contact information</li>
                    <li>• Default working hours</li>
                    <li>• Medical license numbers (generated)</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-yellow-900 mb-2">
                    Important Notes:
                  </h3>
                  <ul className="text-sm text-yellow-800 space-y-1">
                    <li>• This process may take several minutes to complete</li>
                    <li>
                      • Images will be downloaded and uploaded to your storage
                    </li>
                    <li>
                      • Some data (like DOB, phone numbers) will be generated as
                      placeholders
                    </li>
                    <li>
                      • You can edit individual doctor records after import
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <DoctorImporter />
        </div>
      </div>
    </div>
  );
}
