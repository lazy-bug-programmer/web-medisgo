/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createAdminClient, getLoggedInUser } from "@/lib/appwrite/server";
import { Query } from "node-appwrite";
import { Hospital } from "../domains/hospitals.domain";

const DATABASE_ID = "Core";
const HOSPITALS_COLLECTION_ID = "Hospitals";

// CREATE
export async function createHospital(
  hospital: Omit<Hospital, "$id" | "$createdAt" | "$updatedAt">
) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const newHospital = await databases.createDocument(
      DATABASE_ID,
      HOSPITALS_COLLECTION_ID,
      "unique()",
      {
        name: hospital.name,
      }
    );

    return { data: newHospital };
  } catch (error: any) {
    console.error("Error creating hospital:", error);
    return { error: error.message || "Failed to create hospital" };
  }
}

// READ
export async function getHospitals(limit = 10000) {
  try {
    const { databases } = await createClient();

    const hospitals = await databases.listDocuments(
      DATABASE_ID,
      HOSPITALS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: hospitals.documents, total: hospitals.total };
  } catch (error: any) {
    console.error("Error getting hospitals:", error);
    return { error: error.message || "Failed to get hospitals" };
  }
}

export async function getHospitalById(hospitalId: string) {
  try {
    const { databases } = await createClient();

    const hospital = await databases.getDocument(
      DATABASE_ID,
      HOSPITALS_COLLECTION_ID,
      hospitalId
    );

    return { data: hospital };
  } catch (error: any) {
    console.error("Error getting hospital:", error);
    return { error: error.message || "Failed to get hospital" };
  }
}

export async function getHospitalsByName(name: string, limit = 10000) {
  try {
    const { databases } = await createClient();

    const hospitals = await databases.listDocuments(
      DATABASE_ID,
      HOSPITALS_COLLECTION_ID,
      [Query.search("name", name), Query.limit(limit)]
    );

    return { data: hospitals.documents, total: hospitals.total };
  } catch (error: any) {
    console.error("Error getting hospitals by name:", error);
    return { error: error.message || "Failed to get hospitals by name" };
  }
}

// UPDATE
export async function updateHospital(
  hospitalId: string,
  updates: Partial<Omit<Hospital, "$id" | "$createdAt" | "$updatedAt">>
) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const updatedHospital = await databases.updateDocument(
      DATABASE_ID,
      HOSPITALS_COLLECTION_ID,
      hospitalId,
      updates
    );

    return { data: updatedHospital };
  } catch (error: any) {
    console.error("Error updating hospital:", error);
    return { error: error.message || "Failed to update hospital" };
  }
}

// DELETE
export async function deleteHospital(hospitalId: string) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      DATABASE_ID,
      HOSPITALS_COLLECTION_ID,
      hospitalId
    );

    return { message: "Hospital deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting hospital:", error);
    return { error: error.message || "Failed to delete hospital" };
  }
}

// Admin operations
export async function adminGetAllHospitals(limit = 10000) {
  try {
    const { databases } = await createAdminClient();

    const hospitals = await databases.listDocuments(
      DATABASE_ID,
      HOSPITALS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: hospitals.documents, total: hospitals.total };
  } catch (error: any) {
    console.error("Error getting all hospitals:", error);
    return { error: error.message || "Failed to get all hospitals" };
  }
}

export async function adminUpdateHospital(
  hospitalId: string,
  updates: Partial<Omit<Hospital, "$id" | "$createdAt" | "$updatedAt">>
) {
  try {
    const { databases } = await createAdminClient();

    const updatedHospital = await databases.updateDocument(
      DATABASE_ID,
      HOSPITALS_COLLECTION_ID,
      hospitalId,
      updates
    );

    return { data: updatedHospital };
  } catch (error: any) {
    console.error("Error updating hospital:", error);
    return { error: error.message || "Failed to update hospital" };
  }
}

export async function adminDeleteHospital(hospitalId: string) {
  try {
    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      DATABASE_ID,
      HOSPITALS_COLLECTION_ID,
      hospitalId
    );

    return { message: "Hospital deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting hospital:", error);
    return { error: error.message || "Failed to delete hospital" };
  }
}

// Helper function to create a regular client
async function createClient() {
  const { databases } = await createAdminClient();
  return { databases };
}

// PUBLIC ACTIONS (No authentication required)
export async function getPublicHospitals(limit = 10000) {
  try {
    const { databases } = await createAdminClient();

    const hospitals = await databases.listDocuments(
      DATABASE_ID,
      HOSPITALS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: hospitals.documents, total: hospitals.total };
  } catch (error: any) {
    console.error("Error getting public hospitals:", error);
    return { error: error.message || "Failed to get hospitals" };
  }
}

export async function getPublicHospitalById(hospitalId: string) {
  try {
    const { databases } = await createAdminClient();

    const hospital = await databases.getDocument(
      DATABASE_ID,
      HOSPITALS_COLLECTION_ID,
      hospitalId
    );

    return { data: hospital };
  } catch (error: any) {
    console.error("Error getting public hospital:", error);
    return { error: error.message || "Failed to get hospital" };
  }
}

export async function getPublicHospitalByName(name: string) {
  try {
    const { databases } = await createAdminClient();

    const hospitals = await databases.listDocuments(
      DATABASE_ID,
      HOSPITALS_COLLECTION_ID,
      [Query.equal("name", name), Query.limit(1)]
    );

    if (hospitals.documents.length === 0) {
      return { error: "Hospital not found" };
    }

    return { data: hospitals.documents[0] };
  } catch (error: any) {
    console.error("Error getting public hospital by name:", error);
    return { error: error.message || "Failed to get hospital" };
  }
}
