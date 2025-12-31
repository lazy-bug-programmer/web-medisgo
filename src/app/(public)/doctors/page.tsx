"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, User, ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getDoctors,
  getDoctorsBySpecialty,
  getUniqueSpecialties,
  getUniqueHospitals,
} from "@/lib/actions/doctors.action";
import { getImage } from "@/lib/appwrite/bucket";
import { Doctor } from "@/lib/domains/doctors.domain";

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [displayedDoctors, setDisplayedDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Semua");
  const [selectedHospital, setSelectedHospital] = useState("Semua");
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  // Dynamic filter options
  const [specialties, setSpecialties] = useState<string[]>(["Semua"]);
  const [hospitals, setHospitals] = useState<string[]>(["Semua"]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Fetch unique specialties and hospitals on mount
  useEffect(() => {
    async function fetchFilters() {
      try {
        const [specialtiesResult, hospitalsResult] = await Promise.all([
          getUniqueSpecialties(),
          getUniqueHospitals(),
        ]);

        if (specialtiesResult.data) {
          setSpecialties(["Semua", ...specialtiesResult.data]);
        }

        if (hospitalsResult.data) {
          setHospitals(["Semua", ...hospitalsResult.data]);
        }
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    }

    fetchFilters();
  }, []);

  useEffect(() => {
    async function fetchDoctors() {
      setLoading(true);
      try {
        let result;
        if (selectedSpecialty === "Semua") {
          result = await getDoctors();
        } else {
          result = await getDoctorsBySpecialty(selectedSpecialty);
        }

        if (result.data) {
          setDoctors(result.data as unknown as Doctor[]);
          setFilteredDoctors(result.data as unknown as Doctor[]);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, [selectedSpecialty]);

  useEffect(() => {
    // Filter doctors based on search queries
    let filtered: Doctor[];

    if (searchQuery.trim() === "" && selectedHospital === "Semua") {
      filtered = doctors;
    } else {
      filtered = doctors.filter((doctor) => {
        const nameMatch =
          searchQuery.trim() === "" ||
          `${doctor.first_name} ${doctor.last_name}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          doctor.specialty?.toLowerCase().includes(searchQuery.toLowerCase());

        const hospitalMatch =
          selectedHospital === "Semua" || doctor.address === selectedHospital;

        return nameMatch && hospitalMatch;
      });
    }

    // Sort doctors to show those with images first
    const sortedFiltered = filtered.sort((a, b) => {
      const aHasImage = a.photo_url ? 1 : 0;
      const bHasImage = b.photo_url ? 1 : 0;
      return bHasImage - aHasImage; // Doctors with images first
    });

    setFilteredDoctors(sortedFiltered);
  }, [searchQuery, selectedHospital, doctors]);

  useEffect(() => {
    // Fetch images only for currently displayed doctors
    async function fetchDoctorImages() {
      const newImageUrls: Record<string, string> = {};

      for (const doctor of displayedDoctors) {
        if (doctor.photo_url && !imageUrls[doctor.$id]) {
          try {
            const result = await getImage(doctor.photo_url);
            if (result.data && result.data.file) {
              // Convert ArrayBuffer to object URL
              const arrayBufferView = new Uint8Array(result.data.file);
              const blob = new Blob([arrayBufferView], { type: "image/jpeg" });
              const url = URL.createObjectURL(blob);
              newImageUrls[doctor.$id] = url;
            }
          } catch (error) {
            console.error(
              `Error fetching image for doctor ${doctor.$id}:`,
              error
            );
          }
        }
      }

      if (Object.keys(newImageUrls).length > 0) {
        setImageUrls((prev) => ({ ...prev, ...newImageUrls }));
      }
    }

    if (displayedDoctors.length > 0) {
      fetchDoctorImages();
    }

    // Cleanup function to revoke object URLs for doctors no longer displayed
    return () => {
      const displayedDoctorIds = new Set(displayedDoctors.map((d) => d.$id));
      Object.entries(imageUrls).forEach(([doctorId, url]) => {
        if (!displayedDoctorIds.has(doctorId)) {
          URL.revokeObjectURL(url);
          setImageUrls((prev) => {
            const updated = { ...prev };
            delete updated[doctorId];
            return updated;
          });
        }
      });
    };
  }, [displayedDoctors, imageUrls]);

  useEffect(() => {
    // Calculate pagination for filtered doctors
    const totalItems = filteredDoctors.length;
    const calculatedTotalPages = Math.max(
      1,
      Math.ceil(totalItems / ITEMS_PER_PAGE)
    );
    setTotalPages(calculatedTotalPages);

    // Reset to page 1 when filters change
    if (currentPage > calculatedTotalPages) {
      setCurrentPage(1);
    }

    // Get current page items
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
    setDisplayedDoctors(filteredDoctors.slice(startIndex, endIndex));
  }, [filteredDoctors, currentPage]);

  const handleSpecialtyChange = (value: string) => {
    setSelectedSpecialty(value);
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-[#1f6fad] to-[#2a80c5] py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center text-white">
            <Badge
              className="mb-3 sm:mb-4 bg-white/10 text-white hover:bg-white/20"
              variant="secondary"
            >
              Tim Kami
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Temui Dokter Kami
            </h1>
            <p className="mt-3 sm:mt-4 max-w-[700px] text-sm sm:text-base text-[#a9dbff]">
              Tim dokter kami yang berpengalaman dan berdedikasi berkomitmen
              untuk memberikan perawatan dengan kualitas tertinggi kepada pasien
              kami.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center flex-1">
            <div className="relative w-full sm:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari dokter..."
                className="w-full pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="w-full sm:max-w-sm">
              <Select
                value={selectedHospital}
                onValueChange={(value) => setSelectedHospital(value)}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Pilih Rumah Sakit" />
                </SelectTrigger>
                <SelectContent>
                  {hospitals.map((hospital) => (
                    <SelectItem key={hospital} value={hospital}>
                      {hospital}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Specialty dropdown menu */}
          <div className="w-full lg:w-auto">
            <Select
              value={selectedSpecialty}
              onValueChange={handleSpecialtyChange}
            >
              <SelectTrigger className="w-full lg:w-[200px] bg-white">
                <SelectValue placeholder="Pilih Spesialisasi" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {loading ? (
          <div className="mt-10 flex justify-center">
            <p className="text-muted-foreground">Memuat data dokter...</p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="mt-10 flex justify-center">
            <p className="text-muted-foreground">
              Tidak ada dokter yang ditemukan
            </p>
          </div>
        ) : (
          <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayedDoctors.map((doctor) => (
              <Card
                key={doctor.$id}
                className="group overflow-hidden border-[#e5f5ff] transition-all duration-300 hover:border-[#7fcbff] hover:shadow-lg"
              >
                <div className="aspect-square relative bg-[#f0f9ff]">
                  {imageUrls[doctor.$id] ? (
                    <Image
                      src={imageUrls[doctor.$id]}
                      alt={`${doctor.first_name} ${doctor.last_name}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={100} className="text-[#1f6fad]/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1f6fad]/80 via-[#1f6fad]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                </div>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl text-[#1f6fad]">
                    Dr. {doctor.first_name} {doctor.last_name}
                  </CardTitle>
                  <CardDescription className="text-sm text-[#329ff2]">
                    {doctor.specialty || "Umum"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                  <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                    <div>
                      <p className="font-medium">Pendidikan</p>
                      <p className="text-muted-foreground">
                        {doctor.education_and_training || "-"}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Pengalaman</p>
                      <p className="text-muted-foreground">10 tahun</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:justify-between p-4 sm:p-6 pt-0 sm:pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#d0ecff] hover:bg-[#f0f9ff] hover:text-[#329ff2] w-full sm:w-auto text-xs sm:text-sm"
                    asChild
                  >
                    <Link href={`/doctors/${doctor.$id}`}>Lihat Profil</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#329ff2] hover:bg-[#1e8ddd] w-full sm:w-auto text-xs sm:text-sm"
                    asChild
                  >
                    <Link href="/contact">Buat Janji</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {filteredDoctors.length > 0 && (
          <div className="mt-6 sm:mt-8 flex items-center justify-center">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 sm:h-9 sm:w-9"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <span className="sr-only">Halaman sebelumnya</span>
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Generate page buttons */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;

                // Logic to show correct page numbers when there are many pages
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant="outline"
                    size="sm"
                    className={`h-8 w-8 text-xs sm:text-sm ${
                      currentPage === pageNum
                        ? "bg-[#f0f9ff] text-[#329ff2]"
                        : ""
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                );
              })}

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 sm:h-9 sm:w-9"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <span className="sr-only">Halaman berikutnya</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Hospital Partners Section */}
      <div className="bg-[#f0f9ff] py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <Badge className="mb-3 sm:mb-4" variant="outline">
              Bekerja Sama
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl mb-3 sm:mb-4">
              Rumah Sakit <span className="text-[#329ff2]">Mitra Kami</span>
            </h2>
            <p className="max-w-[700px] text-sm sm:text-base text-muted-foreground mb-8 sm:mb-10">
              Kami berkolaborasi dengan institusi kesehatan terkemuka di
              Malaysia untuk memastikan Anda mendapatkan perawatan medis terbaik
              yang tersedia.
            </p>
          </div>

          {/* Single featured hospital partners image */}
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <div className="w-full">
                <Image
                  src="/latest_partners.jpg"
                  alt="Rumah Sakit Mitra"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
