/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createAdminClient } from "@/lib/appwrite/server";
import { Query } from "node-appwrite";

const DATABASE_ID = 'Core';
const PATIENTS_COLLECTION_ID = 'Patients';
const DOCTORS_COLLECTION_ID = 'Doctors';
const APPOINTMENTS_COLLECTION_ID = 'Appointments';

// Define types for better type checking
interface AppointmentData {
    id: string;
    patient: string;
    doctor: string;
    time: string;
    status: string;
    type: string;
}

interface DashboardData {
    patientCount: number;
    doctorCount: number;
    appointmentCount: number;
    recentAppointments: AppointmentData[];
}

interface DashboardResponse {
    data?: DashboardData;
    error?: string;
}

export async function getDashboardStats(): Promise<DashboardResponse> {
    try {
        const { databases } = await createAdminClient();

        // Get total patients
        const patients = await databases.listDocuments(
            DATABASE_ID,
            PATIENTS_COLLECTION_ID,
            [Query.limit(1)]
        );

        // Get active doctors
        const doctors = await databases.listDocuments(
            DATABASE_ID,
            DOCTORS_COLLECTION_ID,
            [Query.limit(1)]
        );

        // Get today's appointments
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

        const appointments = await databases.listDocuments(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            [
                Query.greaterThanEqual("datetime", startOfDay),
                Query.lessThanEqual("datetime", endOfDay),
                Query.limit(1)
            ]
        );

        // Get today's appointments for display
        const todaysAppointmentsDetails = await databases.listDocuments(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            [
                Query.greaterThanEqual("datetime", startOfDay),
                Query.lessThanEqual("datetime", endOfDay),
                Query.limit(10),
                Query.orderAsc("datetime")
            ]
        );

        // Fetch patient and doctor details for each appointment
        const appointmentsWithDetails: AppointmentData[] = await Promise.all(
            todaysAppointmentsDetails.documents.map(async (appointment) => {
                try {
                    const patientDetails = await databases.getDocument(
                        DATABASE_ID,
                        PATIENTS_COLLECTION_ID,
                        appointment.patient_id
                    );

                    const doctorDetails = await databases.getDocument(
                        DATABASE_ID,
                        DOCTORS_COLLECTION_ID,
                        appointment.doctor_id
                    );

                    return {
                        id: appointment.$id,
                        patient: `${patientDetails.first_name} ${patientDetails.last_name}`,
                        doctor: `Dr. ${doctorDetails.first_name} ${doctorDetails.last_name}`,
                        time: new Date(appointment.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        status: getAppointmentStatus(appointment),
                        type: getAppointmentType(appointment.appointment_type)
                    };
                } catch (err) {
                    // If we can't get details for a specific appointment, return a placeholder
                    console.error(`Error fetching details for appointment ${appointment.$id}:`, err);
                    return {
                        id: appointment.$id,
                        patient: "Unknown Patient",
                        doctor: "Unknown Doctor",
                        time: new Date(appointment.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        status: "pending",
                        type: "Unknown"
                    };
                }
            })
        );

        return {
            data: {
                patientCount: patients.total,
                doctorCount: doctors.total,
                appointmentCount: appointments.total,
                recentAppointments: appointmentsWithDetails
            }
        };
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        return { error: "Failed to fetch dashboard statistics" };
    }
}

// Helper functions to format appointment data
function getAppointmentStatus(appointment: any): string {
    // This is just an example. Adjust according to your actual data model
    const now = new Date();
    const appointmentDate = new Date(appointment.datetime);

    // Logic to determine status based on your data model
    // This is a simplified example
    if (appointmentDate < now) {
        return "completed";
    } else if (appointment.priority === 3) { // Assuming 3 is URGENT from your enum
        return "confirmed";
    } else if (appointment.priority === 0) { // Assuming 0 is LOW from your enum
        return "pending";
    } else {
        return "confirmed";
    }
}

function getAppointmentType(typeCode: number): string {
    const types = [
        "General Checkup",
        "Follow-up",
        "Emergency",
        "Specialist Referral",
        "Lab Test",
        "Vaccination"
    ];

    return types[typeCode] || "Unknown";
}
