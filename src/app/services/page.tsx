import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  HeartPulse,
  Stethoscope,
  Brain,
  Bone,
  Eye,
  Baby,
  Microscope,
  Pill,
  Scissors,
  Activity,
  ChevronRight,
  CheckCircle,
  Calendar,
  Phone,
  HelpCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock data for services
const featuredServices = [
  {
    id: "cardiology",
    title: "Cardiology",
    description:
      "Comprehensive care for heart conditions with advanced diagnostic and treatment options.",
    icon: HeartPulse,
    image: "/placeholder.svg?height=400&width=600&text=Cardiology",
    features: [
      "Non-invasive cardiac testing",
      "Interventional cardiology",
      "Electrophysiology studies",
      "Cardiac rehabilitation",
      "Heart failure management",
    ],
    procedures: [
      "Echocardiography",
      "Cardiac catheterization",
      "Coronary angioplasty",
      "Pacemaker implantation",
      "Stress testing",
    ],
  },
  {
    id: "neurology",
    title: "Neurology",
    description:
      "Expert care for neurological disorders with state-of-the-art diagnostic and therapeutic services.",
    icon: Brain,
    image: "/placeholder.svg?height=400&width=600&text=Neurology",
    features: [
      "Comprehensive neurological evaluations",
      "Advanced neuroimaging",
      "Neurosurgical procedures",
      "Stroke management",
      "Epilepsy monitoring",
    ],
    procedures: [
      "Electroencephalography (EEG)",
      "Electromyography (EMG)",
      "Lumbar puncture",
      "Nerve conduction studies",
      "Botox therapy for neurological conditions",
    ],
  },
  {
    id: "pediatrics",
    title: "Pediatrics",
    description:
      "Specialized healthcare for children from birth through adolescence, focusing on their unique needs.",
    icon: Baby,
    image: "/placeholder.svg?height=400&width=600&text=Pediatrics",
    features: [
      "Well-child visits",
      "Immunizations",
      "Developmental assessments",
      "Pediatric emergency care",
      "Behavioral health services",
    ],
    procedures: [
      "Growth and development monitoring",
      "Vision and hearing screening",
      "Allergy testing",
      "Asthma management",
      "Pediatric nutrition counseling",
    ],
  },
];

const allServices = [
  {
    id: "orthopedics",
    title: "Orthopedics",
    description:
      "Treatment for musculoskeletal conditions affecting bones, joints, muscles, and connective tissues.",
    icon: Bone,
  },
  {
    id: "ophthalmology",
    title: "Ophthalmology",
    description:
      "Comprehensive eye care services including diagnosis and treatment of eye disorders and diseases.",
    icon: Eye,
  },
  {
    id: "obstetrics",
    title: "Obstetrics & Gynecology",
    description:
      "Specialized care for women's health, pregnancy, childbirth, and reproductive system disorders.",
    icon: Baby,
  },
  {
    id: "laboratory",
    title: "Laboratory Services",
    description:
      "Advanced diagnostic testing and analysis to support accurate diagnosis and treatment planning.",
    icon: Microscope,
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    description:
      "Full-service pharmacy providing medications, consultations, and medication management services.",
    icon: Pill,
  },
  {
    id: "surgery",
    title: "Surgery",
    description:
      "State-of-the-art surgical facilities and expert surgeons for a wide range of procedures.",
    icon: Scissors,
  },
  {
    id: "emergency",
    title: "Emergency Care",
    description:
      "24/7 emergency services with rapid response teams for critical and urgent medical conditions.",
    icon: Activity,
  },
  {
    id: "preventive",
    title: "Preventive Medicine",
    description:
      "Comprehensive health screenings and preventive care to maintain optimal health and prevent disease.",
    icon: Stethoscope,
  },
];

