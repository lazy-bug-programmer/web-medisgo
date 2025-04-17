import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Mock data for doctors
const doctors = [
  {
    id: "sarah-johnson",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    image: "/placeholder.svg?height=400&width=400",
    education: "Harvard Medical School",
    experience: "15 years",
  },
  {
    id: "michael-chen",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    image: "/placeholder.svg?height=400&width=400",
    education: "Johns Hopkins University",
    experience: "12 years",
  },
  {
    id: "emily-rodriguez",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
    image: "/placeholder.svg?height=400&width=400",
    education: "Stanford University",
    experience: "10 years",
  },
  {
    id: "david-patel",
    name: "Dr. David Patel",
    specialty: "Orthopedics",
    image: "/placeholder.svg?height=400&width=400",
    education: "Yale University",
    experience: "18 years",
  },
  {
    id: "lisa-wong",
    name: "Dr. Lisa Wong",
    specialty: "Dermatology",
    image: "/placeholder.svg?height=400&width=400",
    education: "University of California",
    experience: "8 years",
  },
  {
    id: "james-wilson",
    name: "Dr. James Wilson",
    specialty: "Oncology",
    image: "/placeholder.svg?height=400&width=400",
    education: "Columbia University",
    experience: "20 years",
  },
  {
    id: "maria-garcia",
    name: "Dr. Maria Garcia",
    specialty: "Gynecology",
    image: "/placeholder.svg?height=400&width=400",
    education: "University of Pennsylvania",
    experience: "14 years",
  },
  {
    id: "robert-kim",
    name: "Dr. Robert Kim",
    specialty: "Urology",
    image: "/placeholder.svg?height=400&width=400",
    education: "Duke University",
    experience: "16 years",
  },
  {
    id: "jennifer-taylor",
    name: "Dr. Jennifer Taylor",
    specialty: "Psychiatry",
    image: "/placeholder.svg?height=400&width=400",
    education: "University of Michigan",
    experience: "11 years",
  },
];

// Specialties for filtering
const specialties = [
  "All",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Oncology",
  "Gynecology",
  "Urology",
  "Psychiatry",
];

export default function DoctorsPage() {
  return (
    <div>
      <div className="bg-gradient-to-r from-[#1f6fad] to-[#2a80c5] py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center text-white">
            <Badge
              className="mb-3 sm:mb-4 bg-white/10 text-white hover:bg-white/20"
              variant="secondary"
            >
              Our Team
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">
              Meet Our Doctors
            </h1>
            <p className="mt-3 sm:mt-4 max-w-[700px] text-sm sm:text-base text-[#a9dbff]">
              Our team of experienced and dedicated doctors is committed to
              providing the highest quality care to our patients.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search doctors..."
              className="w-full pl-8"
            />
          </div>

          {/* Responsive tabs with scrollable overflow on small screens */}
          <div className="w-full md:w-auto overflow-x-auto pb-2">
            <Tabs defaultValue="All" className="w-full md:w-auto">
              <TabsList className="w-max min-w-full md:w-auto md:min-w-0 grid grid-flow-col auto-cols-auto md:grid-cols-5 gap-px">
                {specialties.slice(0, 5).map((specialty) => (
                  <TabsTrigger
                    key={specialty}
                    value={specialty}
                    className="text-xs whitespace-nowrap px-3 md:px-4 md:text-sm"
                  >
                    {specialty}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="group overflow-hidden border-[#e5f5ff] transition-all duration-300 hover:border-[#7fcbff] hover:shadow-lg"
            >
              <div className="aspect-square relative">
                <Image
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f6fad]/80 via-[#1f6fad]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl text-[#1f6fad]">
                  {doctor.name}
                </CardTitle>
                <CardDescription className="text-sm text-[#329ff2]">
                  {doctor.specialty}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div>
                    <p className="font-medium">Education</p>
                    <p className="text-muted-foreground">{doctor.education}</p>
                  </div>
                  <div>
                    <p className="font-medium">Experience</p>
                    <p className="text-muted-foreground">{doctor.experience}</p>
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
                  <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-[#329ff2] hover:bg-[#1e8ddd] w-full sm:w-auto text-xs sm:text-sm"
                  asChild
                >
                  <Link href="/appointment">Book Appointment</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 flex items-center justify-center">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9"
              disabled
            >
              <span className="sr-only">Previous page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 bg-[#f0f9ff] text-[#329ff2] text-xs sm:text-sm"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 text-xs sm:text-sm"
            >
              2
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 text-xs sm:text-sm"
            >
              3
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9"
            >
              <span className="sr-only">Next page</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Hospital Partners Section */}
      <div className="bg-[#f0f9ff] py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <Badge className="mb-3 sm:mb-4" variant="outline">
              Working Together
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl mb-3 sm:mb-4">
              Our Hospital <span className="text-[#329ff2]">Partners</span>
            </h2>
            <p className="max-w-[700px] text-sm sm:text-base text-muted-foreground mb-8 sm:mb-10">
              We collaborate with leading healthcare institutions in Malaysia to
              ensure you receive the best medical care available.
            </p>
          </div>

          {/* Single featured hospital partners image */}
          <div className="max-w-4xl mx-auto">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <div className="w-full">
                <Image
                  src="/latest_partners.jpg"
                  alt="Hospital Partners"
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
