import Link from "next/link";
import { Users, UserCheck, Calendar, Plus, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for dashboard
const stats = [
  {
    title: "Total Patients",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Active Doctors",
    value: "35",
    change: "+2",
    trend: "up",
    icon: UserCheck,
  },
  {
    title: "Today's Appointments",
    value: "127",
    change: "-5%",
    trend: "down",
    icon: Calendar,
  },
];

const recentAppointments = [
  {
    id: "1",
    patient: "John Doe",
    doctor: "Dr. Sarah Johnson",
    time: "09:00 AM",
    status: "confirmed",
    type: "Cardiology",
  },
  {
    id: "2",
    patient: "Jane Smith",
    doctor: "Dr. Michael Chen",
    time: "10:30 AM",
    status: "pending",
    type: "Neurology",
  },
  {
    id: "3",
    patient: "Robert Brown",
    doctor: "Dr. Emily Rodriguez",
    time: "02:00 PM",
    status: "completed",
    type: "Pediatrics",
  },
  {
    id: "4",
    patient: "Maria Garcia",
    doctor: "Dr. David Patel",
    time: "03:30 PM",
    status: "cancelled",
    type: "Orthopedics",
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used admin functions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                asChild
                className="w-full justify-start"
                variant="outline"
              >
                <Link href="/admin/patients/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Patient
                </Link>
              </Button>
              <Button
                asChild
                className="w-full justify-start"
                variant="outline"
              >
                <Link href="/admin/doctors/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Doctor
                </Link>
              </Button>
              <Button
                asChild
                className="w-full justify-start"
                variant="outline"
              >
                <Link href="/admin/appointments/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Appointment
                </Link>
              </Button>
              <Button
                asChild
                className="w-full justify-start"
                variant="outline"
              >
                <Link href="/admin/patients">
                  <Eye className="mr-2 h-4 w-4" />
                  View All Patients
                </Link>
              </Button>
              <Button
                asChild
                className="w-full justify-start"
                variant="outline"
              >
                <Link href="/admin/doctors">
                  <Eye className="mr-2 h-4 w-4" />
                  View All Doctors
                </Link>
              </Button>
              <Button
                asChild
                className="w-full justify-start"
                variant="outline"
              >
                <Link href="/admin/appointments">
                  <Eye className="mr-2 h-4 w-4" />
                  View All Appointments
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Appointments</CardTitle>
              <CardDescription>Recent appointment activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{appointment.patient}</p>
                    <p className="text-xs text-muted-foreground">
                      {appointment.doctor} • {appointment.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{appointment.time}</p>
                    <Badge
                      variant={
                        appointment.status === "confirmed"
                          ? "default"
                          : appointment.status === "pending"
                          ? "secondary"
                          : appointment.status === "completed"
                          ? "outline"
                          : "destructive"
                      }
                      className="text-xs"
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
