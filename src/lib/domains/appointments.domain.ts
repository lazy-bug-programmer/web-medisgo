export interface Appointment {
    $id: string
    patient_id: string;
    doctor_id: string;
    datetime: Date;
    appointment_type: AppointmentType;
    duration: AppointmentDuration;
    priority: AppointmentPriority;
    notes: string;
}

export enum AppointmentType {
    GENERAL_CHECKUP = 0,
    FOLLOW_UP = 1,
    EMERGENCY = 2,
    SPECIALIST_REFERRAL = 3,
    LAB_TEST = 4,
    VACCINATION = 5
}

export enum AppointmentDuration {
    SHORT,
    MEDIUM,
    LONG,
}

export enum AppointmentPriority {
    LOW = 0,
    MEDIUM = 1,
    HIGH = 2,
    URGENT = 3
}