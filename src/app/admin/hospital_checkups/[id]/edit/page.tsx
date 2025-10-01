"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Save, Upload, Stethoscope } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MarkdownEditor } from "@/components/ui/markdown-editor";

import { Hospital } from "@/lib/domains/hospitals.domain";
import { HospitalCheckups } from "@/lib/domains/hospital_checkups.domain";
import {
  getHospitalCheckupById,
  updateHospitalCheckupWithImage,
} from "@/lib/actions/hospital_checkups.action";
import { adminGetAllHospitals } from "@/lib/actions/hospitals.action";
import { getImage } from "@/lib/appwrite/bucket";

export default function EditHospitalCheckupPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [originalCheckup, setOriginalCheckup] =
    useState<HospitalCheckups | null>(null);

  const [formData, setFormData] = useState({
    hospital_id: "",
    title: "",
    short_description: "",
    description: "",
    price: 0,
  });

  // Fetch data on page load
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const id = params.id;

        // Fetch both checkup and hospitals data
        const [checkupResponse, hospitalsResponse] = await Promise.all([
          getHospitalCheckupById(id),
          adminGetAllHospitals(),
        ]);

        if (checkupResponse.error) {
          toast(checkupResponse.error);
          router.push("/admin/hospital_checkups");
          return;
        }

        if (hospitalsResponse.error) {
          toast(hospitalsResponse.error);
        } else {
          setHospitals(hospitalsResponse.data as unknown as Hospital[]);
        }

        const checkup = checkupResponse.data as unknown as HospitalCheckups;
        setOriginalCheckup(checkup);

        setFormData({
          hospital_id: checkup.hospital_id,
          title: checkup.title,
          short_description: checkup.short_description,
          description: checkup.description,
          price: checkup.price,
        });

        // Load checkup image if available
        if (checkup.image_url) {
          loadCheckupImage(checkup.image_url);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id, router]);

  const loadCheckupImage = async (imageUrl: string) => {
    try {
      const response = await getImage(imageUrl);
      if (response.data?.file) {
        // Convert ArrayBuffer to Blob and create object URL
        const blob = new Blob([response.data.file]);
        const imageObjectUrl = URL.createObjectURL(blob);
        setImagePreview(imageObjectUrl);
      }
    } catch (error) {
      console.error("Error loading checkup image:", error);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalCheckup) return;

    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.hospital_id.trim()) {
        toast("Please select a hospital");
        return;
      }
      if (!formData.title.trim()) {
        toast("Title is required");
        return;
      }
      if (!formData.short_description.trim()) {
        toast("Short description is required");
        return;
      }
      if (!formData.description.trim()) {
        toast("Description is required");
        return;
      }
      if (formData.price <= 0) {
        toast("Price must be greater than 0");
        return;
      }

      // Prepare checkup data
      const updatesToApply = {
        hospital_id: formData.hospital_id.trim(),
        title: formData.title.trim(),
        short_description: formData.short_description.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
      };

      // Submit the form data with the image if changed
      const response = await updateHospitalCheckupWithImage(
        originalCheckup.$id,
        updatesToApply,
        imageFile || undefined
      );

      if (response.error) {
        toast(response.error);
      } else {
        toast("Hospital checkup updated successfully");
        router.push("/admin/hospital_checkups");
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
        <p>Loading checkup data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/hospital_checkups">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Hospital Checkups
            </Link>
          </Button>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Edit Hospital Checkup</CardTitle>
              <CardDescription>
                Update checkup details and information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Upload */}
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Checkup preview"
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Stethoscope className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleUploadClick}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Change Image
                  </Button>
                  <p className="text-sm text-muted-foreground mt-1">
                    Upload a new image for the checkup (optional)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hospital_id">Hospital</Label>
                  <Select
                    value={formData.hospital_id}
                    onValueChange={(value) =>
                      handleInputChange("hospital_id", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a hospital" />
                    </SelectTrigger>
                    <SelectContent>
                      {hospitals.map((hospital) => (
                        <SelectItem key={hospital.$id} value={hospital.$id}>
                          {hospital.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      handleInputChange(
                        "price",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter checkup title"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="short_description">Short Description</Label>
                  <Input
                    id="short_description"
                    value={formData.short_description}
                    onChange={(e) =>
                      handleInputChange("short_description", e.target.value)
                    }
                    placeholder="Brief description of the checkup"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <MarkdownEditor
                    label="Full Description"
                    value={formData.description}
                    onChange={(value) =>
                      handleInputChange("description", value)
                    }
                    placeholder="Detailed description of what the checkup includes. You can use Markdown formatting for rich text."
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/hospital_checkups">Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Updating..." : "Update Hospital Checkup"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
