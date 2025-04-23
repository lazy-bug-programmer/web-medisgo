/* eslint-disable @typescript-eslint/no-explicit-any */
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

// Mock data for doctors
const doctors = [
  {
    id: "sarah-johnson",
    name: "Dr. Sarah Johnson",
    specialty: "Kardiologi",
    image: "/placeholder.svg?height=600&width=600",
    education: [
      { degree: "MD", institution: "Harvard Medical School", year: "2005" },
      {
        degree: "Residensi",
        institution: "Massachusetts General Hospital",
        year: "2009",
      },
      { degree: "Fellowship", institution: "Cleveland Clinic", year: "2011" },
    ],
    experience: [
      {
        position: "Kardiologis Senior",
        institution: "Mayo Clinic",
        period: "2011-2018",
      },
      {
        position: "Kepala Kardiologi",
        institution: "MediCare Hospital",
        period: "2018-Sekarang",
      },
    ],
    certifications: [
      "American Board of Internal Medicine",
      "American College of Cardiology",
      "Advanced Cardiac Life Support",
    ],
    publications: [
      {
        title: "Kemajuan dalam Teknik Pencitraan Jantung",
        journal: "Journal of Cardiology",
        year: "2015",
      },
      {
        title: "Hasil Jangka Panjang Pemasangan Stent",
        journal: "New England Journal of Medicine",
        year: "2017",
      },
      {
        title: "Kardiologi Preventif: Tinjauan Komprehensif",
        journal: "Circulation",
        year: "2019",
      },
    ],
    awards: [
      {
        title: "Keunggulan dalam Perawatan Klinis",
        organization: "American Heart Association",
        year: "2016",
      },
      {
        title: "Penghargaan Peneliti Terbaik",
        organization: "Cardiovascular Research Foundation",
        year: "2018",
      },
    ],
    languages: ["Inggris", "Spanyol"],
    bio: "Dr. Sarah Johnson adalah kardiologis bersertifikat dengan pengalaman lebih dari 15 tahun dalam mendiagnosis dan mengobati kondisi jantung. Dia mengkhususkan diri dalam kardiologi intervensi, pencitraan jantung, dan kardiologi preventif. Dr. Johnson memiliki semangat untuk pendidikan pasien dan memberdayakan individu untuk mengontrol kesehatan jantung mereka melalui modifikasi gaya hidup dan intervensi medis yang tepat.",
    contact: {
      email: "sarah.johnson@medicare-hospital.com",
      phone: "+1 (555) 123-4567",
      office: "Departemen Kardiologi, Lantai 3, MediCare Hospital",
    },
    schedule: [
      { day: "Senin", hours: "9:00 - 17:00" },
      { day: "Rabu", hours: "9:00 - 17:00" },
      { day: "Jumat", hours: "9:00 - 13:00" },
    ],
  },
  {
    id: "michael-chen",
    name: "Dr. Michael Chen",
    specialty: "Neurologi",
    image: "/placeholder.svg?height=600&width=600",
    education: [
      { degree: "MD", institution: "Johns Hopkins University", year: "2008" },
      { degree: "Residensi", institution: "UCSF Medical Center", year: "2012" },
      { degree: "Fellowship", institution: "Mayo Clinic", year: "2014" },
    ],
    experience: [
      {
        position: "Neurolog",
        institution: "Cleveland Clinic",
        period: "2014-2019",
      },
      {
        position: "Neurolog Senior",
        institution: "MediCare Hospital",
        period: "2019-Sekarang",
      },
    ],
    certifications: [
      "American Board of Psychiatry and Neurology",
      "American Academy of Neurology",
    ],
    publications: [
      {
        title: "Neuroplastisitas dalam Pemulihan Stroke",
        journal: "Neurology",
        year: "2016",
      },
      {
        title: "Kemajuan dalam Pengobatan Multiple Sclerosis",
        journal: "Journal of Neuroscience",
        year: "2018",
      },
      {
        title: "Biomarker untuk Penyakit Alzheimer",
        journal: "Nature Neuroscience",
        year: "2020",
      },
    ],
    awards: [
      {
        title: "Penghargaan Peneliti Muda",
        organization: "American Academy of Neurology",
        year: "2017",
      },
      {
        title: "Keunggulan dalam Perawatan Pasien",
        organization: "National Neurology Association",
        year: "2019",
      },
    ],
    languages: ["Inggris", "Mandarin"],
    bio: "Dr. Michael Chen adalah neurolog bersertifikat yang mengkhususkan diri dalam diagnosis dan pengobatan gangguan neurologis. Bidang keahliannya meliputi manajemen stroke, multiple sclerosis, dan penyakit neurodegeneratif. Dr. Chen berkomitmen untuk memberikan perawatan yang penuh kasih dan memanfaatkan kemajuan terbaru dalam neurologi untuk meningkatkan hasil pasien.",
    contact: {
      email: "michael.chen@medicare-hospital.com",
      phone: "+1 (555) 234-5678",
      office: "Departemen Neurologi, Lantai 4, MediCare Hospital",
    },
    schedule: [
      { day: "Selasa", hours: "9:00 - 17:00" },
      { day: "Kamis", hours: "9:00 - 17:00" },
      { day: "Sabtu", hours: "9:00 - 13:00" },
    ],
  },
  {
    id: "emily-rodriguez",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatri",
    image: "/placeholder.svg?height=600&width=600",
    education: [
      { degree: "MD", institution: "Stanford University", year: "2010" },
      {
        degree: "Residensi",
        institution: "Children's Hospital of Philadelphia",
        year: "2013",
      },
      {
        degree: "Fellowship",
        institution: "Boston Children's Hospital",
        year: "2015",
      },
    ],
    experience: [
      {
        position: "Dokter Anak",
        institution: "Children's National Hospital",
        period: "2015-2020",
      },
      {
        position: "Dokter Anak Senior",
        institution: "MediCare Hospital",
        period: "2020-Sekarang",
      },
    ],
    certifications: [
      "American Board of Pediatrics",
      "Pediatric Advanced Life Support",
    ],
    publications: [
      {
        title: "Strategi Pencegahan Obesitas Anak",
        journal: "Pediatrics",
        year: "2017",
      },
      {
        title: "Keraguan Vaksin di Kalangan Orang Tua",
        journal: "Journal of Pediatric Health",
        year: "2019",
      },
      {
        title: "Intervensi Dini dalam Keterlambatan Perkembangan",
        journal: "Child Development",
        year: "2021",
      },
    ],
    awards: [
      {
        title: "Penghargaan Dokter Penuh Kasih",
        organization: "Patient's Choice",
        year: "2018",
      },
      {
        title: "Dokter Anak Terbaik",
        organization: "City Health Magazine",
        year: "2020",
      },
    ],
    languages: ["Inggris", "Spanyol"],
    bio: "Dr. Emily Rodriguez adalah dokter anak bersertifikat yang berdedikasi untuk memberikan perawatan kesehatan komprehensif untuk anak-anak dari lahir hingga remaja. Dia memiliki minat khusus dalam perawatan preventif, perkembangan anak, dan kedokteran remaja. Dr. Rodriguez percaya pada membangun hubungan yang kuat dengan pasien dan keluarga mereka untuk mempromosikan gaya hidup sehat dan mengatasi masalah kesehatan dengan cepat.",
    contact: {
      email: "emily.rodriguez@medicare-hospital.com",
      phone: "+1 (555) 345-6789",
      office: "Departemen Pediatri, Lantai 2, MediCare Hospital",
    },
    schedule: [
      { day: "Senin", hours: "9:00 - 17:00" },
      { day: "Rabu", hours: "9:00 - 17:00" },
      { day: "Kamis", hours: "9:00 - 17:00" },
    ],
  },
];

