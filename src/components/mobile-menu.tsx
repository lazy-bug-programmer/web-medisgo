"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Building,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hospital } from "@/lib/domains/hospitals.domain";
import { getPublicHospitals } from "@/lib/actions/hospitals.action";

export function MobileMenuToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHospitals, setShowHospitals] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [hospitalsLoading, setHospitalsLoading] = useState(false);

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

  // Fetch hospitals when hospitals section is expanded
  useEffect(() => {
    const fetchHospitals = async () => {
      if (showHospitals && hospitals.length === 0 && !hospitalsLoading) {
        setHospitalsLoading(true);
        try {
          const response = await getPublicHospitals();
          if (response.error) {
            console.error("Error fetching hospitals:", response.error);
          } else {
            setHospitals(response.data as unknown as Hospital[]);
          }
        } catch (error) {
          console.error("Failed to fetch hospitals:", error);
        } finally {
          setHospitalsLoading(false);
        }
      }
    };

    fetchHospitals();
  }, [showHospitals, hospitals.length, hospitalsLoading]);

  // Convert hospital name to URL-friendly slug
  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
  };

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

            {/* Hospitals Section */}
            <div className="border-b border-gray-100 pb-2">
              <button
                onClick={() => setShowHospitals(!showHospitals)}
                className="w-full flex items-center justify-between text-lg font-medium text-left"
                aria-expanded={showHospitals}
              >
                <span>Hospitals</span>
                {showHospitals ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {showHospitals && (
                <div className="mt-3 pl-4 space-y-2">
                  {hospitalsLoading ? (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Building className="h-4 w-4" />
                      Loading hospitals...
                    </div>
                  ) : hospitals.length === 0 ? (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Building className="h-4 w-4" />
                      No hospitals available
                    </div>
                  ) : (
                    hospitals.map((hospital) => (
                      <Link
                        key={hospital.$id}
                        href={`/hospital/${createSlug(hospital.name)}`}
                        className="flex items-center gap-2 text-base text-gray-700 hover:text-blue-600 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Building className="h-4 w-4" />
                        {hospital.name}
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

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
