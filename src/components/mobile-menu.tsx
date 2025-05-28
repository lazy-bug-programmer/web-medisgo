"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
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
            <div className="pt-6 border-t border-gray-100">
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span>+62 811-6380-895</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span>ask@medisgo.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span>
                    Uniland Plaza, LT 2 (MEDISGO), Jl. M. T. Haryono, Gg. Buntu,
                    Kec. Medan Tim., Kota Medan, Sumatera Utara 20212, Indonesia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