export default async function DoctorDetailPage({ params }: { params: any }) {
  // Find the doctor by ID
  const doctor = doctors.find(async (doc) => doc.id === (await params).id);

  // If doctor not found, display a message
  if (!doctor) {
    return (
      <div className="container mx-auto px-4 py-8 sm:py-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Dokter Tidak Ditemukan
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
          Dokter yang Anda cari tidak ada.
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
              <span className="truncate">{doctor.name}</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              {doctor.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#c9eaff]">
              {doctor.specialty}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
          {/* Sidebar with doctor image and contact info - stacks on mobile */}
          <div className="lg:col-span-1 order-1 lg:order-1">
            <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
              <div className="overflow-hidden rounded-lg border-2 sm:border-4 border-[#e5f5ff] shadow-lg">
                <Image
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  width={600}
                  height={600}
                  className="w-full object-cover"
                />
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
                    <span className="break-all">{doctor.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#e5f5ff] flex-shrink-0">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                    <span>{doctor.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#e5f5ff] flex-shrink-0">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                    <span>{doctor.contact.office}</span>
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
                  {doctor.schedule.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-[#f0f9ff] pb-2 last:border-0 text-sm"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#e5f5ff] flex-shrink-0">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                        </div>
                        <span>{schedule.day}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-[#7fcbff]" />
                        <span className="text-xs sm:text-sm font-medium text-[#1f6fad]">
                          {schedule.hours}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Full-width button on all screens */}
              <Button className="w-full bg-[#329ff2] hover:bg-[#1e8ddd] text-sm sm:text-base py-2 sm:py-6">
                Buat Janji Temu
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
                  {doctor.bio}
                </p>
              </div>

              {/* Responsive tabs that scroll horizontally on mobile */}
              <div className="overflow-x-auto pb-2">
                <Tabs defaultValue="education" className="border-[#e5f5ff]">
                  <TabsList className="w-max min-w-full sm:w-full sm:min-w-0 grid grid-flow-col auto-cols-auto sm:grid-cols-4 bg-[#f0f9ff]">
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
                    <TabsTrigger
                      value="publications"
                      className="text-xs sm:text-sm px-2 sm:px-4"
                    >
                      Publikasi
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
                      {doctor.education.map((edu, index) => (
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
                      ))}
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
                      {doctor.experience.map((exp, index) => (
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
                      ))}
                    </div>
                  </TabsContent>

                  {/* Similar pattern for certifications and publications tabs */}
                  <TabsContent
                    value="certifications"
                    className="space-y-3 sm:space-y-4 pt-4"
                  >
                    <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold text-[#1f6fad]">
                      <Award className="h-4 w-4 sm:h-5 sm:w-5 text-[#329ff2]" />{" "}
                      Sertifikasi & Lisensi
                    </h3>
                    <ul className="list-inside list-disc space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      {doctor.certifications.map((cert, index) => (
                        <li key={index} className="text-muted-foreground">
                          {cert}
                        </li>
                      ))}
                    </ul>
                    <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold mt-4 sm:mt-6 text-[#1f6fad]">
                      <Star className="h-4 w-4 sm:h-5 sm:w-5 text-[#329ff2]" />{" "}
                      Penghargaan & Pengakuan
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {doctor.awards.map((award, index) => (
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
                  </TabsContent>

                  <TabsContent
                    value="publications"
                    className="space-y-3 sm:space-y-4 pt-4"
                  >
                    <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold text-[#1f6fad]">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-[#329ff2]" />{" "}
                      Penelitian & Publikasi
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {doctor.publications.map((pub, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-[#e5f5ff] bg-white p-3 sm:p-4 shadow-sm transition-all duration-200 hover:border-[#7fcbff] hover:shadow-md"
                        >
                          <div className="flex flex-wrap gap-2 sm:items-center sm:justify-between">
                            <h4 className="text-sm sm:text-base font-semibold text-[#1f6fad]">
                              {pub.title}
                            </h4>
                            <span className="rounded-full bg-[#f0f9ff] px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-[#329ff2]">
                              {pub.year}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            {pub.journal}
                          </p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Languages section */}
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1f6fad]">
                  Bahasa
                </h2>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((language, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-[#e5f5ff] px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-[#329ff2]"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
