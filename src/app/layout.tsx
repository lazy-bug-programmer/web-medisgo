import type React from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MediCare Hospital",
  description: "Your trusted healthcare partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <div className="flex min-h-screen flex-col">
          <div className="bg-blue-600 text-white">
            <div className="container mx-auto flex items-center justify-between py-2 text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  <span>info@medicare-hospital.com</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Mon-Fri: 8am-8pm</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>123 Medical Drive, Healthville</span>
                </div>
              </div>
            </div>
          </div>
          <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container mx-auto flex h-16 items-center justify-between py-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">
                  MediCare
                </span>
                <span className="text-xl font-semibold">Hospital</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/"
                  className="text-sm font-medium transition-colors hover:text-blue-600"
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="text-sm font-medium transition-colors hover:text-blue-600"
                >
                  Services
                </Link>
                <Link
                  href="/doctors"
                  className="text-sm font-medium transition-colors hover:text-blue-600"
                >
                  Doctors
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-medium transition-colors hover:text-blue-600"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-medium transition-colors hover:text-blue-600"
                >
                  Contact
                </Link>
              </nav>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  Login
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Book Appointment
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-blue-50">
            <div className="container mx-auto py-12">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-4">
                  <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-blue-600">
                      MediCare
                    </span>
                    <span className="text-xl font-semibold">Hospital</span>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Providing quality healthcare services with compassion and
                    excellence since 1985.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Quick Links</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/"
                        className="text-muted-foreground hover:text-blue-600"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services"
                        className="text-muted-foreground hover:text-blue-600"
                      >
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/doctors"
                        className="text-muted-foreground hover:text-blue-600"
                      >
                        Doctors
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="text-muted-foreground hover:text-blue-600"
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-muted-foreground hover:text-blue-600"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Services</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <Link
                        href="/services/emergency"
                        className="text-muted-foreground hover:text-blue-600"
                      >
                        Emergency Care
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/cardiology"
                        className="text-muted-foreground hover:text-blue-600"
                      >
                        Cardiology
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/neurology"
                        className="text-muted-foreground hover:text-blue-600"
                      >
                        Neurology
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/pediatrics"
                        className="text-muted-foreground hover:text-blue-600"
                      >
                        Pediatrics
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/orthopedics"
                        className="text-muted-foreground hover:text-blue-600"
                      >
                        Orthopedics
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Contact</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span className="text-muted-foreground">
                        123 Medical Drive, Healthville
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <span className="text-muted-foreground">
                        +1 (555) 123-4567
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span className="text-muted-foreground">
                        info@medicare-hospital.com
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-muted-foreground">
                        Mon-Fri: 8am-8pm
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 border-t border-blue-100 pt-8 text-center text-sm text-muted-foreground">
                <p>
                  &copy; {new Date().getFullYear()} MediCare Hospital. All
                  rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
