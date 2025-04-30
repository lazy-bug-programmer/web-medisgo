import Image from "next/image";
import Link from "next/link";
import { Calendar, HelpCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Asuransi apa saja yang Anda terima?",
    answer:
      "Kami menerima sebagian besar asuransi besar termasuk Medicare, Medicaid, Blue Cross Blue Shield, Aetna, Cigna, dan UnitedHealthcare. Silakan hubungi departemen penagihan kami untuk informasi spesifik tentang cakupan asuransi Anda.",
  },
  {
    question: "Bagaimana cara membuat janji temu?",
    answer:
      "Anda dapat membuat janji temu dengan menelepon nomor utama kami, menggunakan sistem pemesanan online kami, atau menghubungi departemen tertentu secara langsung. Untuk pasien baru, kami sarankan menelepon tim layanan pasien kami yang dapat memandu Anda melalui proses tersebut.",
  },
  {
    question: "Apa yang harus saya bawa saat kunjungan pertama saya?",
    answer:
      "Harap bawa kartu asuransi Anda, identitas dengan foto, daftar obat-obatan saat ini, informasi riwayat medis, dan hasil tes atau catatan medis yang relevan. Direkomendasikan untuk datang 15 menit lebih awal untuk menyelesaikan formulir pendaftaran bagi pasien baru.",
  },
  {
    question: "Apakah Anda menawarkan layanan telemedicine?",
    answer:
      "Ya, kami menawarkan layanan telemedicine untuk berbagai jenis janji temu. Kunjungan virtual tersedia untuk janji temu lanjutan, pengelolaan obat, dan konsultasi tertentu. Silakan tanyakan kepada penyedia Anda apakah janji temu Anda memenuhi syarat untuk telehealth.",
  },
  {
    question: "Bagaimana cara mengakses catatan medis saya?",
    answer:
      "Anda dapat mengakses catatan medis Anda melalui portal pasien aman kami. Anda dapat melihat hasil tes, ringkasan janji temu, dan berkomunikasi dengan tim perawatan kesehatan Anda. Untuk catatan medis lengkap, Anda dapat mengajukan permintaan melalui departemen Manajemen Informasi Kesehatan kami.",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1a7bba] via-[#329ff2] to-[#1d8bd4] py-16 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-[#329ff2] blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#329ff2] blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              className="mb-4 bg-white/10 text-white hover:bg-white/20"
              variant="secondary"
            >
              Layanan Kami
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Layanan Kesehatan Komprehensif
            </h1>
            <p className="mt-24 text-base text-[#e6f4fe] md:text-lg"></p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Services at your finger section */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-[#329ff2] sm:text-4xl">
            Layanan MEDISGO
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#329ff2] p-6 shadow-lg">
              <Calendar className="h-12 w-12 text-white" />
            </div>
            <h3 className="mb-2 font-semibold">Jadwal & Janji Temu Dokter</h3>
            <p className="text-sm text-muted-foreground">
              Cek jadwal dokter dan buat janji temu
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#329ff2] p-6 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-white"
              >
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">Tim Ready di Rumah Sakit</h3>
            <p className="text-sm text-muted-foreground">
              Staf pendukung siap di rumah sakit untuk membantu Anda
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#329ff2] p-6 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-white"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1h-2V7c0-1.1-.9-2-2-2H7C5.9 5 5 5.9 5 7v5H3c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">Layanan Jemput dari Bandara</h3>
            <p className="text-sm text-muted-foreground">
              Layanan penjemputan gratis dari bandara ke rumah sakit
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#329ff2] p-6 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-white"
              >
                <path d="M19 3v12h-5c-.023-3.681.184-7.406 5-12zm0 12v6h-1v-6h1zm-6 0v6h-2v-6h2zm-3 0v6h-1v-6h1zm-5-12v12h-5v-12h5zm0 0c-3.333 5.333-5 9-5 12v-12h5z" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">
              Pemesanan Hotel & Penerbangan
            </h3>
            <p className="text-sm text-muted-foreground">
              Bantuan untuk reservasi hotel dan penerbangan
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#329ff2] p-6 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-white"
              >
                <path d="M9 10h.01" />
                <path d="M15 10h.01" />
                <path d="M12 18H9c-1 0-1.8-.6-2-1.5L5 10h14l-2 6.5c-.2.9-1 1.5-2 1.5h-3Z" />
                <path d="M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">Status Klaim Asuransi</h3>
            <p className="text-sm text-muted-foreground">
              Periksa status klaim asuransi Anda
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#329ff2] p-6 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-white"
              >
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M5 12V5a2 2 0 0 1 2-2h7l5 5v4" />
                <path d="M11 21H7a2 2 0 0 1-2-2v-6" />
                <path d="M9 18h12" />
                <path d="m9 15 3 3-3 3" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">
              Pengumpulan & Pengiriman Dokumen dan Obat
            </h3>
            <p className="text-sm text-muted-foreground">
              Pengumpulan dan pengiriman dokumen dan obat-obatan
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#329ff2] p-6 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-white"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <circle cx="12" cy="16" r="1" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">
              Perpanjangan & Pengaturan Visa
            </h3>
            <p className="text-sm text-muted-foreground">
              Bantuan untuk perpanjangan visa dan pengaturan
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#329ff2] p-6 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-white"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                <path d="m15 9 5-5" />
                <path d="M19.5 4.5h-5v5" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">
              Pengaturan Penerbangan Evakuasi Medis
            </h3>
            <p className="text-sm text-muted-foreground">
              Pengaturan penerbangan evakuasi medis
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#329ff2] p-6 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-white"
              >
                <path d="M16 22h2c.5 0 1-.2 1.4-.6.4-.4.6-.9.6-1.4V7.5L14.5 2H6c-.5 0-1 .2-1.4.6C4.2 3 4 3.5 4 4v3" />
                <polyline points="14 2 14 8 20 8" />
                <circle cx="7" cy="17" r="5" />
                <path d="m11 17-4-2v4" />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold">Tim Follow-up Rumah Sakit</h3>
            <p className="text-sm text-muted-foreground">
              Dukungan tim follow-up selama pasien berada di rumah sakit
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid gap-8 md:gap-12 md:grid-cols-2">
          <div>
            <Badge className="mb-4" variant="outline">
              FAQ
            </Badge>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
              Pertanyaan yang Sering{" "}
              <span className="text-[#329ff2]">Diajukan</span>
            </h2>
            <p className="mt-3 md:mt-4 text-muted-foreground">
              Temukan jawaban untuk pertanyaan umum tentang layanan, janji temu,
              dan kebijakan kami.
            </p>
            <div className="mt-6 md:mt-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-sm sm:text-base font-medium hover:text-[#329ff2]">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row sm:items-center gap-4 rounded-lg border border-[#e6f4fe] bg-[#f5faff] p-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#e6f4fe]">
                <HelpCircle className="h-5 w-5 text-[#329ff2]" />
              </div>
              <div>
                <p className="font-medium text-[#329ff2]">
                  Punya pertanyaan lain?
                </p>
                <p className="text-sm text-muted-foreground">
                  Hubungi tim layanan pasien kami untuk bantuan yang
                  dipersonalisasi.
                </p>
              </div>
              <Button
                className="mt-3 sm:mt-0 sm:ml-auto bg-[#329ff2] hover:bg-[#2b88d9]"
                asChild
              >
                <Link href="/contact">Hubungi Kami</Link>
              </Button>
            </div>
          </div>
          <div className="relative mt-8 md:mt-0 h-64 sm:h-80 md:h-full">
            <div className="hidden md:block absolute -left-4 -top-4 h-24 w-24 rounded-full bg-[#e6f4fe]"></div>
            <div className="hidden md:block absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-[#e6f4fe]"></div>
            <div className="relative h-full overflow-hidden rounded-xl md:rounded-2xl border-4 md:border-8 border-white shadow-md md:shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Tim+Kesehatan"
                alt="Tim Kesehatan"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#329ff2]/40 to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 max-w-xs rounded-lg md:rounded-xl bg-white/90 p-3 sm:p-4 md:p-6 backdrop-blur-sm">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#329ff2]">
                  Tim Ahli Perawatan
                </h3>
                <p className="mt-1 md:mt-2 text-xs sm:text-sm text-gray-600">
                  Tim multidisiplin kami yang terdiri dari profesional kesehatan
                  bekerja bersama untuk memberikan perawatan komprehensif yang
                  disesuaikan dengan kebutuhan Anda.
                </p>
                <Button
                  className="mt-2 md:mt-4 text-xs md:text-sm bg-[#329ff2] hover:bg-[#2b88d9]"
                  size="sm"
                  asChild
                >
                  <Link href="/doctors">Temui Dokter Kami</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
