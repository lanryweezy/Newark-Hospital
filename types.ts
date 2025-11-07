import React from 'react';

export interface NavLink {
    name: string;
    path: string; // Path is required, but can be '#' for dropdown parents
    children?: NavLink[];
}

export interface Specialty {
    name: string;
    description: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    services: string[];
    imageUrl: string;
    category?: string;
}

export interface Doctor {
    name: string;
    specialty: string;
    imageUrl: string;
    bio: string;
}

export interface Testimonial {
    quote: string;
    name: string;
    relation: string;
}

export interface Appointment {
    id: string;
    date: string;
    doctor: string;
    specialty: string;
    reason: string;
    status: 'Completed' | 'Upcoming' | 'Cancelled';
}

export interface TestResult {
    id: string;
    date: string;
    testName: string;
    value?: string;
    units?: string;
    normalRange?: string;
    interpretation: 'Normal' | 'High' | 'Low' | 'Abnormal' | 'Pending';
    notes?: string;
}

export interface Prescription {
    id: string;
    medication: string;
    dosage: string;
    refillsLeft: number;
    lastFilled: string;
}

export interface PatientUser {
    name: string;
    patientId: string;
    email: string;
    phone: string;
}

export interface Message {
    id: string;
    sender: 'Patient' | 'Care Team';
    subject: string;
    body: string;
    timestamp: string;
    status: 'read' | 'unread';
}

export interface PatientData {
    user: PatientUser;
    appointments: Appointment[];
    testResults: TestResult[];
    prescriptions: Prescription[];
    messages: Message[];
}

export interface HealthArticle {
    title: string;
    category: string;
    imageUrl: string;
    excerpt: string;
    path: string;
}