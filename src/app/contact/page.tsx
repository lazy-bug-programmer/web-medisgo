import Link from "next/link";
import {
  Phone,
  MapIcon,
  Mail,
  Instagram,
  Facebook,
  ExternalLink,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute -left-20 -top-20 h-[300px] w-[300px] rounded-full bg-[#329ff2] blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[#1f6fad] blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <Badge className="mb-4" variant="outline">
              Hubungi Kami
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
              Kontak <span className="text-[#329ff2]">Kami</span>
            </h1>
            <p className="mt-3 sm:mt-4 max-w-[700px] text-sm sm:text-base text-muted-foreground">
              Kami siap membantu Anda dengan pertanyaan atau masalah apapun.
              Jangan ragu untuk menghubungi kami.
            </p>
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

      {/* Location Section */}
      <section className="py-12 sm:py-16 bg-[#f7fafc]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col h-full justify-center">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-[#e5f5ff]">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1f6fad] mb-4">
                  Alamat Kami
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

                <div className="mt-6">
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
                    className="bg-[#329ff2] hover:bg-[#1e8ddd] w-full sm:w-auto mt-4"
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

            <div className="h-[300px] sm:h-[400px] rounded-xl overflow-hidden shadow-lg">
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

      {/* Contact Form Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-8">
            <Badge className="mb-4" variant="outline">
              Hubungi Kami
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">
              Buat <span className="text-[#329ff2]">Janji Temu</span> atau Kirim{" "}
              <span className="text-[#329ff2]">Masukan</span>
            </h2>
            <p className="mt-3 max-w-[700px] text-sm sm:text-base text-muted-foreground">
              Isi formulir di bawah ini dan tim kami akan menghubungi Anda
              sesegera mungkin.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="border border-[#e5f5ff] shadow-md">
              <CardHeader className="bg-[#f0f9ff] border-b border-[#e5f5ff] rounded-t-lg">
                <CardTitle className="text-[#1f6fad]">
                  Formulir Kontak
                </CardTitle>
                <CardDescription>
                  Harap berikan informasi dan pesan Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nama
                      </label>
                      <Input
                        id="name"
                        placeholder="Masukkan nama lengkap Anda"
                        className="border-[#e5f5ff] focus-visible:ring-[#329ff2]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Nomor telepon
                      </label>
                      <Input
                        id="phone"
                        placeholder="Masukkan nomor telepon Anda"
                        className="border-[#e5f5ff] focus-visible:ring-[#329ff2]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Masukkan alamat email Anda"
                      className="border-[#e5f5ff] focus-visible:ring-[#329ff2]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subjek
                    </label>
                    <Input
                      id="subject"
                      placeholder="Masukkan subjek Anda"
                      className="border-[#e5f5ff] focus-visible:ring-[#329ff2]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Pesan
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tulis pesan Anda di sini"
                      className="min-h-[120px] border-[#e5f5ff] focus-visible:ring-[#329ff2]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#329ff2] hover:bg-[#1e8ddd] mt-4"
                  >
                    Kirim Pesan
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
