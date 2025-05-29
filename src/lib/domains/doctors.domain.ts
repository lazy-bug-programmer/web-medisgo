export interface Doctor {
    $id: string;
    photo_url: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    dob: Date;
    gender: DoctorGender;
    address: string;
    specialty: DoctorSpecialty;
    department: DoctorDepartment;
    medical_license_number: string;
    years_of_experience: number;
    status: DoctorStatus;
    education_and_training: string;
    biography: string;

    // In JSON format, these fields will be stored as string
    languages: string;
    working_hours: string;
}

export enum DoctorGender {
    MALE,
    FEMALE,
    OTHERS
}

export enum DoctorSpecialty {
    CARDIOLOGY,
    DERMATOLOGY,
    GASTROENTEROLOGY,
    NEUROLOGY,
    ONCOLOGY,
    PEDIATRICS,
    PSYCHIATRY,
    RADIOLOGY,
    SURGERY,
    UROLOGY,
    OTHER
}

export enum DoctorDepartment {
    EMERGENCY,
    INTENSIVE_CARE,
    GENERAL_MEDICINE,
    SURGERY,
    PEDIATRICS,
    OBSTETRICS_GYNECOLOGY,
    PSYCHIATRY,
    RADIOLOGY,
    ONCOLOGY,
    OTHER
}

export enum DoctorStatus {
    ACTIVE,
    INACTIVE,
    ON_LEAVE,
    RETIRED
}