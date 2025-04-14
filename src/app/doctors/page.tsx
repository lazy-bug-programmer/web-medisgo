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
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-12">
        <div className="container mx-auto">
          <div className="flex flex-col items-center text-center text-white">
            <Badge
              className="mb-4 bg-white/10 text-white hover:bg-white/20"
              variant="secondary"
            >
              Our Team
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Meet Our Doctors
            </h1>
            <p className="mt-4 max-w-[700px] text-blue-100">
              Our team of experienced and dedicated doctors is committed to
              providing the highest quality care to our patients.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search doctors..."
              className="w-full pl-8"
            />
          </div>
          <Tabs defaultValue="All" className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-2 md:w-auto md:grid-cols-5">
              {specialties.slice(0, 5).map((specialty) => (
                <TabsTrigger
                  key={specialty}
                  value={specialty}
                  className="text-xs md:text-sm"
                >
                  {specialty}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="group overflow-hidden border-blue-100 transition-all duration-300 hover:border-blue-300 hover:shadow-lg"
            >
              <div className="aspect-square relative">
                <Image
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </div>
              <CardHeader>
                <CardTitle className="text-blue-800">{doctor.name}</CardTitle>
                <CardDescription className="text-blue-600">
                  {doctor.specialty}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
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
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  asChild
                >
                  <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                  asChild
                >
                  <Link href="/appointment">Book Appointment</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" disabled>
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
              className="h-8 w-8 bg-blue-50 text-blue-600"
            >
              1
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              2
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8">
              3
            </Button>
            <Button variant="outline" size="icon">
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
    </div>
  );
}
