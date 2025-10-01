/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createAdminClient, getLoggedInUser } from "@/lib/appwrite/server";
import { Query } from "node-appwrite";
import { HospitalCheckups } from "../domains/hospital_checkups.domain";
import { uploadImage } from "../appwrite/bucket";

const DATABASE_ID = "Core";
const HOSPITAL_CHECKUPS_COLLECTION_ID = "HospitalCheckups";

// CREATE with image upload
export async function createHospitalCheckupWithImage(
  hospitalCheckup: Omit<HospitalCheckups, "$id" | "$createdAt" | "$updatedAt">,
  checkupImage?: File
) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    let image_url = hospitalCheckup.image_url || "";

    // If checkup image is provided, upload it first
    if (checkupImage) {
      const uploadResult = await uploadImage(checkupImage);
      if (uploadResult.error) {
        return { error: uploadResult.error };
      }

      if (uploadResult.data) {
        image_url = uploadResult.data.fileId;
      }
    }

    // Create hospital checkup with the image URL
    const { databases } = await createAdminClient();

    const newHospitalCheckup = await databases.createDocument(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      "unique()",
      {
        hospital_id: hospitalCheckup.hospital_id,
        image_url,
        title: hospitalCheckup.title,
        short_description: hospitalCheckup.short_description,
        description: hospitalCheckup.description,
        price: hospitalCheckup.price,
      }
    );

    return { data: newHospitalCheckup };
  } catch (error: any) {
    console.error("Error creating hospital checkup with image:", error);
    return {
      error: error.message || "Failed to create hospital checkup with image",
    };
  }
}

// UPDATE with image upload
export async function updateHospitalCheckupWithImage(
  hospitalCheckupId: string,
  updates: Partial<Omit<HospitalCheckups, "$id" | "$createdAt" | "$updatedAt">>,
  newCheckupImage?: File
) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const updatesToApply = { ...updates };

    // If a new checkup image is provided, upload it first
    if (newCheckupImage) {
      const uploadResult = await uploadImage(newCheckupImage);
      if (uploadResult.error) {
        return { error: uploadResult.error };
      }

      if (uploadResult.data) {
        updatesToApply.image_url = uploadResult.data.fileId;
      }
    }

    const updatedHospitalCheckup = await databases.updateDocument(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      hospitalCheckupId,
      updatesToApply
    );

    return { data: updatedHospitalCheckup };
  } catch (error: any) {
    console.error("Error updating hospital checkup with image:", error);
    return {
      error: error.message || "Failed to update hospital checkup with image",
    };
  }
}

// CREATE
export async function createHospitalCheckup(
  hospitalCheckup: Omit<HospitalCheckups, "$id" | "$createdAt" | "$updatedAt">
) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const newHospitalCheckup = await databases.createDocument(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      "unique()",
      {
        hospital_id: hospitalCheckup.hospital_id,
        image_url: hospitalCheckup.image_url,
        title: hospitalCheckup.title,
        short_description: hospitalCheckup.short_description,
        description: hospitalCheckup.description,
        price: hospitalCheckup.price,
      }
    );

    return { data: newHospitalCheckup };
  } catch (error: any) {
    console.error("Error creating hospital checkup:", error);
    return { error: error.message || "Failed to create hospital checkup" };
  }
}

// READ
export async function getHospitalCheckups(limit = 10000) {
  try {
    const { databases } = await createClient();

    const hospitalCheckups = await databases.listDocuments(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: hospitalCheckups.documents, total: hospitalCheckups.total };
  } catch (error: any) {
    console.error("Error getting hospital checkups:", error);
    return { error: error.message || "Failed to get hospital checkups" };
  }
}

export async function getHospitalCheckupById(hospitalCheckupId: string) {
  try {
    const { databases } = await createClient();

    const hospitalCheckup = await databases.getDocument(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      hospitalCheckupId
    );

    return { data: hospitalCheckup };
  } catch (error: any) {
    console.error("Error getting hospital checkup:", error);
    return { error: error.message || "Failed to get hospital checkup" };
  }
}

export async function getHospitalCheckupsByHospitalId(
  hospitalId: string,
  limit = 10000
) {
  try {
    const { databases } = await createClient();

    const hospitalCheckups = await databases.listDocuments(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      [
        Query.equal("hospital_id", hospitalId),
        Query.limit(limit),
        Query.orderDesc("$createdAt"),
      ]
    );

    return { data: hospitalCheckups.documents, total: hospitalCheckups.total };
  } catch (error: any) {
    console.error("Error getting hospital checkups by hospital ID:", error);
    return {
      error: error.message || "Failed to get hospital checkups by hospital ID",
    };
  }
}

