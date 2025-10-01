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
  Clock,
} from "lucide-react";
import { getPublicHospitalCheckupById } from "@/lib/actions/hospital_checkups.action";
import { getPublicHospitalById } from "@/lib/actions/hospitals.action";
import { Hospital } from "@/lib/domains/hospitals.domain";
import { HospitalCheckups } from "@/lib/domains/hospital_checkups.domain";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getImage } from "@/lib/appwrite/bucket";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function CheckupDetailPage() {
  const params = useParams<{ name: string; id: string }>();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [checkup, setCheckup] = useState<HospitalCheckups | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkupImage, setCheckupImage] = useState<string>("");

  useEffect(() => {
    const fetchCheckupData = async () => {
      if (!params.id) return;

      try {
        // Fetch checkup details
        const checkupResponse = await getPublicHospitalCheckupById(params.id);
        if (checkupResponse.error) {
          console.error("Error fetching checkup:", checkupResponse.error);
          setLoading(false);
          return;
        }

        const checkupData = checkupResponse.data as unknown as HospitalCheckups;
        setCheckup(checkupData);

        // Fetch hospital details
        if (checkupData.hospital_id) {
          const hospitalResponse = await getPublicHospitalById(
            checkupData.hospital_id
          );
          if (hospitalResponse.error) {
            console.error("Error fetching hospital:", hospitalResponse.error);
          } else {
            setHospital(hospitalResponse.data as unknown as Hospital);
          }
        }

        // Load checkup image if available
        if (checkupData.image_url) {
          try {
            const imageResponse = await getImage(checkupData.image_url);
            if (imageResponse.data?.file) {
              const blob = new Blob([imageResponse.data.file]);
              const imageUrl = URL.createObjectURL(blob);
              setCheckupImage(imageUrl);
            }
          } catch (error) {
            console.error("Failed to load checkup image:", error);
          }
        }
      } catch (error) {
        console.error("Failed to fetch checkup data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckupData();
  }, [params.id]);

  // Convert hospital name to URL-friendly slug for navigation
  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkup details...</p>
        </div>
      </div>
    );
  }

  if (!checkup) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Stethoscope className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Checkup Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The medical checkup you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href={hospital ? `/hospital/${createSlug(hospital.name)}` : "/"}
          >
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {hospital ? "Back to Hospital" : "Back to Home"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          {hospital && (
            <>
              <Link
                href={`/hospital/${createSlug(hospital.name)}`}
                className="hover:text-blue-600"
              >
                {hospital.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-900">{checkup.title}</span>
        </div>

        {/* Back Button */}
        <Link
          href={hospital ? `/hospital/${createSlug(hospital.name)}` : "/"}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to {hospital ? hospital.name : "Home"}
        </Link>

        {/* Checkup Header */}
        <Card className="mb-8">
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Image Section */}
            <div className="aspect-video relative bg-gray-200 rounded-lg overflow-hidden">
              {checkupImage ? (
                <Image
                  src={checkupImage}
                  alt={checkup.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Stethoscope className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {checkup.title}
                </h1>
                <p className="text-gray-600 text-lg">
                  {checkup.short_description}
                </p>
              </div>

              {hospital && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Building className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">{hospital.name}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-green-600">
                <DollarSign className="h-6 w-6" />
                <span className="text-2xl font-bold">
                  {checkup.price.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">
                  Added on {new Date(checkup.$createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-4 w-4" />
                <span className="text-sm">
                  Last updated{" "}
                  {new Date(checkup.$updatedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="pt-4">
                <Button size="lg" className="w-full">
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Description Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-blue-600" />
              Checkup Details
            </CardTitle>
            <CardDescription>
              Complete information about this medical checkup package
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-lg font-medium text-gray-800 mb-2 mt-4">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-gray-700">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-gray-900">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => (
                    <em className="italic text-gray-800">{children}</em>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-200 pl-4 py-2 my-4 bg-blue-50 text-gray-700">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                      {children}
                    </pre>
                  ),
                  table: ({ children }) => (
                    <table className="w-full border-collapse border border-gray-300 my-4">
                      {children}
                    </table>
                  ),
                  th: ({ children }) => (
                    <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-gray-300 px-4 py-2">
                      {children}
                    </td>
                  ),
                }}
              >
                {checkup.description}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>

        {/* Hospital Information Card */}
        {hospital && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600" />
                Hospital Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {hospital.name}
                  </h3>
                  <p className="text-gray-600">
                    Medical facility providing comprehensive healthcare
                    services.
                  </p>
                </div>
                <div className="space-y-3">
                  <div>
                    <Link href={`/hospital/${createSlug(hospital.name)}`}>
                      <Button variant="outline" size="sm">
                        View All Checkups at {hospital.name}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
