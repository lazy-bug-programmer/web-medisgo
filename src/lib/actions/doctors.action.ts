/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createAdminClient, getLoggedInUser } from "@/lib/appwrite/server";
import { Query } from "node-appwrite";
import { Doctor } from "../domains/doctors.domain";
import { uploadImage } from "../appwrite/bucket";

const DATABASE_ID = "Core";
const DOCTORS_COLLECTION_ID = "doctors_1";

// CREATE with image upload
export async function createDoctorWithImage(
  doctor: Omit<Doctor, "$id">,
  profileImage?: File
) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    let photo_url = doctor.photo_url || "";

    // If profile image is provided, upload it first
    if (profileImage) {
      const uploadResult = await uploadImage(profileImage);
      if (uploadResult.error) {
        return { error: uploadResult.error };
      }

      if (uploadResult.data) {
        photo_url = uploadResult.data.fileId;
      }
    }

    // Create doctor with the image URL
    const { databases } = await createAdminClient();

    const newDoctor = await databases.createDocument(
      DATABASE_ID,
      DOCTORS_COLLECTION_ID,
      "unique()",
      {
        photo_url,
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        email: doctor.email,
        phone: doctor.phone,
        dob: doctor.dob,
        gender: doctor.gender,
        address: doctor.address,
        specialty: doctor.specialty,
        department: doctor.department,
        medical_license_number: doctor.medical_license_number,
        years_of_experience: doctor.years_of_experience,
        status: doctor.status,
        education_and_training: doctor.education_and_training,
        biography: doctor.biography,
        languages: doctor.languages,
        working_hours: doctor.working_hours,
      }
    );

    return { data: newDoctor };
  } catch (error: any) {
    console.error("Error creating doctor with image:", error);
    return { error: error.message || "Failed to create doctor with image" };
  }
}

// UPDATE with image upload
export async function updateDoctorWithImage(
  doctorId: string,
  updates: Partial<Doctor>,
  newProfileImage?: File
) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const updatesToApply = { ...updates };

    // If a new profile image is provided, upload it first
    if (newProfileImage) {
      const uploadResult = await uploadImage(newProfileImage);
      if (uploadResult.error) {
        return { error: uploadResult.error };
      }

      if (uploadResult.data) {
        updatesToApply.photo_url = uploadResult.data.fileId;
      }
    }

    const updatedDoctor = await databases.updateDocument(
      DATABASE_ID,
      DOCTORS_COLLECTION_ID,
      doctorId,
      updatesToApply
    );

    return { data: updatedDoctor };
  } catch (error: any) {
    console.error("Error updating doctor with image:", error);
    return { error: error.message || "Failed to update doctor with image" };
  }
}

// CREATE
export async function createDoctor(doctor: Omit<Doctor, "$id">) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const newDoctor = await databases.createDocument(
      DATABASE_ID,
      DOCTORS_COLLECTION_ID,
      "unique()",
      {
        photo_url: doctor.photo_url,
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        email: doctor.email,
        phone: doctor.phone,
        dob: doctor.dob,
        gender: doctor.gender,
        address: doctor.address,
        specialty: doctor.specialty,
        department: doctor.department,
        medical_license_number: doctor.medical_license_number,
        years_of_experience: doctor.years_of_experience,
        status: doctor.status,
        education_and_training: doctor.education_and_training,
        biography: doctor.biography,
        languages: doctor.languages,
        working_hours: doctor.working_hours,
      }
    );

    return { data: newDoctor };
  } catch (error: any) {
    console.error("Error creating doctor:", error);
    return { error: error.message || "Failed to create doctor" };
  }
}

// READ
export async function getDoctors(limit = 10000) {
  try {
    const { databases } = await createClient();

    const doctors = await databases.listDocuments(
      DATABASE_ID,
      DOCTORS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: doctors.documents, total: doctors.total };
  } catch (error: any) {
    console.error("Error getting doctors:", error);
    return { error: error.message || "Failed to get doctors" };
  }
}

export async function getDoctorById(doctorId: string) {
  try {
    const { databases } = await createClient();

    const doctor = await databases.getDocument(
      DATABASE_ID,
      DOCTORS_COLLECTION_ID,
      doctorId
    );

    return { data: doctor };
  } catch (error: any) {
    console.error("Error getting doctor:", error);
    return { error: error.message || "Failed to get doctor" };
  }
}