export async function getHospitalCheckupsByTitle(title: string, limit = 10000) {
  try {
    const { databases } = await createClient();

    const hospitalCheckups = await databases.listDocuments(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      [Query.search("title", title), Query.limit(limit)]
    );

    return { data: hospitalCheckups.documents, total: hospitalCheckups.total };
  } catch (error: any) {
    console.error("Error getting hospital checkups by title:", error);
    return {
      error: error.message || "Failed to get hospital checkups by title",
    };
  }
}

export async function getHospitalCheckupsByPriceRange(
  minPrice: number,
  maxPrice: number,
  limit = 10000
) {
  try {
    const { databases } = await createClient();

    const hospitalCheckups = await databases.listDocuments(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      [
        Query.greaterThanEqual("price", minPrice),
        Query.lessThanEqual("price", maxPrice),
        Query.limit(limit),
        Query.orderAsc("price"),
      ]
    );

    return { data: hospitalCheckups.documents, total: hospitalCheckups.total };
  } catch (error: any) {
    console.error("Error getting hospital checkups by price range:", error);
    return {
      error: error.message || "Failed to get hospital checkups by price range",
    };
  }
}

// UPDATE
export async function updateHospitalCheckup(
  hospitalCheckupId: string,
  updates: Partial<Omit<HospitalCheckups, "$id" | "$createdAt" | "$updatedAt">>
) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const updatedHospitalCheckup = await databases.updateDocument(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      hospitalCheckupId,
      updates
    );

    return { data: updatedHospitalCheckup };
  } catch (error: any) {
    console.error("Error updating hospital checkup:", error);
    return { error: error.message || "Failed to update hospital checkup" };
  }
}

// DELETE
export async function deleteHospitalCheckup(hospitalCheckupId: string) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      hospitalCheckupId
    );

    return { message: "Hospital checkup deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting hospital checkup:", error);
    return { error: error.message || "Failed to delete hospital checkup" };
  }
}

// Admin operations
export async function adminGetAllHospitalCheckups(limit = 10000) {
  try {
    const { databases } = await createAdminClient();

    const hospitalCheckups = await databases.listDocuments(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: hospitalCheckups.documents, total: hospitalCheckups.total };
  } catch (error: any) {
    console.error("Error getting all hospital checkups:", error);
    return { error: error.message || "Failed to get all hospital checkups" };
  }
}

export async function adminUpdateHospitalCheckup(
  hospitalCheckupId: string,
  updates: Partial<Omit<HospitalCheckups, "$id" | "$createdAt" | "$updatedAt">>
) {
  try {
    const { databases } = await createAdminClient();

    const updatedHospitalCheckup = await databases.updateDocument(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      hospitalCheckupId,
      updates
    );

    return { data: updatedHospitalCheckup };
  } catch (error: any) {
    console.error("Error updating hospital checkup:", error);
    return { error: error.message || "Failed to update hospital checkup" };
  }
}

export async function adminDeleteHospitalCheckup(hospitalCheckupId: string) {
  try {
    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      hospitalCheckupId
    );

    return { message: "Hospital checkup deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting hospital checkup:", error);
    return { error: error.message || "Failed to delete hospital checkup" };
  }
}

// Helper function to create a regular client
async function createClient() {
  const { databases } = await createAdminClient();
  return { databases };
}

// PUBLIC ACTIONS (No authentication required)
export async function getPublicHospitalCheckups(limit = 10000) {
  try {
    const { databases } = await createAdminClient();

    const hospitalCheckups = await databases.listDocuments(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: hospitalCheckups.documents, total: hospitalCheckups.total };
  } catch (error: any) {
    console.error("Error getting public hospital checkups:", error);
    return { error: error.message || "Failed to get hospital checkups" };
  }
}

export async function getPublicHospitalCheckupById(hospitalCheckupId: string) {
  try {
    const { databases } = await createAdminClient();

    const hospitalCheckup = await databases.getDocument(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      hospitalCheckupId
    );

    return { data: hospitalCheckup };
  } catch (error: any) {
    console.error("Error getting public hospital checkup:", error);
    return { error: error.message || "Failed to get hospital checkup" };
  }
}

export async function getPublicHospitalCheckupsByHospitalId(
  hospitalId: string,
  limit = 10000
) {
  try {
    const { databases } = await createAdminClient();

    const hospitalCheckups = await databases.listDocuments(
      DATABASE_ID,
      HOSPITAL_CHECKUPS_COLLECTION_ID,
      [
        Query.equal("hospital_id", hospitalId),
        Query.limit(limit),
        Query.orderDesc("$createdAt"),
      ]
    );

    return { data: hospitalCheckups.documents, total: hospitalCheckups.total };
  } catch (error: any) {
    console.error(
      "Error getting public hospital checkups by hospital ID:",
      error
    );
    return {
      error: error.message || "Failed to get hospital checkups by hospital ID",
    };
  }
}
