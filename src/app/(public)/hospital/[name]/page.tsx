"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Building,
  Stethoscope,
} from "lucide-react";
import { getPublicHospitalCheckupsByHospitalId } from "@/lib/actions/hospital_checkups.action";
import { Hospital } from "@/lib/domains/hospitals.domain";
import { HospitalCheckups } from "@/lib/domains/hospital_checkups.domain";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getImage } from "@/lib/appwrite/bucket";

export default function HospitalPage() {
  const params = useParams<{ name: string }>();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [checkups, setCheckups] = useState<HospitalCheckups[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkupImages, setCheckupImages] = useState<Record<string, string>>(
    {}
  );

  // Convert hospital name to URL-friendly slug
  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
  };

  useEffect(() => {
    const fetchHospitalData = async () => {
      if (!params.name) return;

      try {
        // Since we don't have a direct slug-to-hospital mapping,
        // we'll need to search through all hospitals
        const { getPublicHospitals } = await import(
          "@/lib/actions/hospitals.action"
        );
        const hospitalsResponse = await getPublicHospitals();

        if (hospitalsResponse.error) {
          console.error("Error fetching hospitals:", hospitalsResponse.error);
          setLoading(false);
          return;
        }

        const hospitals = hospitalsResponse.data as unknown as Hospital[];
        const matchedHospital = hospitals.find(
          (h) => createSlug(h.name) === params.name
        );

        if (!matchedHospital) {
          console.error("Hospital not found");
          setLoading(false);
          return;
        }

        setHospital(matchedHospital);

        // Fetch checkups for this hospital
        const checkupsResponse = await getPublicHospitalCheckupsByHospitalId(
          matchedHospital.$id
        );
        if (checkupsResponse.error) {
          console.error("Error fetching checkups:", checkupsResponse.error);
        } else {
          setCheckups(checkupsResponse.data as unknown as HospitalCheckups[]);
        }
      } catch (error) {
        console.error("Failed to fetch hospital data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalData();
  }, [params.name]);

  // Load images for checkups
  useEffect(() => {
    const loadCheckupImages = async () => {
      const imagePromises = checkups.map(async (checkup) => {
        if (!checkup.image_url) return null;

        try {
          const response = await getImage(checkup.image_url);
          if (response.data?.file) {
            const blob = new Blob([response.data.file]);
            const imageUrl = URL.createObjectURL(blob);

            return {
              id: checkup.$id,
              url: imageUrl,
            };
          }
        } catch (error) {
          console.error(
            `Failed to load image for checkup ${checkup.$id}:`,
            error
          );
        }
        return null;
      });

      const results = await Promise.all(imagePromises);
      const imageMap: Record<string, string> = {};

      results.forEach((result) => {
        if (result) {
          imageMap[result.id] = result.url;
        }
      });

      setCheckupImages(imageMap);
    };

    if (checkups.length > 0) {
      loadCheckupImages();
    }
  }, [checkups]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hospital information...</p>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Hospital Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The hospital you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        {/* Hospital Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {hospital.name}
              </h1>
              <p className="text-gray-600">Medical Checkup Packages</p>
            </div>
          </div>
        </div>

        {/* Checkups Grid */}
        {checkups.length === 0 ? (
          <div className="text-center py-12">
            <Stethoscope className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No Checkups Available
            </h2>
            <p className="text-gray-600">
              This hospital doesn&apos;t have any medical checkup packages yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checkups.map((checkup) => (
              <Card
                key={checkup.$id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video relative bg-gray-200">
                  {checkupImages[checkup.$id] ? (
                    <Image
                      src={checkupImages[checkup.$id]}
                      alt={checkup.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Stethoscope className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-lg">{checkup.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {checkup.short_description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-green-600 font-semibold">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {checkup.price.toFixed(2)}
                    </div>
                    <Badge variant="outline">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(checkup.$createdAt).toLocaleDateString()}
                    </Badge>
                  </div>

                  <Link
                    href={`/hospital/${params.name}/checkup/${checkup.$id}`}
                  >
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
