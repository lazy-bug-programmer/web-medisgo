"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

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

import { Hospital } from "@/lib/domains/hospitals.domain";
import {
  getHospitalById,
  updateHospital,
} from "@/lib/actions/hospitals.action";

export default function EditHospitalPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [originalHospital, setOriginalHospital] = useState<Hospital | null>(
    null
  );

  const [formData, setFormData] = useState({
    name: "",
  });

  // Fetch hospital data on page load
  useEffect(() => {
    const fetchHospital = async () => {
      setIsLoading(true);
      try {
        const id = params.id;
        const response = await getHospitalById(id);
        if (response.error) {
          toast(response.error);
          router.push("/admin/hospitals");
          return;
        }

        const hospital = response.data as unknown as Hospital;
        setOriginalHospital(hospital);

        setFormData({
          name: hospital.name,
        });
      } catch (error) {
        console.error("Error fetching hospital:", error);
        toast("Failed to load hospital data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHospital();
  }, [params.id, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalHospital) return;

    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name.trim()) {
        toast("Hospital name is required");
        return;
      }

      // Submit the form data
      const response = await updateHospital(originalHospital.$id, {
        name: formData.name.trim(),
      });

      if (response.error) {
        toast(response.error);
      } else {
        toast("Hospital updated successfully");
        router.push("/admin/hospitals");
      }
    } catch {
      toast("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading hospital data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/hospitals">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Hospitals
            </Link>
          </Button>

          {/* Hospital Information */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Hospital Information</CardTitle>
              <CardDescription>
                Update hospital details and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Hospital Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter hospital name"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/hospitals">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Updating..." : "Update Hospital"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
