"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Award,
  BookOpen,
  Briefcase,
  Star,
  ChevronRight,
  User,
  Loader2,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getDoctorById } from "@/lib/actions/doctors.action";
import { getImage } from "@/lib/appwrite/bucket";
import { Doctor, DoctorSpecialty } from "@/lib/domains/doctors.domain";

// Specialties mapping for display
const specialtiesMap = {
  [DoctorSpecialty.CARDIOLOGY]: "Kardiologi",
  [DoctorSpecialty.DERMATOLOGY]: "Dermatologi",
  [DoctorSpecialty.GASTROENTEROLOGY]: "Gastroenterologi",
  [DoctorSpecialty.NEUROLOGY]: "Neurologi",
  [DoctorSpecialty.ONCOLOGY]: "Onkologi",
  [DoctorSpecialty.PEDIATRICS]: "Pediatri",
  [DoctorSpecialty.PSYCHIATRY]: "Psikiatri",
  [DoctorSpecialty.RADIOLOGY]: "Radiologi",
  [DoctorSpecialty.SURGERY]: "Bedah",
  [DoctorSpecialty.UROLOGY]: "Urologi",
  [DoctorSpecialty.OTHER]: "Lainnya",
};

type DaySchedule = {
  start: string;
  end: string;
  available: boolean;
};

type WorkingHoursFormat = {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
  [key: string]: DaySchedule;
};

