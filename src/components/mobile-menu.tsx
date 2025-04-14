"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when ESC key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Toggle Menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col pt-16 pb-8 px-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4"
            aria-label="Close Menu"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>

          <div className="flex flex-col gap-6 py-8">
            <Link
              href="/"
              className="text-lg font-medium border-b border-gray-100 pb-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-lg font-medium border-b border-gray-100 pb-2"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/doctors"
              className="text-lg font-medium border-b border-gray-100 pb-2"
              onClick={() => setIsOpen(false)}
            >
              Doctors
            </Link>
            <Link
              href="/about"
              className="text-lg font-medium border-b border-gray-100 pb-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium border-b border-gray-100 pb-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>

          <div className="mt-auto space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant="outline"
                className="w-full border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                Login
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Book Appointment
              </Button>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span>info@medicare-hospital.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span>Mon-Fri: 8am-8pm</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span>123 Medical Drive, Healthville</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
