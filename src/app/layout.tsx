import type React from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MobileMenuToggle } from "@/components/mobile-menu";
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
          <div className="bg-blue-600 text-white hidden sm:block">
            <div className="container mx-auto flex flex-wrap items-center justify-between py-2 text-xs sm:text-sm px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  <span className="hidden sm:inline">+1 (555) 123-4567</span>
                  <span className="sm:hidden">Call Us</span>
                </div>
                <div className="flex items-center gap-1 hidden md:flex">
                  <Mail className="h-3 w-3" />
                  <span>info@medicare-hospital.com</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>Mon-Fri: 8am-8pm</span>
                </div>
                <div className="flex items-center gap-1 hidden md:flex">
                  <MapPin className="h-3 w-3" />
                  <span>123 Medical Drive, Healthville</span>
                </div>
              </div>
            </div>
          </div>
          <header className="sticky top-0 z-40 border-b bg-background">
            <div className="container mx-auto flex h-16 items-center justify-between py-2 px-4 sm:px-6 lg:px-8">
              <Link href="/" className="flex items-center gap-1 sm:gap-2">
                <span className="text-xl sm:text-2xl font-bold text-blue-600">
                  MediCare
                </span>
                <span className="text-lg sm:text-xl font-semibold">
                  Hospital
                </span>
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
              <div className="flex items-center gap-2 sm:gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 hover:bg-blue-50 hover:text-blue-600 hidden sm:inline-flex"
                >
                  Login
                </Button>
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
                >
                  Book Appointment
                </Button>
                <MobileMenuToggle />
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-blue-50">
            <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-3 sm:space-y-4">
                  <Link href="/" className="flex items-center gap-1 sm:gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-blue-600">
                      MediCare
                    </span>
                    <span className="text-lg sm:text-xl font-semibold">
                      Hospital
                    </span>
                  </Link>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Providing quality healthcare services with compassion and
                    excellence since 1985.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Quick Links
                  </h3>
                  <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
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

                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Services
                  </h3>
                  <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
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

                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold">
                    Contact
                  </h3>
                  <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <li className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        123 Medical Drive, Healthville
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        +1 (555) 123-4567
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        info@medicare-hospital.com
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Mon-Fri: 8am-8pm
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 sm:mt-8 border-t border-blue-100 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
                <p>
                  &copy; {new Date().getFullYear()} MediCare Hospital. All
                  rights reserved.
                </p>
              </div>
            </div>
          </footer>

          <Link href="https://web.whatsapp.com/">
            <button
              className="p-1 fixed bottom-5 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center z-50"
              aria-label="Contact via WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.72.043.419-.101.824z" />
              </svg>
            </button>
          </Link>
        </div>
      </body>
    </html>
  );
}
