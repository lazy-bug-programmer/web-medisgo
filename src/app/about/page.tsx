import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export default function AboutPage() {
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
              Cerita Kami
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
              Tentang <span className="text-[#329ff2]">Kami</span>
            </h1>
            <p className="mt-3 sm:mt-4 max-w-[700px] text-sm sm:text-base text-muted-foreground">
              Pelajari lebih lanjut tentang perjalanan kami, visi kami, dan misi
              kami untuk menyediakan layanan kesehatan terbaik.
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

      {/* About Us Section */}
      <section className="py-12 sm:py-16 bg-[#f7fafc]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1f6fad] mb-4">
                Tentang Kami
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-6">
                Medisgo adalah platform informasi medis yang tepat, efisien, dan
                efektif untuk membantu pasien Indonesia mendapatkan layanan
                kesehatan terbaik di Penang, Malaysia. Dengan pengalaman yang
                lebih dari 10 tahun dan telah membantu lebih dari Ribuan Pasien
                selamanya, kami menjembatani Anda dengan rumah sakit dan dokter
                spesialis terpercaya.
              </p>
              <p className="text-sm sm:text-base text-gray-700 mb-6">
                Kami bekerja sama dengan rumah sakit ternama dan dokter
                spesialis berpengalaman di MALAYSIA, serta menyediakan layanan
                mulai dari konsultasi awal, pemesanan janji temu, hingga
                pengaturan kebutuhan selama proses pengobatan. Dengan tim yang
                profesional dan ramah, kami memastikan setiap pasien merasa
                aman, nyaman, dan terlayani dengan baik.
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                Medisgo hadir bukan hanya sebagai penghubung, tapi sebagai
                sahabat dalam perjalanan kesehatan Anda. Karena kami percaya,
                setiap orang berhak mendapatkan perawatan medis yang optimal
                dengan proses yang mudah dan transparan.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -left-4 -top-4 w-3/4 h-3/4 bg-[#e5f5ff] rounded-lg"></div>
                <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/placeholder.svg?height=500&width=700&text=Tim+MEDISGO"
                    alt="Tim MEDISGO"
                    width={700}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="outline">
              Visi Kami
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl mb-6">
              <span className="text-[#329ff2]">Visi</span> Kami
            </h2>
            <div className="bg-[#f0f9ff] p-6 rounded-xl border border-[#e5f5ff] shadow-md">
              <p className="text-sm sm:text-base text-gray-700 italic">
                &quot;Menjadi jembatan utama bagi masyarakat Indonesia untuk
                mendapatkan akses layanan kesehatan internasional yang
                terpercaya, tepat, dan efisien&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16 bg-[#f7fafc]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-4" variant="outline">
                Tujuan Kami
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">
                <span className="text-[#329ff2]">Misi</span> Kami
              </h2>
              <p className="mt-3 max-w-[700px] mx-auto text-sm sm:text-base text-muted-foreground">
                Bagaimana Medisgo Mewujudkan Visi Kami
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-[#e5f5ff]">
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e5f5ff]">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Memberikan informasi medis yang tepat, terpercaya, dan mudah
                    dipahami, agar setiap pasien dapat mengambil keputusan
                    pengobatan dengan yakin dan terinformasi.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e5f5ff]">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Mempermudah akses ke layanan medis internasional melalui
                    pencarian dan pemesanan janji temu dengan dokter spesialis
                    terbaik di rumah sakit terkemuka di Malaysia dan Asia
                    Tenggara.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e5f5ff]">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Menyediakan layanan konsultasi yang profesional, ramah, dan
                    personal, sehingga setiap pasien merasa didengar dan
                    diprioritaskan.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e5f5ff]">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Menjalin kemitraan strategis dengan rumah sakit dan tenaga
                    medis berstandar internasional, untuk memastikan kualitas
                    layanan yang tinggi dan berkelanjutan.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e5f5ff]">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Meningkatkan literasi kesehatan masyarakat tentang
                    pentingnya deteksi dini dan pengobatan tepat waktu melalui
                    edukasi dan kampanye kesehatan lintas negara.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e5f5ff]">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Mengembangkan platform digital yang efisien dan mudah
                    diakses, agar pasien dapat mengelola perjalanan medis mereka
                    dari mana saja secara praktis dan aman.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e5f5ff]">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Berinovasi dengan teknologi dan kolaborasi regional, guna
                    mendukung pertumbuhan ekosistem layanan medis lintas batas
                    yang modern dan terintegrasi.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge className="mb-4" variant="outline">
              Nilai-Nilai Kami
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">
              Nilai <span className="text-[#329ff2]">Inti Kami</span>
            </h2>
            <p className="mt-3 max-w-[700px] mx-auto text-sm sm:text-base text-muted-foreground">
              Prinsip-prinsip yang memandu tindakan dan keputusan kami
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#f0f9ff] rounded-xl p-6 text-center shadow-md border border-[#e5f5ff] hover:border-[#329ff2] transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f5ff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-[#329ff2]"
                  >
                    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#1f6fad] mb-2">
                Kepercayaan
              </h3>
              <p className="text-sm text-gray-700">
                Membangun kepercayaan melalui komunikasi yang transparan dan
                layanan yang andal
              </p>
            </div>
            <div className="bg-[#f0f9ff] rounded-xl p-6 text-center shadow-md border border-[#e5f5ff] hover:border-[#329ff2] transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f5ff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-[#329ff2]"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#1f6fad] mb-2">
                Keunggulan
              </h3>
              <p className="text-sm text-gray-700">
                Berusaha untuk mencapai keunggulan dalam setiap aspek pemberian
                layanan kami
              </p>
            </div>
            <div className="bg-[#f0f9ff] rounded-xl p-6 text-center shadow-md border border-[#e5f5ff] hover:border-[#329ff2] transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f5ff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-[#329ff2]"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#1f6fad] mb-2">Empati</h3>
              <p className="text-sm text-gray-700">
                Memahami dan peduli terhadap kebutuhan dan kekhawatiran pasien
                kami
              </p>
            </div>
            <div className="bg-[#f0f9ff] rounded-xl p-6 text-center shadow-md border border-[#e5f5ff] hover:border-[#329ff2] transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f5ff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-[#329ff2]"
                  >
                    <path d="M12 22s8-4 8-10V6l-8-4-8 4v6c0 6 8 10 8 10"></path>
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#1f6fad] mb-2">
                Integritas
              </h3>
              <p className="text-sm text-gray-700">
                Menjaga standar etika tertinggi dalam semua operasi kami
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
