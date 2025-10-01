"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Building } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Hospital } from "@/lib/domains/hospitals.domain";
import { getPublicHospitals } from "@/lib/actions/hospitals.action";

export function HospitalDropdown() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
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
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  // Convert hospital name to URL-friendly slug
  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm font-medium transition-colors hover:text-blue-600 h-auto p-0"
        >
          Hospitals
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {loading ? (
          <DropdownMenuItem disabled>
            <Building className="mr-2 h-4 w-4" />
            Loading hospitals...
          </DropdownMenuItem>
        ) : hospitals.length === 0 ? (
          <DropdownMenuItem disabled>
            <Building className="mr-2 h-4 w-4" />
            No hospitals available
          </DropdownMenuItem>
        ) : (
          hospitals.map((hospital) => (
            <DropdownMenuItem key={hospital.$id} asChild>
              <Link
                href={`/hospital/${createSlug(hospital.name)}`}
                className="flex items-center w-full"
              >
                <Building className="mr-2 h-4 w-4" />
                {hospital.name}
              </Link>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
