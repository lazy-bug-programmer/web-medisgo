import Link from "next/link";
import { Users, UserCheck, Calendar, Plus, Eye } from "lucide-react";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDashboardStats } from "@/lib/actions/dashboard.action";

// Dashboard content component that fetches and displays real data
async function DashboardContent() {
  const { data, error } = await getDashboardStats();

  if (error) {
    return (
      <div className="text-red-500">Error loading dashboard data: {error}</div>
    );
  }

  // Define stats based on real data with fallback values
  const stats = [
    {
      title: "Total Patients",
      value: data?.patientCount?.toString() || "0",
      change: "", // We could calculate this if we track historical data
      trend: "up",
      icon: Users,
    },
    {
      title: "Active Doctors",
      value: data?.doctorCount?.toString() || "0",
      change: "",
      trend: "up",
      icon: UserCheck,
    },
    {
      title: "Today's Appointments",
      value: data?.appointmentCount?.toString() || "0",
      change: "",
      trend: "neutral",
      icon: Calendar,
    },
  ];

  // Ensure recentAppointments is an array (or empty array as fallback)
  const recentAppointments = data?.recentAppointments || [];

  return (
    <>
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
              {stat.change && (
                <p className="text-xs text-muted-foreground">
                  {stat.change} from last month
                </p>
              )}
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
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/patients/create">
                <Plus className="mr-2 h-4 w-4" />
                Add New Patient
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/doctors/create">
                <Plus className="mr-2 h-4 w-4" />
                Add New Doctor
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/hospitals/create">
                <Plus className="mr-2 h-4 w-4" />
                Add New Hospital
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/hospital_checkups/create">
                <Plus className="mr-2 h-4 w-4" />
                Add New Hospital Checkup
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/appointments/create">
                <Plus className="mr-2 h-4 w-4" />
                Schedule Appointment
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/patients">
                <Eye className="mr-2 h-4 w-4" />
                View All Patients
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/doctors">
                <Eye className="mr-2 h-4 w-4" />
                View All Doctors
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/appointments">
                <Eye className="mr-2 h-4 w-4" />
                View All Appointments
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/hospitals">
                <Eye className="mr-2 h-4 w-4" />
                View All Hospitals
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link href="/admin/hospital_checkups">
                <Eye className="mr-2 h-4 w-4" />
                View All Hospital Checkups
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
            {recentAppointments.length > 0 ? (
              recentAppointments.map((appointment) => (
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
              ))
            ) : (
              <p className="text-center text-muted-foreground">
                No appointments scheduled for today
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

// Loading skeleton for dashboard content
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-5 w-1/2 rounded bg-gray-200"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-1/3 rounded bg-gray-200"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 w-1/3 rounded bg-gray-200"></div>
            <div className="h-4 w-2/3 rounded bg-gray-200"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 rounded bg-gray-200"></div>
            ))}
          </CardContent>
        </Card>

        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 w-1/3 rounded bg-gray-200"></div>
            <div className="h-4 w-2/3 rounded bg-gray-200"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 rounded bg-gray-200"></div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent />
        </Suspense>
      </div>
    </div>
  );
}
