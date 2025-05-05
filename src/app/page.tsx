import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  HeartPulse,
  Stethoscope,
  Users,
  Phone,
  Star,
  CheckCircle,
  ChevronRight,
  Shield,
  Activity,
  MapIcon,
  ExternalLink,
  Mail,
  Instagram,
  Facebook,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-28 lg:py-32">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-[#329ff2] blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#1f6fad] blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid gap-8 md:gap-12 md:grid-cols-2 md:items-center">
            <div className="flex flex-col space-y-4 sm:space-y-6 text-[#1f6fad]">
              <Badge
                className="w-fit bg-[#e5f5ff] text-[#329ff2] hover:bg-[#d0ebff]"
                variant="secondary"
              >
                Penyedia Layanan Kesehatan Terkemuka
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl xl:text-7xl">
                Kesehatan Anda Adalah{" "}
                <span className="gradient-text">Prioritas Kami</span>
              </h1>
              <p className="max-w-[600px] text-base sm:text-lg text-gray-600 md:text-xl">
                Menyedia information berobat di Malaysia, secara effektif dan
                efissien. Tim doktor yg siap sedia terima anda (paisen dari
                Indonesia).
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-[#329ff2] text-white hover:bg-[#1e8ddd] w-full sm:w-auto"
                >
                  <Link href="/doctors">
                    Temui Dokter Kami <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-[#329ff2] text-[#329ff2] hover:bg-[#e5f5ff] w-full sm:w-auto"
                >
                  <Link href="/appointment">Buat Janji Temu</Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-4">
                <div className="flex -space-x-3 sm:-space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 sm:h-10 sm:w-10 overflow-hidden rounded-full border-2 border-[#e5f5ff]"
                    >
                      <Image
                        src={`/600x600.svg`}
                        alt={`Dokter ${i}`}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-600">
                    <span className="font-bold">4.9</span> (2.5k+ ulasan)
                  </span>
                </div>
              </div>
            </div>
            <div className="relative mx-auto md:ml-auto mt-8 md:mt-0">
              <div className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px] animate-float">
                <div className="absolute left-0 top-0 h-full w-full rounded-full bg-[#329ff2]/10 blur-3xl"></div>
                <div className="blob-shape relative h-full w-full overflow-hidden border-8 border-[#e5f5ff] bg-gradient-to-br from-[#7fcbff] to-[#329ff2]">
                  <Image
                    src="/600x600.svg"
                    alt="Dokter"
                    fill
                    className="h-full w-full object-cover opacity-90 mix-blend-overlay"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#e5f5ff]">
                    <Activity className="h-4 w-4 sm:h-6 sm:w-6 text-[#329ff2]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500">
                      Layanan Darurat
                    </p>
                    <p className="text-sm sm:text-lg font-bold text-[#329ff2]">
                      Tersedia 24/7
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 top-1/4 sm:-right-6 rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 shadow-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#e5f5ff]">
                    <Shield className="h-4 w-4 sm:h-6 sm:w-6 text-[#329ff2]" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500">
                      Perawatan Terpercaya
                    </p>
                    <p className="text-sm sm:text-lg font-bold text-[#329ff2]">
                      Sejak 1985
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#f7fafc"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 rounded-xl sm:rounded-2xl border bg-white p-4 sm:p-6 shadow-lg md:grid-cols-4 md:gap-6 lg:gap-8 md:p-8">
          <div className="flex flex-col items-center justify-center text-center p-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#329ff2] md:text-4xl lg:text-5xl">
              35+
            </span>
            <span className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 md:text-base">
              Dokter Berpengalaman
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#329ff2] md:text-4xl lg:text-5xl">
              15k+
            </span>
            <span className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 md:text-base">
              Pasien Puas
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#329ff2] md:text-4xl lg:text-5xl">
              12+
            </span>
            <span className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 md:text-base">
              Spesialisasi Medis
            </span>
          </div>
          <div className="flex flex-col items-center justify-center text-center p-3">
            <span className="text-2xl sm:text-3xl font-bold text-[#329ff2] md:text-4xl lg:text-5xl">
              24/7
            </span>
            <span className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-500 md:text-base">
              Layanan Darurat
            </span>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="wavy-bg py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <Badge className="mb-4" variant="outline">
              Layanan Kami
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Komprehensif Layanan Pengobatan yg Tepat
            </h2>
            <p className="mt-3 sm:mt-4 max-w-[700px] text-sm sm:text-base text-muted-foreground">
              Kami informasi medis yg tepat utk pengobatan di Penang, Kuala
              Lumpur, Melakan dan Johor. Tim medis yg bersedia menangnai
              teman-teman
            </p>
          </div>
          <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="group overflow-hidden border-[#e5f5ff] transition-all duration-300 hover:border-[#7fcbff] hover:shadow-lg">
              <div className="absolute right-4 top-4 rounded-full bg-[#e5f5ff] p-2 text-[#329ff2] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ArrowRight className="h-4 w-4" />
              </div>
              <CardHeader className="flex flex-row items-center gap-3 sm:gap-4 p-4 sm:p-6">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#e5f5ff] transition-all duration-300 group-hover:bg-[#329ff2] group-hover:text-white">
                  <HeartPulse className="h-6 w-6 sm:h-7 sm:w-7 text-[#329ff2] transition-colors duration-300 group-hover:text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Kardiologi</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-2 sm:px-6 sm:pb-4">
                <p className="text-sm sm:text-base text-muted-foreground">
                  Perawatan komprehensif untuk kondisi jantung dengan pilihan
                  diagnostik dan pengobatan canggih.
                </p>
                <ul className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />{" "}
                    Ekokardiografi
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />{" "}
                    Kateterisasi Jantung
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />{" "}
                    Studi Elektrofisiologi
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="px-4 pt-2 pb-4 sm:px-6 sm:pt-2 sm:pb-6">
                <Link
                  href="/services/cardiology"
                  className="flex items-center text-xs sm:text-sm text-[#329ff2] hover:underline"
                >
                  Pelajari Lebih Lanjut{" "}
                  <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </CardFooter>
            </Card>
            <Card className="group overflow-hidden border-[#e5f5ff] transition-all duration-300 hover:border-[#7fcbff] hover:shadow-lg">
              <div className="absolute right-4 top-4 rounded-full bg-[#e5f5ff] p-2 text-[#329ff2] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ArrowRight className="h-4 w-4" />
              </div>
              <CardHeader className="flex flex-row items-center gap-3 sm:gap-4 p-4 sm:p-6">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#e5f5ff] transition-all duration-300 group-hover:bg-[#329ff2] group-hover:text-white">
                  <Stethoscope className="h-6 w-6 sm:h-7 sm:w-7 text-[#329ff2] transition-colors duration-300 group-hover:text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Neurologi</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-2 sm:px-6 sm:pb-4">
                <p className="text-sm sm:text-base text-muted-foreground">
                  Perawatan ahli untuk gangguan neurologis dengan layanan
                  diagnostik dan terapi canggih.
                </p>
                <ul className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />{" "}
                    Elektroensefalografi (EEG)
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />{" "}
                    Pencitraan Saraf
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />{" "}
                    Prosedur Bedah Saraf
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="px-4 pt-2 pb-4 sm:px-6 sm:pt-2 sm:pb-6">
                <Link
                  href="/services/neurology"
                  className="flex items-center text-xs sm:text-sm text-[#329ff2] hover:underline"
                >
                  Pelajari Lebih Lanjut{" "}
                  <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </CardFooter>
            </Card>
            <Card className="group overflow-hidden border-[#e5f5ff] transition-all duration-300 hover:border-[#7fcbff] hover:shadow-lg">
              <div className="absolute right-4 top-4 rounded-full bg-[#e5f5ff] p-2 text-[#329ff2] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ArrowRight className="h-4 w-4" />
              </div>
              <CardHeader className="flex flex-row items-center gap-3 sm:gap-4 p-4 sm:p-6">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#e5f5ff] transition-all duration-300 group-hover:bg-[#329ff2] group-hover:text-white">
                  <Users className="h-6 w-6 sm:h-7 sm:w-7 text-[#329ff2] transition-colors duration-300 group-hover:text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Pediatri</CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-2 sm:px-6 sm:pb-4">
                <p className="text-sm sm:text-base text-muted-foreground">
                  Perawatan kesehatan khusus untuk anak-anak dari lahir hingga
                  remaja, berfokus pada kebutuhan unik mereka.
                </p>
                <ul className="mt-3 sm:mt-4 space-y-1 sm:space-y-2">
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />{" "}
                    Kunjungan Pemeriksaan Anak
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />{" "}
                    Imunisasi
                  </li>
                  <li className="flex items-center gap-2 text-xs sm:text-sm">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />{" "}
                    Penilaian Perkembangan
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="px-4 pt-2 pb-4 sm:px-6 sm:pt-2 sm:pb-6">
                <Link
                  href="/services/pediatrics"
                  className="flex items-center text-xs sm:text-sm text-[#329ff2] hover:underline"
                >
                  Pelajari Lebih Lanjut{" "}
                  <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                </Link>
              </CardFooter>
            </Card>
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <Button
              asChild
              className="bg-[#329ff2] hover:bg-[#1e8ddd] w-full sm:w-auto"
            >
              <Link href="/services">
                Lihat Semua Layanan <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="dots-bg py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <Badge className="mb-4" variant="outline">
              Tim Ahli
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Temui <span className="text-[#329ff2]">Spesialis</span> Kami -
              Profil doktor
            </h2>
            <p className="mt-3 sm:mt-4 max-w-[700px] text-sm sm:text-base text-muted-foreground">
              Tim doktor yangg pengalamm dan siap sedia menrima pasien
              Indonesia.
            </p>
          </div>
          <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f6fad]/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative aspect-[3/4]">
                <Image
                  src="/placeholder.svg?height=600&width=450&text=Dr.+Sarah"
                  alt="Dr. Sarah Johnson"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white opacity-0 transition-all duration-300 group-hover:bottom-4 group-hover:opacity-100">
                <h3 className="text-lg sm:text-xl font-bold">
                  Dr. Sarah Johnson
                </h3>
                <p className="text-sm text-[#a9dbff]">Kardiologi</p>
                <div className="mt-2 sm:mt-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-xs sm:text-sm"
                    asChild
                  >
                    <Link href="/doctors/sarah-johnson">Lihat Profil</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#329ff2] hover:bg-[#1e8ddd] text-xs sm:text-sm"
                    asChild
                  >
                    <Link href="/appointment">Booking</Link>
                  </Button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white p-3 sm:p-4 transition-all duration-300 group-hover:translate-y-full">
                <h3 className="text-base sm:text-lg font-bold">
                  Dr. Sarah Johnson
                </h3>
                <p className="text-xs sm:text-sm text-[#329ff2]">Kardiologi</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f6fad]/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative aspect-[3/4]">
                <Image
                  src="/placeholder.svg?height=600&width=450&text=Dr.+Michael"
                  alt="Dr. Michael Chen"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white opacity-0 transition-all duration-300 group-hover:bottom-4 group-hover:opacity-100">
                <h3 className="text-lg sm:text-xl font-bold">
                  Dr. Michael Chen
                </h3>
                <p className="text-sm text-[#a9dbff]">Neurologi</p>
                <div className="mt-2 sm:mt-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-xs sm:text-sm"
                    asChild
                  >
                    <Link href="/doctors/michael-chen">Lihat Profil</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#329ff2] hover:bg-[#1e8ddd] text-xs sm:text-sm"
                    asChild
                  >
                    <Link href="/appointment">Booking</Link>
                  </Button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white p-3 sm:p-4 transition-all duration-300 group-hover:translate-y-full">
                <h3 className="text-base sm:text-lg font-bold">
                  Dr. Michael Chen
                </h3>
                <p className="text-xs sm:text-sm text-[#329ff2]">Neurologi</p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f6fad]/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative aspect-[3/4]">
                <Image
                  src="/placeholder.svg?height=600&width=450&text=Dr.+Emily"
                  alt="Dr. Emily Rodriguez"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white opacity-0 transition-all duration-300 group-hover:bottom-4 group-hover:opacity-100">
                <h3 className="text-lg sm:text-xl font-bold">
                  Dr. Emily Rodriguez
                </h3>
                <p className="text-sm text-[#a9dbff]">Pediatri</p>
                <div className="mt-2 sm:mt-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-xs sm:text-sm"
                    asChild
                  >
                    <Link href="/doctors/emily-rodriguez">Lihat Profil</Link>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#329ff2] hover:bg-[#1e8ddd] text-xs sm:text-sm"
                    asChild
                  >
                    <Link href="/appointment">Booking</Link>
                  </Button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white p-3 sm:p-4 transition-all duration-300 group-hover:translate-y-full">
                <h3 className="text-base sm:text-lg font-bold">
                  Dr. Emily Rodriguez
                </h3>
                <p className="text-xs sm:text-sm text-[#329ff2]">Pediatri</p>
              </div>
            </div>
          </div>
          <div className="mt-8 sm:mt-12 text-center">
            <Button
              asChild
              className="bg-[#329ff2] hover:bg-[#1e8ddd] w-full sm:w-auto"
            >
              <Link href="/doctors">
                Lihat Semua Dokter <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-white to-[#f0f9ff] py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <Badge className="mb-4" variant="outline">
              Testimoni
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Komentar dari <span className="text-[#329ff2]">Pasien</span>
            </h2>
            <p className="mt-3 sm:mt-4 max-w-[700px] text-sm sm:text-base text-muted-foreground">
              Bisa pelajari pengalaman oleh pasien pasien kami.
            </p>
          </div>
          <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="relative overflow-hidden border-none bg-white shadow-lg">
              <div className="absolute -right-6 -top-6 h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-[#e5f5ff]/50"></div>
              <div className="absolute -left-8 -top-8 h-14 w-14 sm:h-20 sm:w-20 rounded-full bg-[#e5f5ff]/30"></div>
              <CardHeader className="relative p-4 sm:p-6">
                <div className="mb-2 text-3xl sm:text-4xl font-bold text-[#c9eaff]">
                  &quot;
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-14 sm:w-14 overflow-hidden rounded-full bg-[#e5f5ff] ring-2 sm:ring-4 ring-[#f0f9ff]">
                    <div className="flex h-full w-full items-center justify-center bg-[#329ff2] text-base sm:text-xl font-bold text-white">
                      JD
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg">
                      John Doe
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Pasien Kardiologi
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="flex pb-2 sm:pb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  &quot;Perawatan yang saya terima di Rumah Sakit MediCare
                  sangat luar biasa. Dr. Johnson dan timnya penuh perhatian,
                  profesional, dan penuh kasih sayang. Saya sangat
                  merekomendasikan layanan mereka.&quot;
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden border-none bg-white shadow-lg">
              <div className="absolute -right-6 -top-6 h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-[#e5f5ff]/50"></div>
              <div className="absolute -left-8 -top-8 h-14 w-14 sm:h-20 sm:w-20 rounded-full bg-[#e5f5ff]/30"></div>
              <CardHeader className="relative p-4 sm:p-6">
                <div className="mb-2 text-3xl sm:text-4xl font-bold text-[#c9eaff]">
                  &quot;
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-14 sm:w-14 overflow-hidden rounded-full bg-[#e5f5ff] ring-2 sm:ring-4 ring-[#f0f9ff]">
                    <div className="flex h-full w-full items-center justify-center bg-[#329ff2] text-base sm:text-xl font-bold text-white">
                      JS
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg">
                      Jane Smith
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Pasien Neurologi
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="flex pb-2 sm:pb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  &quot;Keahlian Dr. Chen dan teknologi canggih rumah sakit
                  membuat perbedaan signifikan dalam pengobatan saya. Staf
                  sangat mendukung sepanjang perjalanan pemulihan saya.&quot;
                </p>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden border-none bg-white shadow-lg">
              <div className="absolute -right-6 -top-6 h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-[#e5f5ff]/50"></div>
              <div className="absolute -left-8 -top-8 h-14 w-14 sm:h-20 sm:w-20 rounded-full bg-[#e5f5ff]/30"></div>
              <CardHeader className="relative p-4 sm:p-6">
                <div className="mb-2 text-3xl sm:text-4xl font-bold text-[#c9eaff]">
                  &quot;
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-10 w-10 sm:h-14 sm:w-14 overflow-hidden rounded-full bg-[#e5f5ff] ring-2 sm:ring-4 ring-[#f0f9ff]">
                    <div className="flex h-full w-full items-center justify-center bg-[#329ff2] text-base sm:text-xl font-bold text-white">
                      RB
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-base sm:text-lg">
                      Robert Brown
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Pasien Pediatri
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative p-4 sm:p-6 pt-0 sm:pt-0">
                <div className="flex pb-2 sm:pb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                  &quot;Sebagai orang tua, saya menghargai perhatian dan
                  perawatan yang diberikan Dr. Rodriguez kepada anak saya.
                  Departemen pediatri sangat ramah anak dan stafnya sangat sabar
                  dan baik.&quot;
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <Badge className="mb-4" variant="outline">
              Lokasi Kami
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Kunjungi <span className="text-[#329ff2]">Pusat Medis</span> Kami
            </h2>
            <p className="mt-3 sm:mt-4 max-w-[700px] text-sm sm:text-base text-muted-foreground">
              Kami berlokasi strategis di Kota Medan. Jangan ragu untuk
              mengunjungi kami atau menghubungi kami untuk informasi lebih
              lanjut.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col h-full justify-center">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-[#e5f5ff]">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1f6fad] mb-4">
                  Hubungi Kami
                </h3>
                <div className="flex items-start gap-3 mb-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#e5f5ff]">
                    <MapIcon className="h-4 w-4 text-[#329ff2]" />
                  </div>
                  <div>
                    <p className="font-medium text-base">
                      Uniland Plaza, LT 2 (MEDISGO)
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Jl. M. T. Haryono, Gg. Buntu, Kec. Medan Tim.,
                      <br />
                      Kota Medan, Sumatera Utara 20212, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#e5f5ff]">
                    <Phone className="h-4 w-4 text-[#329ff2]" />
                  </div>
                  <div>
                    <p className="font-medium text-base">Nomor Kontak</p>
                    <div className="text-sm text-muted-foreground mt-1 space-y-1">
                      <p>+62 811-6380-895</p>
                      <p>+62 811-6302-188</p>
                      <p>+62 821-6005-7765</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#e5f5ff]">
                    <Mail className="h-4 w-4 text-[#329ff2]" />
                  </div>
                  <div>
                    <p className="font-medium text-base">Email</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      <a
                        href="mailto:ask@medisgo.com"
                        className="hover:text-[#329ff2]"
                      >
                        ask@medisgo.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  <div>
                    <p className="font-medium text-base mb-2">Ikuti Kami</p>
                    <div className="flex gap-3">
                      <Link
                        href="https://www.instagram.com/medisgo.official/"
                        target="_blank"
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-[#e5f5ff] hover:bg-[#329ff2] group"
                      >
                        <Instagram className="h-4 w-4 text-[#329ff2] group-hover:text-white" />
                      </Link>
                      <Link
                        href="https://www.facebook.com/medisgo.official/"
                        target="_blank"
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-[#e5f5ff] hover:bg-[#329ff2] group"
                      >
                        <Facebook className="h-4 w-4 text-[#329ff2] group-hover:text-white" />
                      </Link>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="bg-[#329ff2] hover:bg-[#1e8ddd] w-full sm:w-auto"
                  >
                    <Link
                      href="https://maps.google.com/?q=Uniland+Plaza,+Medan+Indonesia"
                      target="_blank"
                    >
                      Petunjuk Arah <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="h-[300px] sm:h-[400px] md:h-[450px] rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0822428727146!2d98.67566507575791!3d3.5796501505888383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x303131c939e7adc3%3A0xbf7f57a65eb28131!2sUniland%20Plaza!5e0!3m2!1sen!2sid!4v1714490705090!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
                title="Lokasi Medisgo"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Public Holiday Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <Badge className="mb-4" variant="outline">
              Pemberitahuan Penting
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Jadwal <span className="text-[#329ff2]">Libur</span> Nasional
            </h2>
            <p className="mt-3 sm:mt-4 max-w-[700px] text-sm sm:text-base text-muted-foreground mb-8">
              Mohon perhatikan hari libur Malaysia, biar bisa konsul di tanggal
              yg tepat. IGD (Darurat tetap bersedia 24/7)
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg mx-auto max-w-4xl">
            <div className="relative">
              <Image
                src="/ph_2025.jpg"
                alt="Jadwal Hari Libur"
                width={1200}
                height={600}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
