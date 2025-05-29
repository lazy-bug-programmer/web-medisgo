/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createAdminClient, getLoggedInUser } from "@/lib/appwrite/server";
import { Query } from "node-appwrite";
import { Appointment } from "../domains/appointments.domain";

const DATABASE_ID = 'Core';
const APPOINTMENTS_COLLECTION_ID = 'Appointments';

// CREATE 
export async function createAppointment(appointment: Omit<Appointment, "$id">) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { databases } = await createAdminClient();

        const newAppointment = await databases.createDocument(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            "unique()",
            {
                patient_id: appointment.patient_id,
                doctor_id: appointment.doctor_id,
                datetime: appointment.datetime,
                appointment_type: appointment.appointment_type,
                duration: appointment.duration,
                priority: appointment.priority,
                notes: appointment.notes
            }
        );

        return { data: newAppointment };
    } catch (error: any) {
        console.error("Error creating appointment:", error);
        return { error: error.message || "Failed to create appointment" };
    }
}

// READ
export async function getAppointments(limit = 10000) {
    try {
        const { databases } = await createClient();

        const appointments = await databases.listDocuments(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            [Query.limit(limit), Query.orderDesc("datetime")]
        );

        return { data: appointments.documents, total: appointments.total };
    } catch (error: any) {
        console.error("Error getting appointments:", error);
        return { error: error.message || "Failed to get appointments" };
    }
}

export async function getAppointmentById(appointmentId: string) {
    try {
        const { databases } = await createClient();

        const appointment = await databases.getDocument(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            appointmentId
        );

        return { data: appointment };
    } catch (error: any) {
        console.error("Error getting appointment:", error);
        return { error: error.message || "Failed to get appointment" };
    }
}

export async function getPatientAppointments(patientId: string) {
    try {
        const { databases } = await createClient();

        const appointments = await databases.listDocuments(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            [Query.equal("patient_id", patientId), Query.orderDesc("datetime")]
        );

        return { data: appointments.documents, total: appointments.total };
    } catch (error: any) {
        console.error("Error getting patient appointments:", error);
        return { error: error.message || "Failed to get patient appointments" };
    }
}

export async function getDoctorAppointments(doctorId: string) {
    try {
        const { databases } = await createClient();

        const appointments = await databases.listDocuments(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            [Query.equal("doctor_id", doctorId), Query.orderDesc("datetime")]
        );

        return { data: appointments.documents, total: appointments.total };
    } catch (error: any) {
        console.error("Error getting doctor appointments:", error);
        return { error: error.message || "Failed to get doctor appointments" };
    }
}

export async function getUserAppointments() {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { databases } = await createAdminClient();

        // Get patient record for this user
        const patients = await databases.listDocuments(
            DATABASE_ID,
            'Patients',
            [Query.equal("user_id", user.$id)]
        );

        if (patients.documents.length === 0) {
            return { data: [], total: 0 };
        }

        const patientId = patients.documents[0].$id;

        // Get appointments for this patient
        const appointments = await databases.listDocuments(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            [Query.equal("patient_id", patientId), Query.orderDesc("datetime")]
        );

        return { data: appointments.documents, total: appointments.total };
    } catch (error: any) {
        console.error("Error getting user appointments:", error);
        return { error: error.message || "Failed to get user appointments" };
    }
}

// UPDATE
export async function updateAppointment(appointmentId: string, updates: Partial<Appointment>) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { databases } = await createAdminClient();

        // First check if the appointment belongs to the user's patient record
        const appointment = await databases.getDocument(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            appointmentId
        );

        // Get patient record for this user
        const patients = await databases.listDocuments(
            DATABASE_ID,
            'Patients',
            [Query.equal("user_id", user.$id)]
        );

        if (patients.documents.length === 0 || appointment.patient_id !== patients.documents[0].$id) {
            return { error: "Not authorized to update this appointment" };
        }

        const updatedAppointment = await databases.updateDocument(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            appointmentId,
            updates
        );

        return { data: updatedAppointment };
    } catch (error: any) {
        console.error("Error updating appointment:", error);
        return { error: error.message || "Failed to update appointment" };
    }
}

// DELETE
export async function deleteAppointment(appointmentId: string) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { databases } = await createAdminClient();

        // First check if the appointment belongs to the user's patient record
        const appointment = await databases.getDocument(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            appointmentId
        );

        // Get patient record for this user
        const patients = await databases.listDocuments(
            DATABASE_ID,
            'Patients',
            [Query.equal("user_id", user.$id)]
        );

        if (patients.documents.length === 0 || appointment.patient_id !== patients.documents[0].$id) {
            return { error: "Not authorized to delete this appointment" };
        }

        await databases.deleteDocument(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            appointmentId
        );

        return { message: "Appointment deleted successfully" };
    } catch (error: any) {
        console.error("Error deleting appointment:", error);
        return { error: error.message || "Failed to delete appointment" };
    }
}

// Admin operations
export async function adminGetAllAppointments(limit = 10000) {
    try {
        const { databases } = await createAdminClient();

        const appointments = await databases.listDocuments(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            [Query.limit(limit), Query.orderDesc("datetime")]
        );

        return { data: appointments.documents, total: appointments.total };
    } catch (error: any) {
        console.error("Error getting all appointments:", error);
        return { error: error.message || "Failed to get all appointments" };
    }
}

export async function adminUpdateAppointment(appointmentId: string, updates: Partial<Appointment>) {
    try {
        const { databases } = await createAdminClient();

        const updatedAppointment = await databases.updateDocument(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            appointmentId,
            updates
        );

        return { data: updatedAppointment };
    } catch (error: any) {
        console.error("Error updating appointment:", error);
        return { error: error.message || "Failed to update appointment" };
    }
}

export async function adminDeleteAppointment(appointmentId: string) {
    try {
        const { databases } = await createAdminClient();

        await databases.deleteDocument(
            DATABASE_ID,
            APPOINTMENTS_COLLECTION_ID,
            appointmentId
        );

        return { message: "Appointment deleted successfully" };
    } catch (error: any) {
        console.error("Error deleting appointment:", error);
        return { error: error.message || "Failed to delete appointment" };
    }
}

// Helper function to create a regular client
async function createClient() {
    const { databases } = await createAdminClient();
    return { databases };
}