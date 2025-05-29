export interface Patient {
    $id: string;

    // User information
    // If the patient is a user, these fields will be populated
    user_id: string;

    first_name: string;
    last_name: string;
    email: string;
    phone: string;

    // Patient information
    dob: Date;
    gender: PatientGender;
    address: string;

    // Emergency contact information
    emergency_contact_name: string;
    emergency_contact_phone: string;
    emergency_contact_relationship: PatientEmergencyContactRelationship;

    // Medical information
    blood_type: PatientBloodType;
    allergies: string;
    current_medications: string;
    medical_history: string;

    // Insurance information
    insurance_provider: string;
    insurance_policy_number: string;
}

export enum PatientGender {
    MALE,
    FEMALE,
    OTHERS
}

export enum PatientBloodType {
    A_POSITIVE,
    A_NEGATIVE,
    B_POSITIVE,
    B_NEGATIVE,
    AB_POSITIVE,
    AB_NEGATIVE,
    O_POSITIVE,
    O_NEGATIVE,
}

export enum PatientEmergencyContactRelationship {
    PARENT,
    SIBLING,
    SPOUSE,
    CHILD,
    FRIEND,
    OTHER
}