export async function getDoctorsBySpecialty(specialty: string, limit = 10000) {
  try {
    const { databases } = await createClient();

    const doctors = await databases.listDocuments(
      DATABASE_ID,
      DOCTORS_COLLECTION_ID,
      [Query.equal("specialty", specialty), Query.limit(limit)]
    );

    return { data: doctors.documents, total: doctors.total };
  } catch (error: any) {
    console.error("Error getting doctors by specialty:", error);
    return { error: error.message || "Failed to get doctors by specialty" };
  }
}

export async function getDoctorsByDepartment(
  department: string,
  limit = 10000
) {
  try {
    const { databases } = await createClient();

    const doctors = await databases.listDocuments(
      DATABASE_ID,
      DOCTORS_COLLECTION_ID,
      [Query.equal("department", department), Query.limit(limit)]
    );

    return { data: doctors.documents, total: doctors.total };
  } catch (error: any) {
    console.error("Error getting doctors by department:", error);
    return { error: error.message || "Failed to get doctors by department" };
  }
}

export async function getUniqueSpecialties() {
  try {
    const { databases } = await createClient();

    const doctors = await databases.listDocuments(
      DATABASE_ID,
      DOCTORS_COLLECTION_ID,
      [Query.limit(10000), Query.select(["specialty"])]
    );

    // Extract unique specialties
    const specialties = Array.from(
      new Set(
        doctors.documents
          .map((doc: any) => doc.specialty)
          .filter((specialty: string) => specialty && specialty.trim() !== "")
      )
    ).sort();

    return { data: specialties };
  } catch (error: any) {
    console.error("Error getting unique specialties:", error);
    return { error: error.message || "Failed to get unique specialties" };
  }
}

export async function getUniqueHospitals() {
  try {
    const { databases } = await createClient();

    const doctors = await databases.listDocuments(
      DATABASE_ID,
      DOCTORS_COLLECTION_ID,
      [Query.limit(10000), Query.select(["address"])]
    );

    // Extract unique hospital names from addresses
    const hospitals = Array.from(
      new Set(
        doctors.documents
          .map((doc: any) => doc.address)
          .filter((address: string) => address && address.trim() !== "")
      )
    ).sort();

    return { data: hospitals };
  } catch (error: any) {
    console.error("Error getting unique hospitals:", error);
    return { error: error.message || "Failed to get unique hospitals" };
  }
}

// UPDATE
export async function updateDoctor(doctorId: string, updates: Partial<Doctor>) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    const updatedDoctor = await databases.updateDocument(
      DATABASE_ID,
      DOCTORS_COLLECTION_ID,
      doctorId,
      updates
    );

    return { data: updatedDoctor };
  } catch (error: any) {
    console.error("Error updating doctor:", error);
    return { error: error.message || "Failed to update doctor" };
  }
}

// DELETE
export async function deleteDoctor(doctorId: string) {
  try {
    const user = await getLoggedInUser();
    if (!user) {
      return { error: "Not authorized" };
    }

    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      DATABASE_ID,
      DOCTORS_COLLECTION_ID,
      doctorId
    );

    return { message: "Doctor deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting doctor:", error);
    return { error: error.message || "Failed to delete doctor" };
  }
}

// Admin operations
export async function adminGetAllDoctors(limit = 10000) {
  try {
    const { databases } = await createAdminClient();

    const doctors = await databases.listDocuments(
      DATABASE_ID,
      DOCTORS_COLLECTION_ID,
      [Query.limit(limit), Query.orderDesc("$createdAt")]
    );

    return { data: doctors.documents, total: doctors.total };
  } catch (error: any) {
    console.error("Error getting all doctors:", error);
    return { error: error.message || "Failed to get all doctors" };
  }
}

export async function adminUpdateDoctor(
  doctorId: string,
  updates: Partial<Doctor>
) {
  try {
    const { databases } = await createAdminClient();

    const updatedDoctor = await databases.updateDocument(
      DATABASE_ID,
      DOCTORS_COLLECTION_ID,
      doctorId,
      updates
    );

    return { data: updatedDoctor };
  } catch (error: any) {
    console.error("Error updating doctor:", error);
    return { error: error.message || "Failed to update doctor" };
  }
}

export async function adminDeleteDoctor(doctorId: string) {
  try {
    const { databases } = await createAdminClient();

    await databases.deleteDocument(
      DATABASE_ID,
      DOCTORS_COLLECTION_ID,
      doctorId
    );

    return { message: "Doctor deleted successfully" };
  } catch (error: any) {
    console.error("Error deleting doctor:", error);
    return { error: error.message || "Failed to delete doctor" };
  }
}

// Helper function to create a regular client
async function createClient() {
  const { databases } = await createAdminClient();
  return { databases };
}