const faqs = [
  {
    question: "What insurance plans do you accept?",
    answer:
      "We accept most major insurance plans including Medicare, Medicaid, Blue Cross Blue Shield, Aetna, Cigna, and UnitedHealthcare. Please contact our billing department for specific information about your insurance coverage.",
  },
  {
    question: "How do I schedule an appointment?",
    answer:
      "You can schedule an appointment by calling our main appointment line, using our online appointment booking system, or contacting the specific department directly. For new patients, we recommend calling our patient services team who can guide you through the process.",
  },
  {
    question: "What should I bring to my first appointment?",
    answer:
      "Please bring your insurance card, photo ID, list of current medications, medical history information, and any relevant medical records or test results. Arriving 15 minutes early to complete registration paperwork is recommended for new patients.",
  },
  {
    question: "Do you offer telehealth services?",
    answer:
      "Yes, we offer telehealth services for many types of appointments. Virtual visits are available for follow-up appointments, medication management, and certain consultations. Please ask your provider if your appointment is eligible for telehealth.",
  },
  {
    question: "How can I access my medical records?",
    answer:
      "You can access your medical records through our secure patient portal. You can view test results, appointment summaries, and communicate with your healthcare team. For complete medical records, you can submit a request through our Health Information Management department.",
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
              Our Services
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Comprehensive Healthcare Services
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
            Services At Your Fingertips
          </h2>
          <p className="mt-4 max-w-[700px] text-muted-foreground">
            Quick access to our most requested services and information
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#329ff2] p-6 shadow-lg">
              <Calendar className="h-12 w-12 text-white" />
            </div>
            <h3 className="mb-2 font-semibold">
              Doctor Schedule & Appointments
            </h3>
            <p className="text-sm text-muted-foreground">
              Check doctor schedules and make appointments
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
            <h3 className="mb-2 font-semibold">Hospital Ready Team</h3>
            <p className="text-sm text-muted-foreground">
              Support staff ready at the hospital to assist you
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
            <h3 className="mb-2 font-semibold">Airport Transfer Service</h3>
            <p className="text-sm text-muted-foreground">
              Free pickup service from airport to hospital
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
            <h3 className="mb-2 font-semibold">Hotel & Flight Booking</h3>
            <p className="text-sm text-muted-foreground">
              Assistance with hotel and flight reservations
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
            <h3 className="mb-2 font-semibold">Insurance Claim Status</h3>
            <p className="text-sm text-muted-foreground">
              Check the status of your insurance claims
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
              Document & Medication Delivery
            </h3>
            <p className="text-sm text-muted-foreground">
              Collection and delivery of documents and medications
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
            <h3 className="mb-2 font-semibold">Visa Extension & Management</h3>
            <p className="text-sm text-muted-foreground">
              Assistance with visa extension and arrangements
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
            <h3 className="mb-2 font-semibold">Medical Evacuation Flights</h3>
            <p className="text-sm text-muted-foreground">
              Arrangement of medical evacuation flights
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
            <h3 className="mb-2 font-semibold">Hospital Follow-up Team</h3>
            <p className="text-sm text-muted-foreground">
              Team follow-up support during hospital stay
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col items-center text-center">
          <Badge className="mb-4" variant="outline">
            Specialized Care
          </Badge>
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
            Our <span className="text-[#329ff2]">Featured</span> Services
          </h2>
          <p className="mt-4 max-w-[700px] text-muted-foreground">
            Discover our specialized medical services designed to provide
            comprehensive care for a wide range of health conditions.
          </p>
        </div>

        <div className="mt-10 md:mt-12 space-y-12 md:space-y-16">
          {featuredServices.map((service, index) => (
            <div
              key={service.id}
              className={`grid gap-6 md:gap-8 md:grid-cols-2 md:items-center ${
                index % 2 === 1 ? "md:grid-flow-dense" : ""
              }`}
            >
              <div
                className={`space-y-4 sm:space-y-6 ${
                  index % 2 === 1 ? "md:col-start-2" : ""
                }`}
              >
                <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl bg-[#e6f4fe]">
                  <service.icon className="h-7 w-7 md:h-8 md:w-8 text-[#329ff2]" />
                </div>
                <h3 className="text-xl font-bold text-[#329ff2] sm:text-2xl md:text-3xl">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
                <div className="space-y-3 md:space-y-4">
                  <h4 className="font-semibold text-[#329ff2]">
                    Key Features:
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm sm:text-base"
                      >
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-[#329ff2]" />{" "}
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <h4 className="font-semibold text-[#329ff2]">
                    Common Procedures:
                  </h4>
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {service.procedures.map((procedure, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm sm:text-base"
                      >
                        <CheckCircle className="h-4 w-4 flex-shrink-0 text-[#329ff2]" />{" "}
                        <span>{procedure}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3 md:gap-4 pt-3 md:pt-4">
                  <Button
                    className="text-sm md:text-base bg-[#329ff2] hover:bg-[#2b88d9]"
                    asChild
                  >
                    <Link href={`/services/${service.id}`}>
                      Learn More{" "}
                      <ChevronRight className="ml-1 md:ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="text-sm md:text-base border-[#d1e9fc] hover:bg-[#e6f4fe] hover:text-[#329ff2]"
                    asChild
                  >
                    <Link href="/appointment">
                      Book Appointment{" "}
                      <Calendar className="ml-1 md:ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div
                className={`relative overflow-hidden rounded-xl md:rounded-2xl border-4 md:border-8 border-white shadow-md md:shadow-xl ${
                  index % 2 === 1 ? "md:col-start-1" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#329ff2]/20 to-transparent"></div>
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="h-64 sm:h-72 md:h-96 w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* All Services Section */}
      <section className="wavy-bg py-12 px-4 md:py-24">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center">
            <Badge className="mb-4" variant="outline">
              Complete Care
            </Badge>
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
              All <span className="text-[#329ff2]">Medical</span> Services
            </h2>
            <p className="mt-4 max-w-[700px] text-muted-foreground">
              Explore our full range of medical services designed to address all
              your healthcare needs under one roof.
            </p>
          </div>

          <Tabs defaultValue="all" className="mt-10 md:mt-12">
            <TabsList className="mx-auto w-fit flex flex-wrap justify-center">
              <TabsTrigger value="all">All Services</TabsTrigger>
              <TabsTrigger value="diagnostic">Diagnostic</TabsTrigger>
              <TabsTrigger value="therapeutic">Therapeutic</TabsTrigger>
              <TabsTrigger value="preventive">Preventive</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-6 md:mt-8">
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allServices.map((service) => (
                  <Card
                    key={service.id}
                    className="group overflow-hidden border-[#e6f4fe] transition-all duration-300 hover:border-[#329ff2] hover:shadow-lg"
                  >
                    <CardHeader className="flex flex-row items-center gap-4 px-4 py-4 md:px-6">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#e6f4fe] transition-all duration-300 group-hover:bg-[#329ff2] group-hover:text-white">
                        <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#329ff2] transition-colors duration-300 group-hover:text-white" />
                      </div>
                      <CardTitle className="text-base sm:text-lg">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 pb-2 md:px-6">
                      <p className="text-sm sm:text-base text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                    <CardFooter className="px-4 py-3 md:px-6">
                      <Link
                        href={`/services/${service.id}`}
                        className="flex items-center text-xs sm:text-sm text-[#329ff2] hover:underline"
                      >
                        Learn More{" "}
                        <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="diagnostic" className="mt-6 md:mt-8">
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allServices
                  .filter((s) =>
                    [
                      "laboratory",
                      "ophthalmology",
                      "cardiology",
                      "neurology",
                    ].includes(s.id)
                  )
                  .map((service) => (
                    <Card
                      key={service.id}
                      className="group overflow-hidden border-[#e6f4fe] transition-all duration-300 hover:border-[#329ff2] hover:shadow-lg"
                    >
                      <CardHeader className="flex flex-row items-center gap-4 px-4 py-4 md:px-6">
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#e6f4fe] transition-all duration-300 group-hover:bg-[#329ff2] group-hover:text-white">
                          <service.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#329ff2] transition-colors duration-300 group-hover:text-white" />
                        </div>
                        <CardTitle className="text-base sm:text-lg">
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-4 pb-2 md:px-6">
                        <p className="text-sm sm:text-base text-muted-foreground">
                          {service.description}
                        </p>
                      </CardContent>
                      <CardFooter className="px-4 py-3 md:px-6">
                        <Link
                          href={`/services/${service.id}`}
                          className="flex items-center text-xs sm:text-sm text-[#329ff2] hover:underline"
                        >
                          Learn More{" "}
                          <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            {/* Therapeutic and Preventive TabsContent follows the same pattern - using the same responsive adjustments */}
            <TabsContent value="therapeutic" className="mt-6 md:mt-8">
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* ...existing code with the same responsive adjustments as above... */}
              </div>
            </TabsContent>
            <TabsContent value="preventive" className="mt-6 md:mt-8">
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {/* ...existing code with the same responsive adjustments as above... */}
              </div>
            </TabsContent>
          </Tabs>
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
              Frequently Asked <span className="text-[#329ff2]">Questions</span>
            </h2>
            <p className="mt-3 md:mt-4 text-muted-foreground">
              Find answers to common questions about our services, appointments,
              and policies.
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
                  Have more questions?
                </p>
                <p className="text-sm text-muted-foreground">
                  Contact our patient services team for personalized assistance.
                </p>
              </div>
              <Button
                className="mt-3 sm:mt-0 sm:ml-auto bg-[#329ff2] hover:bg-[#2b88d9]"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
          <div className="relative mt-8 md:mt-0 h-64 sm:h-80 md:h-full">
            <div className="hidden md:block absolute -left-4 -top-4 h-24 w-24 rounded-full bg-[#e6f4fe]"></div>
            <div className="hidden md:block absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-[#e6f4fe]"></div>
            <div className="relative h-full overflow-hidden rounded-xl md:rounded-2xl border-4 md:border-8 border-white shadow-md md:shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Healthcare+Team"
                alt="Healthcare Team"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#329ff2]/40 to-transparent"></div>
              <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 max-w-xs rounded-lg md:rounded-xl bg-white/90 p-3 sm:p-4 md:p-6 backdrop-blur-sm">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#329ff2]">
                  Expert Care Team
                </h3>
                <p className="mt-1 md:mt-2 text-xs sm:text-sm text-gray-600">
                  Our multidisciplinary team of healthcare professionals works
                  together to provide comprehensive care tailored to your needs.
                </p>
                <Button
                  className="mt-2 md:mt-4 text-xs md:text-sm bg-[#329ff2] hover:bg-[#2b88d9]"
                  size="sm"
                  asChild
                >
                  <Link href="/doctors">Meet Our Doctors</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-[#329ff2] py-12 px-4 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-white blur-3xl"></div>
          <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#e6f4fe] blur-3xl"></div>
        </div>
        <div className="container mx-auto relative z-10">
          <div className="mx-auto max-w-3xl rounded-2xl md:rounded-3xl bg-white/10 p-6 md:p-12 backdrop-blur-sm">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold tracking-tighter text-white sm:text-3xl md:text-4xl lg:text-5xl">
                Ready to Schedule an Appointment?
              </h2>
              <p className="mt-3 md:mt-4 max-w-[700px] text-sm md:text-base text-[#e6f4fe]">
                Our team of healthcare professionals is ready to provide you
                with the care you need. Schedule an appointment today.
              </p>
              <div className="mt-6 md:mt-8 w-full flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <Button
                  size="lg"
                  asChild
                  className="w-full sm:w-auto bg-white text-[#329ff2] hover:bg-white/90"
                >
                  <Link href="/appointment">
                    Book Appointment <Calendar className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto border-white text-white hover:bg-white/10"
                >
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2"
                  >
                    <Phone className="h-5 w-5" /> Call Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
