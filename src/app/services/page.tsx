import Image from "next/image";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

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
    question:
      "Rumah sakit apa saja yang bagus di Malaysia untuk pasien asal Indonesia?",
    answer:
      "Malaysia memiliki banyak rumah sakit dengan standar internasional yang menjadi pilihan utama bagi pasien asal Indonesia.\n\n**Di Penang**, beberapa rumah sakit unggulan yang sering direkomendasikan antara lain:\n- Island Hospital\n- Gleneagles Penang\n- Loh Guan Lye Specialist Centre\n- Northern Heart Specialist Hospital\n\nSelain Penang, tersedia juga opsi pengobatan di **Kuala Lumpur**, seperti:\n- Gleneagles Kuala Lumpur\n- Sunway Medical Centre\n- Prince Court Medical Centre\n- Thomson Hospital Kota Damansara (OncoCare)\n\nSemuanya dikenal memiliki fasilitas medis yang lengkap dan tenaga medis yang berpengalaman. Perlu dicatat, tim Medisgo saat ini hanya tersedia secara langsung di rumah sakit-rumah sakit di Penang untuk membantu dan mendukung pasien selama proses pengobatan.",
  },
  {
    question:
      "Bagaimana cara mendapatkan perawatan medis yang berkualitas di Penang?",
    answer:
      "Untuk mendapatkan perawatan medis yang berkualitas di Malaysia bisa berupa:\n\n- Memilih rumah sakit yang terakreditasi dan memiliki reputasi baik\n- Mencari dokter yang spesialis dan berpengalaman dalam bidang yang Anda butuhkan\n- Menggunakan layanan medis yang terpercaya dan memiliki standar kualitas tinggi\n- Konsultasikan dengan Medisgo untuk informasi lebih lanjut",
  },
  {
    question:
      "Bagaimana cara menggunakan layanan MedisGo untuk berobat di Malaysia?",
    answer:
      "Untuk menggunakan layanan MedisGo bisa langsung:\n\n1. Chat admin medisgo untuk proses pendaftaran\n2. Memilih dokter dan layanan yang dibutuhkan\n3. Melakukan konsultasi terlebih dahulu dengan admin medisgo\n4. Fotokan dan kirimkan passport pasien & tentukan tanggal appointment untuk kunjungan ke dokter\n5. Admin akan lanjut proses membuat group chat bersama dengan team medisgo malaysia untuk membantu pasien saat berada di rs\n6. Sesaat sampai di rs tinggal chat di group dan team akan ketemu & membantu proses pengobatan sampai selesai",
  },
  {
    question:
      "Apa saja keuntungan menggunakan layanan MedisGo untuk berobat di Penang?",
    answer:
      "Keuntungan menggunakan layanan MedisGo antara lain:\n\n- Akses ke dokter dan layanan medis yang berkualitas\n- Kemudahan dalam membuat janji temu dan konsultasi\n- Menghindari jadwal dokter yang cuti & full appointment\n- Membantu proses pengurusan visa selama berobat\n- Membantu proses klaim asuransi dari awal hingga selesai\n- Proses pengobatan di rs menjadi efektif & efisien sehingga menghemat waktu\n- Team selalu siap stanby berada di rumah sakit\n- Gratis penjemputan dari bandara & rekomendasi hotel\n- No antrian medisgo akan bantu aturkan",
  },
  {
    question:
      "Saya tertarik dengan Medisgo, bisa dijelaskan tentang service dan fee-nya?",
    answer:
      "MedisGo adalah platform layanan kesehatan digital yang menyediakan akses ke dokter dan layanan medis berkualitas.\n\nMedisGo bertujuan untuk menyediakan akses ke layanan kesehatan yang mudah dijangkau oleh masyarakat. Pasien yang menggunakan layanan MedisGo dapat memiliki harapan untuk mengakses layanan kesehatan yang profesional dan ramah sehingga mendapatkan hasil konsultasi dengan dokter dan tim medis yang berpengalaman dan tepat.\n\nDengan menggunakan layanan MedisGo, pasien dapat meningkatkan kualitas hidup dan kesehatan mereka, serta mendapatkan solusi yang efektif dan efisien untuk masalah kesehatan mereka.\n\n**Untuk service dan layanan medisgo semuanya FREE OF CHARGE dan tidak dikenakan biaya.**",
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
              <Image src="/services/01.png" height={60} width={60} alt="Icon" />
            </div>
            <h3 className="mb-2 font-semibold">Jadwal & Janji Temu Dokter</h3>
            <p className="text-sm text-muted-foreground">
              Cek jadwal dokter dan buat janji temu
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#329ff2] p-6 shadow-lg">
              <Image src="/services/02.png" height={60} width={60} alt="Icon" />
            </div>
            <h3 className="mb-2 font-semibold">Tim Ready di Rumah Sakit</h3>
            <p className="text-sm text-muted-foreground">
              Staf pendukung siap di rumah sakit untuk membantu Anda
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#329ff2] p-6 shadow-lg">
              <Image src="/services/03.png" height={60} width={60} alt="Icon" />
            </div>
            <h3 className="mb-2 font-semibold">Layanan Jemput dari Bandara</h3>
            <p className="text-sm text-muted-foreground">
              Layanan penjemputan gratis dari bandara ke rumah sakit
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#329ff2] p-5 shadow-lg">
              <Image
                src="/services/04.png"
                height={200}
                width={200}
                alt="Icon"
                className="bg-white rounded-full p-3"
              />
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
              <Image src="/services/05.png" height={60} width={60} alt="Icon" />
            </div>
            <h3 className="mb-2 font-semibold">Status Klaim Asuransi</h3>
            <p className="text-sm text-muted-foreground">
              Periksa status klaim asuransi Anda
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#329ff2] p-6 shadow-lg">
              <Image src="/services/06.png" height={60} width={60} alt="Icon" />
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
              <Image src="/services/07.png" height={60} width={60} alt="Icon" />
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
              <Image src="/services/08.png" height={60} width={60} alt="Icon" />
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
              <Image src="/services/09.png" height={60} width={60} alt="Icon" />
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
                      <div className="markdown-content">
                        <ReactMarkdown>{faq.answer}</ReactMarkdown>
                      </div>
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
