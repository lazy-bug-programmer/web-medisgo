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
    specialty: "Cardiology",
    image: "/placeholder.svg?height=600&width=600",
    education: [
      { degree: "MD", institution: "Harvard Medical School", year: "2005" },
      {
        degree: "Residency",
        institution: "Massachusetts General Hospital",
        year: "2009",
      },
      { degree: "Fellowship", institution: "Cleveland Clinic", year: "2011" },
    ],
    experience: [
      {
        position: "Senior Cardiologist",
        institution: "Mayo Clinic",
        period: "2011-2018",
      },
      {
        position: "Chief of Cardiology",
        institution: "MediCare Hospital",
        period: "2018-Present",
      },
    ],
    certifications: [
      "American Board of Internal Medicine",
      "American College of Cardiology",
      "Advanced Cardiac Life Support",
    ],
    publications: [
      {
        title: "Advances in Cardiac Imaging Techniques",
        journal: "Journal of Cardiology",
        year: "2015",
      },
      {
        title: "Long-term Outcomes of Stent Placement",
        journal: "New England Journal of Medicine",
        year: "2017",
      },
      {
        title: "Preventive Cardiology: A Comprehensive Review",
        journal: "Circulation",
        year: "2019",
      },
    ],
    awards: [
      {
        title: "Excellence in Clinical Care",
        organization: "American Heart Association",
        year: "2016",
      },
      {
        title: "Outstanding Researcher Award",
        organization: "Cardiovascular Research Foundation",
        year: "2018",
      },
    ],
    languages: ["English", "Spanish"],
    bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in diagnosing and treating heart conditions. She specializes in interventional cardiology, cardiac imaging, and preventive cardiology. Dr. Johnson is passionate about patient education and empowering individuals to take control of their heart health through lifestyle modifications and appropriate medical interventions.",
    contact: {
      email: "sarah.johnson@medicare-hospital.com",
      phone: "+1 (555) 123-4567",
      office: "Cardiology Department, 3rd Floor, MediCare Hospital",
    },
    schedule: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Friday", hours: "9:00 AM - 1:00 PM" },
    ],
  },
  {
    id: "michael-chen",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    image: "/placeholder.svg?height=600&width=600",
    education: [
      { degree: "MD", institution: "Johns Hopkins University", year: "2008" },
      { degree: "Residency", institution: "UCSF Medical Center", year: "2012" },
      { degree: "Fellowship", institution: "Mayo Clinic", year: "2014" },
    ],
    experience: [
      {
        position: "Neurologist",
        institution: "Cleveland Clinic",
        period: "2014-2019",
      },
      {
        position: "Senior Neurologist",
        institution: "MediCare Hospital",
        period: "2019-Present",
      },
    ],
    certifications: [
      "American Board of Psychiatry and Neurology",
      "American Academy of Neurology",
    ],
    publications: [
      {
        title: "Neuroplasticity in Stroke Recovery",
        journal: "Neurology",
        year: "2016",
      },
      {
        title: "Advances in Multiple Sclerosis Treatment",
        journal: "Journal of Neuroscience",
        year: "2018",
      },
      {
        title: "Biomarkers for Alzheimer's Disease",
        journal: "Nature Neuroscience",
        year: "2020",
      },
    ],
    awards: [
      {
        title: "Young Investigator Award",
        organization: "American Academy of Neurology",
        year: "2017",
      },
      {
        title: "Excellence in Patient Care",
        organization: "National Neurology Association",
        year: "2019",
      },
    ],
    languages: ["English", "Mandarin"],
    bio: "Dr. Michael Chen is a board-certified neurologist specializing in the diagnosis and treatment of neurological disorders. His areas of expertise include stroke management, multiple sclerosis, and neurodegenerative diseases. Dr. Chen is committed to providing compassionate care and utilizing the latest advancements in neurology to improve patient outcomes.",
    contact: {
      email: "michael.chen@medicare-hospital.com",
      phone: "+1 (555) 234-5678",
      office: "Neurology Department, 4th Floor, MediCare Hospital",
    },
    schedule: [
      { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 1:00 PM" },
    ],
  },
  {
    id: "emily-rodriguez",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    image: "/placeholder.svg?height=600&width=600",
    education: [
      { degree: "MD", institution: "Stanford University", year: "2010" },
      {
        degree: "Residency",
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
        position: "Pediatrician",
        institution: "Children's National Hospital",
        period: "2015-2020",
      },
      {
        position: "Senior Pediatrician",
        institution: "MediCare Hospital",
        period: "2020-Present",
      },
    ],
    certifications: [
      "American Board of Pediatrics",
      "Pediatric Advanced Life Support",
    ],
    publications: [
      {
        title: "Childhood Obesity Prevention Strategies",
        journal: "Pediatrics",
        year: "2017",
      },
      {
        title: "Vaccine Hesitancy Among Parents",
        journal: "Journal of Pediatric Health",
        year: "2019",
      },
      {
        title: "Early Intervention in Developmental Delays",
        journal: "Child Development",
        year: "2021",
      },
    ],
    awards: [
      {
        title: "Compassionate Doctor Award",
        organization: "Patient's Choice",
        year: "2018",
      },
      {
        title: "Top Pediatrician",
        organization: "City Health Magazine",
        year: "2020",
      },
    ],
    languages: ["English", "Spanish"],
    bio: "Dr. Emily Rodriguez is a board-certified pediatrician dedicated to providing comprehensive healthcare for children from birth through adolescence. She has a special interest in preventive care, childhood development, and adolescent medicine. Dr. Rodriguez believes in building strong relationships with her patients and their families to promote healthy lifestyles and address health concerns promptly.",
    contact: {
      email: "emily.rodriguez@medicare-hospital.com",
      phone: "+1 (555) 345-6789",
      office: "Pediatrics Department, 2nd Floor, MediCare Hospital",
    },
    schedule: [
      { day: "Monday", hours: "9:00 AM - 5:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
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
        <h1 className="text-2xl sm:text-3xl font-bold">Doctor Not Found</h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground">
          The doctor you are looking for does not exist.
        </p>
        <Button asChild className="mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700">
          <Link href="/doctors">Back to Doctors</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-blue-100">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              <Link href="/doctors" className="hover:text-white">
                Doctors
              </Link>
              <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="truncate">{doctor.name}</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              {doctor.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-blue-200">
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
              <div className="overflow-hidden rounded-lg border-2 sm:border-4 border-blue-100 shadow-lg">
                <Image
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  width={600}
                  height={600}
                  className="w-full object-cover"
                />
              </div>

              {/* Mobile-friendly contact card */}
              <Card className="border-blue-100">
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <CardTitle className="text-lg sm:text-xl text-blue-800">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2 space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    </div>
                    <span className="break-all">{doctor.contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    </div>
                    <span>{doctor.contact.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                    <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    </div>
                    <span>{doctor.contact.office}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Responsive schedule card */}
              <Card className="border-blue-100">
                <CardHeader className="p-4 sm:p-6 pb-2">
                  <CardTitle className="text-lg sm:text-xl text-blue-800">
                    Schedule
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Available appointment times
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-2 space-y-3 sm:space-y-4">
                  {doctor.schedule.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between border-b border-blue-50 pb-2 last:border-0 text-sm"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                        </div>
                        <span>{schedule.day}</span>
                      </div>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                        <span className="text-xs sm:text-sm font-medium text-blue-800">
                          {schedule.hours}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Full-width button on all screens */}
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-6">
                Book Appointment
              </Button>
            </div>
          </div>

          {/* Main content section - stacks on mobile */}
          <div className="lg:col-span-2 order-2 lg:order-2">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs sm:text-sm">
                  About
                </Badge>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {doctor.bio}
                </p>
              </div>

              {/* Responsive tabs that scroll horizontally on mobile */}
              <div className="overflow-x-auto pb-2">
                <Tabs defaultValue="education" className="border-blue-100">
                  <TabsList className="w-max min-w-full sm:w-full sm:min-w-0 grid grid-flow-col auto-cols-auto sm:grid-cols-4 bg-blue-50">
                    <TabsTrigger
                      value="education"
                      className="text-xs sm:text-sm px-2 sm:px-4"
                    >
                      Education
                    </TabsTrigger>
                    <TabsTrigger
                      value="experience"
                      className="text-xs sm:text-sm px-2 sm:px-4"
                    >
                      Experience
                    </TabsTrigger>
                    <TabsTrigger
                      value="certifications"
                      className="text-xs sm:text-sm px-2 sm:px-4"
                    >
                      Certifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="publications"
                      className="text-xs sm:text-sm px-2 sm:px-4"
                    >
                      Publications
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent
                    value="education"
                    className="space-y-3 sm:space-y-4 pt-4"
                  >
                    <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold text-blue-800">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />{" "}
                      Education & Training
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {doctor.education.map((edu, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-blue-100 bg-white p-3 sm:p-4 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md"
                        >
                          <div className="flex flex-wrap gap-2 sm:items-center sm:justify-between">
                            <h4 className="text-sm sm:text-base font-semibold text-blue-800">
                              {edu.degree}
                            </h4>
                            <span className="rounded-full bg-blue-50 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-blue-700">
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
                    <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold text-blue-800">
                      <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />{" "}
                      Professional Experience
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {doctor.experience.map((exp, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-blue-100 bg-white p-3 sm:p-4 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md"
                        >
                          <div className="flex flex-wrap gap-2 sm:items-center sm:justify-between">
                            <h4 className="text-sm sm:text-base font-semibold text-blue-800">
                              {exp.position}
                            </h4>
                            <span className="rounded-full bg-blue-50 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-blue-700">
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
                    <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold text-blue-800">
                      <Award className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />{" "}
                      Certifications & Licenses
                    </h3>
                    <ul className="list-inside list-disc space-y-1 sm:space-y-2 text-xs sm:text-sm">
                      {doctor.certifications.map((cert, index) => (
                        <li key={index} className="text-muted-foreground">
                          {cert}
                        </li>
                      ))}
                    </ul>
                    <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold mt-4 sm:mt-6 text-blue-800">
                      <Star className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />{" "}
                      Awards & Recognitions
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {doctor.awards.map((award, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-blue-100 bg-white p-3 sm:p-4 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md"
                        >
                          <div className="flex flex-wrap gap-2 sm:items-center sm:justify-between">
                            <h4 className="text-sm sm:text-base font-semibold text-blue-800">
                              {award.title}
                            </h4>
                            <span className="rounded-full bg-blue-50 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-blue-700">
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
                    <h3 className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold text-blue-800">
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />{" "}
                      Research & Publications
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      {doctor.publications.map((pub, index) => (
                        <div
                          key={index}
                          className="rounded-lg border border-blue-100 bg-white p-3 sm:p-4 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md"
                        >
                          <div className="flex flex-wrap gap-2 sm:items-center sm:justify-between">
                            <h4 className="text-sm sm:text-base font-semibold text-blue-800">
                              {pub.title}
                            </h4>
                            <span className="rounded-full bg-blue-50 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-blue-700">
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
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-800">
                  Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((language, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-blue-700"
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