export default function DoctorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Parsed doctor data
  const [languages, setLanguages] = useState<string[]>([]);
  const [workingHours, setWorkingHours] = useState<
    { day: string; hours: string; available: boolean }[]
  >([]);
  const [education, setEducation] = useState<
    { degree: string; institution: string; year: string }[]
  >([]);
  const [experience, setExperience] = useState<
    { position: string; institution: string; period: string }[]
  >([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [awards, setAwards] = useState<
    { title: string; organization: string; year: string }[]
  >([]);

  useEffect(() => {
    async function fetchDoctor() {
      setLoading(true);
      try {
        const result = await getDoctorById(params.id);

        if (result.error) {
          setError(result.error);
          return;
        }

        if (result.data) {
          setDoctor(result.data as unknown as Doctor);

          // Parse JSON fields
          try {
            if (result.data.languages) {
              setLanguages(JSON.parse(result.data.languages));
            }

            if (result.data.working_hours) {
              // Parse working hours in the new format
              const workingHoursData = JSON.parse(
                result.data.working_hours
              ) as WorkingHoursFormat;

              // Convert to array format for display
              const formattedHours = Object.entries(workingHoursData).map(
                ([day, schedule]) => {
                  // Capitalize first letter of day
                  const formattedDay =
                    day.charAt(0).toUpperCase() + day.slice(1);

                  return {
                    day: formattedDay,
                    hours: `${schedule.start} - ${schedule.end}`,
                    available: schedule.available,
                  };
                }
              );

              setWorkingHours(formattedHours);
            }

            // These fields might be in the biography as structured data
            // This is just an example - adjust based on your actual data structure
            if (result.data.biography) {
              try {
                const bioData = JSON.parse(result.data.biography);
                if (bioData.education) setEducation(bioData.education);
                if (bioData.experience) setExperience(bioData.experience);
                if (bioData.certifications)
                  setCertifications(bioData.certifications);
                if (bioData.awards) setAwards(bioData.awards);
              } catch {
                // Biography is just plain text, not JSON
              }
            }
          } catch (e) {
            console.error("Error parsing doctor data:", e);
          }
        }
      } catch {
        setError("Failed to fetch doctor data");
      } finally {
        setLoading(false);
      }
    }

    fetchDoctor();
  }, [params.id]);

  useEffect(() => {
    async function fetchDoctorImage() {
      if (!doctor || !doctor.photo_url) return;

      try {
        const result = await getImage(doctor.photo_url);
        if (result.data && result.data.file) {
          // Convert ArrayBuffer to object URL
          const arrayBufferView = new Uint8Array(result.data.file);
          const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        }
      } catch (error) {
        console.error("Error fetching doctor image:", error);
      }
    }

    fetchDoctorImage();

    // Cleanup
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [doctor]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#329ff2] mb-4" />
          <p className="text-muted-foreground">Memuat data dokter...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !doctor) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Dokter Tidak Ditemukan
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
          {error || "Dokter yang Anda cari tidak ada."}
        </p>
        <Button
          asChild
          className="mt-6 sm:mt-8 bg-[#329ff2] hover:bg-[#1e8ddd]"
        >
          <Link href="/doctors">Kembali ke Dokter</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-[#1f6fad] to-[#2a80c5] py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-[#a9dbff]">
              <Link href="/" className="hover:text-white">
                Beranda
              </Link>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              <Link href="/doctors" className="hover:text-white">
                Dokter
              </Link>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="truncate">
                Dr. {doctor.first_name} {doctor.last_name}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Dr. {doctor.first_name} {doctor.last_name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#c9eaff]">
              {specialtiesMap[
                doctor.specialty as keyof typeof specialtiesMap
              ] || "Umum"}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {/* Sidebar with doctor image and contact info - stacks on mobile */}
          <div className="lg:col-span-1 order-1 lg:order-1">
            <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
              <div className="overflow-hidden rounded-lg border-2 sm:border-4 border-[#e5f5ff] shadow-lg bg-[#f0f9ff] aspect-square relative">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={`Dr. ${doctor.first_name} ${doctor.last_name}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={100} className="text-[#1f6fad]/30" />
                  </div>
                )}
              </div>

              {/* Mobile-friendly contact card */}
              <Card className="border-[#e5f5ff]">
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <CardTitle className="text-lg sm:text-xl text-[#1f6fad]">
                    Informasi Kontak
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2 space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#e5f5ff] flex-shrink-0">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                    <span className="break-all">{doctor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#e5f5ff] flex-shrink-0">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#e5f5ff] flex-shrink-0">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                    <span>{doctor.address}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Responsive schedule card */}
              <Card className="border-[#e5f5ff]">
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <CardTitle className="text-lg sm:text-xl text-[#1f6fad]">
                    Jadwal
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Waktu janji temu yang tersedia
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2 space-y-3 sm:space-y-4">
                  {workingHours.length > 0 ? (
                    workingHours.map((schedule, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between border-b border-[#f0f9ff] pb-2 last:border-0 text-sm ${
                          !schedule.available ? "opacity-50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#e5f5ff] flex-shrink-0">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                          </div>
                          <span>{schedule.day}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2">
                          {schedule.available ? (
                            <>
                              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-[#7fcbff]" />
                              <span className="text-xs sm:text-sm font-medium text-[#1f6fad]">
                                {schedule.hours}
                              </span>
                            </>
                          ) : (
                            <span className="text-xs sm:text-sm font-medium text-gray-400">
                              Tidak tersedia
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Jadwal tidak tersedia
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Full-width button on all screens */}
              <Button
                className="w-full bg-[#329ff2] hover:bg-[#1e8ddd] text-sm sm:text-base py-2 sm:py-6"
                asChild
              >
                <Link href={`/contact?doctor=${doctor.$id}`}>
                  Buat Janji Temu
                </Link>
              </Button>
            </div>
          </div>

          {/* Main content section - stacks on mobile */}
          <div className="lg:col-span-2 order-2 lg:order-2">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <Badge className="bg-[#e5f5ff] text-[#1f6fad] hover:bg-[#d0ecff] text-xs sm:text-sm">
                  Tentang
                </Badge>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {doctor.biography ||
                    "Tidak ada informasi biografi tersedia untuk dokter ini."}
                </p>
              </div>

              {/* Responsive tabs that scroll horizontally on mobile */}
              <div className="overflow-x-auto pb-2">
                <Tabs defaultValue="education" className="border-[#e5f5ff]">
                  <TabsList className="w-max min-w-full sm:w-full sm:min-w-0 grid grid-flow-col auto-cols-auto sm:grid-cols-3 bg-[#f0f9ff]">
                    <TabsTrigger
                      value="education"
                      className="text-xs sm:text-sm px-2 sm:px-4"
                    >
                      Pendidikan
                    </TabsTrigger>
                    <TabsTrigger
                      value="experience"
                      className="text-xs sm:text-sm px-2 sm:px-4"
                    >
                      Pengalaman
                    </TabsTrigger>
                    <TabsTrigger
                      value="certifications"
                      className="text-xs sm:text-sm px-2 sm:px-4"
                    >
                      Sertifikasi
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="education"
                    className="space-y-3 sm:space-y-4 pt-4"
                  >
                    <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold text-[#1f6fad]">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-[#329ff2]" />{" "}
                      Pendidikan & Pelatihan
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {education.length > 0 ? (
                        education.map((edu, index) => (
                          <div
                            key={index}
                            className="rounded-lg border border-[#e5f5ff] bg-white p-3 sm:p-4 shadow-sm transition-all duration-200 hover:border-[#7fcbff] hover:shadow-md"
                          >
                            <div className="flex flex-wrap gap-2 sm:items-center sm:justify-between">
                              <h4 className="text-sm sm:text-base font-semibold text-[#1f6fad]">
                                {edu.degree}
                              </h4>
                              <span className="rounded-full bg-[#f0f9ff] px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-[#329ff2]">
                                {edu.year}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                              {edu.institution}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-lg border border-[#e5f5ff] bg-white p-3 sm:p-4">
                          <p className="text-sm text-muted-foreground">
                            {doctor.education_and_training ||
                              "Tidak ada informasi pendidikan tersedia."}
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="experience"
                    className="space-y-3 sm:space-y-4 pt-4"
                  >
                    <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold text-[#1f6fad]">
                      <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-[#329ff2]" />{" "}
                      Pengalaman Profesional
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {experience.length > 0 ? (
                        experience.map((exp, index) => (
                          <div
                            key={index}
                            className="rounded-lg border border-[#e5f5ff] bg-white p-3 sm:p-4 shadow-sm transition-all duration-200 hover:border-[#7fcbff] hover:shadow-md"
                          >
                            <div className="flex flex-wrap gap-2 sm:items-center sm:justify-between">
                              <h4 className="text-sm sm:text-base font-semibold text-[#1f6fad]">
                                {exp.position}
                              </h4>
                              <span className="rounded-full bg-[#f0f9ff] px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-[#329ff2]">
                                {exp.period}
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                              {exp.institution}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-lg border border-[#e5f5ff] bg-white p-3 sm:p-4">
                          <p className="text-sm text-muted-foreground">
                            {`Pengalaman: ${doctor.years_of_experience} tahun`}
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="certifications"
                    className="space-y-3 sm:space-y-4 pt-4"
                  >
                    <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold text-[#1f6fad]">
                      <Award className="h-4 w-4 sm:h-5 sm:w-5 text-[#329ff2]" />{" "}
                      Sertifikasi & Lisensi
                    </h3>
                    {certifications.length > 0 ? (
                      <ul className="list-inside list-disc space-y-1 sm:space-y-2 text-xs sm:text-sm">
                        {certifications.map((cert, index) => (
                          <li key={index} className="text-muted-foreground">
                            {cert}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No. Lisensi Medis:{" "}
                        {doctor.medical_license_number || "Tidak tersedia"}
                      </p>
                    )}
                    {awards.length > 0 && (
                      <>
                        <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold mt-4 sm:mt-6 text-[#1f6fad]">
                          <Star className="h-4 w-4 sm:h-5 sm:w-5 text-[#329ff2]" />{" "}
                          Penghargaan & Pengakuan
                        </h3>
                        <div className="space-y-3 sm:space-y-4">
                          {awards.map((award, index) => (
                            <div
                              key={index}
                              className="rounded-lg border border-[#e5f5ff] bg-white p-3 sm:p-4 shadow-sm transition-all duration-200 hover:border-[#7fcbff] hover:shadow-md"
                            >
                              <div className="flex flex-wrap gap-2 sm:items-center sm:justify-between">
                                <h4 className="text-sm sm:text-base font-semibold text-[#1f6fad]">
                                  {award.title}
                                </h4>
                                <span className="rounded-full bg-[#f0f9ff] px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-[#329ff2]">
                                  {award.year}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                                {award.organization}
                              </p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </TabsContent>
                </Tabs>
              </div>

              {/* Languages section */}
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1f6fad]">
                  Bahasa
                </h2>
                <div className="flex flex-wrap gap-2">
                  {languages.length > 0 ? (
                    languages.map((language, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-[#e5f9ff] px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-[#329ff2]"
                      >
                        {language}
                      </span>
                    ))
                  ) : (
                    <span className="rounded-full bg-[#e5f9ff] px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-[#329ff2]">
                      Bahasa Indonesia
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <section className="py-12 sm:py-16 bg-[#f7fafc]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge className="mb-4" variant="outline">
              Butuh Bantuan?
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">
              <span className="text-[#329ff2]">Kontak</span> Kami
            </h2>
            <p className="mt-3 max-w-[700px] mx-auto text-sm sm:text-base text-muted-foreground">
              Tim kami siap membantu Anda merencanakan perawatan kesehatan di
              Penang, Malaysia
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-md border border-[#e5f5ff] hover:border-[#329ff2] transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f5ff]">
                  <Phone className="h-6 w-6 text-[#329ff2]" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#1f6fad] mb-2">Telepon</h3>
              <p className="text-sm text-gray-700 mb-4">
                Hubungi kami langsung untuk konsultasi
              </p>
              <a
                href="tel:+6281234567890"
                className="inline-flex items-center text-[#329ff2] hover:text-[#1f6fad] font-medium text-sm"
              >
                +62 812-3456-7890
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md border border-[#e5f5ff] hover:border-[#329ff2] transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f5ff]">
                  <Mail className="h-6 w-6 text-[#329ff2]" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#1f6fad] mb-2">Email</h3>
              <p className="text-sm text-gray-700 mb-4">
                Kirim pesan untuk informasi lebih lanjut
              </p>
              <a
                href="mailto:info@medisgo.com"
                className="inline-flex items-center text-[#329ff2] hover:text-[#1f6fad] font-medium text-sm"
              >
                info@medisgo.com
              </a>
            </div>

            <div className="bg-white rounded-xl p-6 text-center shadow-md border border-[#e5f5ff] hover:border-[#329ff2] transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f5ff]">
                  <MessageCircle className="h-6 w-6 text-[#329ff2]" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#1f6fad] mb-2">
                WhatsApp
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Chat dengan konsultan medis kami
              </p>
              <a
                href="https://linktr.ee/medisgoo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#329ff2] hover:text-[#1f6fad] font-medium text-sm"
              >
                Chat Sekarang <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              className="bg-[#329ff2] hover:bg-[#1e8ddd] px-8 py-6"
            >
              <Link href="/contact">Hubungi Kami Sekarang</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
