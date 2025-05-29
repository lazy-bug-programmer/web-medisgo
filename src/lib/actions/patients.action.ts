/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createAdminClient, getLoggedInUser } from "@/lib/appwrite/server";
import { Query } from "node-appwrite";
import { Patient } from "../domains/patients.domain";

const DATABASE_ID = 'Core';
const PATIENTS_COLLECTION_ID = 'Patients';

// CREATE 
export async function createPatient(patient: Omit<Patient, "$id">) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { databases } = await createAdminClient();

        const newPatient = await databases.createDocument(
            DATABASE_ID,
            PATIENTS_COLLECTION_ID,
            "unique()",
            {
                user_id: patient.user_id,
                first_name: patient.first_name,
                last_name: patient.last_name,
                email: patient.email,
                dob: patient.dob,
                gender: patient.gender,
                address: patient.address,
                emergency_contact_name: patient.emergency_contact_name,
                emergency_contact_phone: patient.emergency_contact_phone,
                emergency_contact_relationship: patient.emergency_contact_relationship,
                allergies: patient.allergies,
                current_medications: patient.current_medications,
                medical_history: patient.medical_history,
                insurance_provider: patient.insurance_provider,
                insurance_policy_number: patient.insurance_policy_number
            }
        );

        return { data: newPatient };
    } catch (error: any) {
        console.error("Error creating patient:", error);
        return { error: error.message || "Failed to create patient" };
    }
}

// READ
export async function getPatients(limit = 10000) {
    try {
        const { databases } = await createClient();

        const patients = await databases.listDocuments(
            DATABASE_ID,
            PATIENTS_COLLECTION_ID,
            [Query.limit(limit), Query.orderDesc("$createdAt")]
        );

        return { data: patients.documents, total: patients.total };
    } catch (error: any) {
        console.error("Error getting patients:", error);
        return { error: error.message || "Failed to get patients" };
    }
}

export async function getPatientById(patientId: string) {
    try {
        const { databases } = await createClient();

        const patient = await databases.getDocument(
            DATABASE_ID,
            PATIENTS_COLLECTION_ID,
            patientId
        );

        return { data: patient };
    } catch (error: any) {
        console.error("Error getting patient:", error);
        return { error: error.message || "Failed to get patient" };
    }
}

export async function getUserPatient() {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { databases } = await createAdminClient();

        const patients = await databases.listDocuments(
            DATABASE_ID,
            PATIENTS_COLLECTION_ID,
            [Query.equal("user_id", user.$id)]
        );

        return { data: patients.documents.length > 0 ? patients.documents[0] : null };
    } catch (error: any) {
        console.error("Error getting user patient:", error);
        return { error: error.message || "Failed to get user patient" };
    }
}

// UPDATE
export async function updatePatient(patientId: string, updates: Partial<Patient>) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { databases } = await createAdminClient();

        // First check if the patient belongs to the user
        const patient = await databases.getDocument(
            DATABASE_ID,
            PATIENTS_COLLECTION_ID,
            patientId
        );

        if (patient.user_id !== user.$id) {
            return { error: "Not authorized to update this patient" };
        }

        const updatedPatient = await databases.updateDocument(
            DATABASE_ID,
            PATIENTS_COLLECTION_ID,
            patientId,
            updates
        );

        return { data: updatedPatient };
    } catch (error: any) {
        console.error("Error updating patient:", error);
        return { error: error.message || "Failed to update patient" };
    }
}

// DELETE
export async function deletePatient(patientId: string) {
    try {
        const user = await getLoggedInUser();
        if (!user) {
            return { error: "Not authorized" };
        }

        const { databases } = await createAdminClient();

        // First check if the patient belongs to the user
        const patient = await databases.getDocument(
            DATABASE_ID,
            PATIENTS_COLLECTION_ID,
            patientId
        );

        if (patient.user_id !== user.$id) {
            return { error: "Not authorized to delete this patient" };
        }

        await databases.deleteDocument(
            DATABASE_ID,
            PATIENTS_COLLECTION_ID,
            patientId
        );

        return { message: "Patient deleted successfully" };
    } catch (error: any) {
        console.error("Error deleting patient:", error);
        return { error: error.message || "Failed to delete patient" };
    }
}

// Admin operations
export async function adminGetAllPatients(limit = 10000) {
    try {
        const { databases } = await createAdminClient();

        const patients = await databases.listDocuments(
            DATABASE_ID,
            PATIENTS_COLLECTION_ID,
            [Query.limit(limit), Query.orderDesc("$createdAt")]
        );

        return { data: patients.documents, total: patients.total };
    } catch (error: any) {
        console.error("Error getting all patients:", error);
        return { error: error.message || "Failed to get all patients" };
    }
}

export async function adminUpdatePatient(patientId: string, updates: Partial<Patient>) {
    try {
        const { databases } = await createAdminClient();

        const updatedPatient = await databases.updateDocument(
            DATABASE_ID,
            PATIENTS_COLLECTION_ID,
            patientId,
            updates
        );

        return { data: updatedPatient };
    } catch (error: any) {
        console.error("Error updating patient:", error);
        return { error: error.message || "Failed to update patient" };
    }
}

export async function adminDeletePatient(patientId: string) {
    try {
        const { databases } = await createAdminClient();

        await databases.deleteDocument(
            DATABASE_ID,
            PATIENTS_COLLECTION_ID,
            patientId
        );

        return { message: "Patient deleted successfully" };
    } catch (error: any) {
        console.error("Error deleting patient:", error);
        return { error: error.message || "Failed to delete patient" };
    }
}

// Helper function to create a regular client
async function createClient() {
    const { databases } = await createAdminClient();
    return { databases };
}
