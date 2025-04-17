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
              Our Story
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
              About <span className="text-[#329ff2]">Us</span>
            </h1>
            <p className="mt-3 sm:mt-4 max-w-[700px] text-sm sm:text-base text-muted-foreground">
              Learn more about our journey, our vision, and our mission to
              provide the best healthcare services.
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
                About Us
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-6">
                MEDISGO is a healthcare information and support service platform
                with over 10 years of experience helping Indonesian patients
                access the best medical services in Malaysia.
              </p>
              <p className="text-sm sm:text-base text-gray-700 mb-6">
                We are here to simplify the process of finding and booking
                appointments with specialist doctors at various renowned
                hospitals located in Penang, Kuala Lumpur, Johor, and Melaka.
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                With the support of our professional team and network of trusted
                medical partners, we are committed to providing friendly,
                efficient services tailored to your healthcare needs.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -left-4 -top-4 w-3/4 h-3/4 bg-[#e5f5ff] rounded-lg"></div>
                <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="/placeholder.svg?height=500&width=700&text=MEDISGO+Team"
                    alt="MEDISGO Team"
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
              Our Vision
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl mb-6">
              Our <span className="text-[#329ff2]">Vision</span>
            </h2>
            <div className="bg-[#f0f9ff] p-6 rounded-xl border border-[#e5f5ff] shadow-md">
              <p className="text-sm sm:text-base text-gray-700 italic">
                &quot;To become the number one healthcare companion platform
                trusted by Indonesians in gaining access to international
                quality medical services in Malaysia, through the utilization of
                technology and strategic partnerships.&quot;
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
                Our Goals
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">
                Our <span className="text-[#329ff2]">Mission</span>
              </h2>
              <p className="mt-3 max-w-[700px] mx-auto text-sm sm:text-base text-muted-foreground">
                How we plan to achieve our vision and serve our patients better
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
                    Provide accurate, reliable, and easy-to-understand health
                    information for patients.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e5f5ff]">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Facilitate the process of finding and booking appointments
                    with the best specialist doctors abroad.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e5f5ff]">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Provide friendly, professional, and personalized
                    consultation and support services.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e5f5ff]">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Build a solid cooperation network with hospitals and medical
                    professionals in Malaysia and the Southeast Asian region.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e5f5ff]">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Raise public awareness about the importance of proper and
                    prompt treatment through access to cross-country healthcare
                    services.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e5f5ff]">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Deliver digital platform-based medical services that are
                    easily accessible and efficient to support remote patient
                    care.
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="mt-1 flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e5f5ff]">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#329ff2]" />
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">
                    Encourage growth in the medical industry by leveraging the
                    latest technology and regional collaboration.
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
              What We Stand For
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl">
              Our <span className="text-[#329ff2]">Core Values</span>
            </h2>
            <p className="mt-3 max-w-[700px] mx-auto text-sm sm:text-base text-muted-foreground">
              The principles that guide our actions and decisions
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
              <h3 className="text-lg font-bold text-[#1f6fad] mb-2">Trust</h3>
              <p className="text-sm text-gray-700">
                Building trust through transparent communication and reliable
                services
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
                Excellence
              </h3>
              <p className="text-sm text-gray-700">
                Striving for excellence in every aspect of our service delivery
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
              <h3 className="text-lg font-bold text-[#1f6fad] mb-2">Empathy</h3>
              <p className="text-sm text-gray-700">
                Understanding and caring for our patients&apos; needs and
                concerns
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
                Integrity
              </h3>
              <p className="text-sm text-gray-700">
                Maintaining the highest ethical standards in all our operations
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
