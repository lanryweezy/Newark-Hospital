
import React from 'react';
import type { NavLink, Specialty, Doctor, Testimonial, PatientData, HealthArticle } from './types';
import { StethoscopeIcon, HeartPulseIcon, BabyIcon, BoneIcon, MicroscopeIcon, PillIcon, BrainCircuitIcon, UsersIcon, HeartHandshakeIcon } from './components/IconComponents';

export const whyChooseUsData = [
    {
        icon: BrainCircuitIcon,
        title: 'Advanced Technology',
        description: 'We invest in the latest medical technology to ensure accurate diagnoses and effective treatments for all our patients.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        icon: UsersIcon,
        title: 'Expert Medical Team',
        description: 'Our team consists of highly skilled, board-certified specialists and compassionate staff dedicated to your health.',
        imageUrl: 'https://images.unsplash.com/photo-1538108144326-3c33343437d3?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        icon: HeartHandshakeIcon,
        title: 'Patient-Centered Care',
        description: 'Your comfort and well-being are our top priorities. We provide personalized care in a supportive environment.',
        imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
];

export const NAV_LINKS: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Specialties', path: '/specialties' },
    { name: 'Find a Doctor', path: '/find-a-doctor' },
    { name: 'Patient Portal', path: '/patient-portal' },
    { name: 'Health Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Donate', path: '/donate' },
    { name: 'Contact', path: '/contact' },
];

export const SPECIALTIES_DATA: Specialty[] = [
    // Core Medical & Surgical
    {
        name: 'Emergency Room (ER)',
        description: '24/7 state-of-the-art emergency and trauma care, prepared to handle critical conditions with rapid response teams and advanced life support.',
        icon: HeartPulseIcon,
        services: ['Level II Trauma Center', '24/7 Emergency Physician Coverage', 'Stroke and Cardiac Emergency Care', 'Ambulance Services'],
        imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a5f0b3c4d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        category: 'Core Medical & Surgical',
    },
    {
        name: 'Medical & Surgical Services',
        description: 'A comprehensive range of surgical procedures in modern operating suites, supported by dedicated intensive care (ICU) and recovery units.',
        icon: StethoscopeIcon,
        services: ['General & Minimally Invasive Surgery', 'Intensive Care Unit (ICU)', 'Post-Anesthesia Care Unit (PACU)', 'Inpatient Medical Units'],
        imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        category: 'Core Medical & Surgical',
    },
    {
        name: 'Obstetrics & Gynecology',
        description: 'Comprehensive care for women at all stages of life, from maternity services to specialized gynecological treatments.',
        icon: BabyIcon,
        services: ['Maternity Care', 'Labor & Delivery', 'Gynecological Surgery', 'Family Planning'],
        imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        category: 'Core Medical & Surgical',
    },
    {
        name: 'Pediatrics',
        description: 'Specialized and compassionate care for infants, children, and adolescents, focusing on their unique health and wellness needs.',
        icon: BabyIcon,
        services: ['Well-Child Visits', 'Immunizations', 'Adolescent Medicine', 'Pediatric Emergency Care'],
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        category: 'Core Medical & Surgical',
    },
    {
        name: 'Orthopedics',
        description: 'Specialized care for musculoskeletal conditions, including joint replacement, sports injuries, and trauma surgery.',
        icon: BoneIcon,
        services: ['Joint Replacement', 'Sports Medicine', 'Spine Surgery', 'Trauma & Fracture Care'],
        imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        category: 'Core Medical & Surgical',
    },
    {
        name: 'Cardiovascular & Diabetes Care',
        description: 'Integrated care for heart conditions and diabetes management, focusing on prevention, advanced diagnostics, and personalized treatment plans.',
        icon: HeartPulseIcon,
        services: ['Interventional Cardiology', 'Diabetic Health Management', 'Heart Failure Clinics', 'Echocardiography'],
        imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        category: 'Core Medical & Surgical',
    },
    {
        name: 'Outpatient Services',
        description: 'Convenient access to a variety of diagnostic and therapeutic services that do not require an overnight hospital stay.',
        icon: UsersIcon,
        services: ['Same-Day Minor Procedures', 'Diagnostic Imaging (X-Ray, CT)', 'Laboratory Services', 'Specialist Consultations'],
        imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        category: 'Core Medical & Surgical',
    },

    // Diagnostic & Therapeutic
    {
        name: 'Diagnostic Imaging & Radiology',
        description: 'Advanced imaging services providing detailed insights for accurate diagnosis, including MRI, CT scans, Ultrasound, and X-rays.',
        icon: BrainCircuitIcon,
        services: ['Magnetic Resonance Imaging (MRI)', 'Computed Tomography (CT)', 'Ultrasound', 'Digital X-ray'],
        imageUrl: 'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        category: 'Diagnostic & Therapeutic',
    },
    {
        name: 'Laboratory Services',
        description: 'Comprehensive lab testing to support diagnosis and treatment, from routine blood work to complex pathological analysis.',
        icon: MicroscopeIcon,
        services: ['Clinical Pathology', 'Hematology', 'Microbiology', 'Blood Bank'],
        imageUrl: 'https://images.unsplash.com/photo-1581091226033-d5c48150db51?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        category: 'Diagnostic & Therapeutic',
    },
    {
        name: 'Pharmacy Services',
        description: 'Inpatient and outpatient pharmacy services ensuring safe, effective medication management for all patients.',
        icon: PillIcon,
        services: ['Inpatient Medication Dispensing', 'Outpatient Prescriptions', 'Medication Therapy Management', 'Pharmaceutical Counseling'],
        imageUrl: 'https://images.unsplash.com/photo-1584125919221-62ce3b815fad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        category: 'Diagnostic & Therapeutic',
    },
    {
        name: 'Rehabilitation Center',
        description: 'A dedicated center to help patients recover function and mobility through physical, occupational, and speech therapy.',
        icon: HeartHandshakeIcon,
        services: ['Physical Therapy (PT)', 'Occupational Therapy (OT)', 'Speech Pathology (SP)', 'Post-Surgical Rehabilitation'],
        imageUrl: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        category: 'Diagnostic & Therapeutic',
    },

    // Specialized Care Centers
    {
        name: 'Neurology',
        description: 'Expert diagnosis and treatment for disorders of the brain, spinal cord, and nervous system, provided by a team of highly skilled neurologists.',
        icon: BrainCircuitIcon,
        services: ['Stroke Care', 'Epilepsy Management', 'Headache & Migraine Clinics', 'Neurodegenerative Disorders'],
        imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        category: 'Specialized Care Centers',
    },
    {
        name: 'Oncology',
        description: 'Compassionate, multidisciplinary cancer care, offering the latest treatments including chemotherapy, radiation therapy, and immunotherapy.',
        icon: PillIcon,
        services: ['Medical Oncology', 'Radiation Oncology', 'Surgical Oncology', 'Patient Support Services'],
        imageUrl: 'https://images.unsplash.com/photo-1516152685146-8a2a1d0a7f8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
        category: 'Specialized Care Centers',
    },
];


export const DOCTORS_DATA: Doctor[] = [
    {
        name: 'Dr. Amina Okoro',
        specialty: 'Cardiovascular & Diabetes Care',
        imageUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        bio: 'Dr. Okoro is a leading cardiologist with over 15 years of experience in treating complex heart conditions. She is a pioneer in minimally invasive cardiac procedures in Nigeria.'
    },
    {
        name: 'Dr. Ben Carter',
        specialty: 'Orthopedics',
        imageUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        bio: 'Specializing in sports medicine and joint replacement, Dr. Carter has helped countless athletes return to their peak performance. He is renowned for his surgical precision.'
    },
    {
        name: 'Dr. Fatima Aliyu',
        specialty: 'Pediatrics',
        imageUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        bio: 'With a passion for children\'s health, Dr. Aliyu provides compassionate and comprehensive care for infants, children, and adolescents. She is an advocate for community health initiatives.'
    },
    {
        name: 'Dr. John Adeleke',
        specialty: 'Neurology',
        imageUrl: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        bio: 'Dr. Adeleke is an expert in diagnosing and treating disorders of the nervous system. His research in neurodegenerative diseases is internationally recognized.'
    }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
    {
        quote: "The care I received at Newark Hospital was second to none. The doctors were brilliant, and the technology felt like something from the future. I felt safe and cared for.",
        name: "Mrs. Chioma Nwosu",
        relation: "Patient"
    },
    {
        quote: "As a visiting specialist, I was incredibly impressed with the facilities and the dedication of the local staff. This hospital is a beacon of hope and a model for healthcare in Africa.",
        name: "Dr. David Chen",
        relation: "Visiting Surgeon"
    },
    {
        quote: "My son was treated in the pediatric unit, and the entire team was wonderful. They not only healed him but also supported our family through a difficult time. Thank you!",
        name: "Mr. Tunde Adebayo",
        relation: "Patient's Father"
    }
];

export const PATIENT_PORTAL_MOCK_DATA: PatientData = {
  user: {
    name: 'Jane Doe',
    patientId: 'NAH-12345',
    email: 'jane.doe@example.com',
    phone: '+234 801 234 5678',
  },
  appointments: [
    { id: 'appt004', date: '2024-09-10', doctor: 'Dr. John Adeleke', specialty: 'Neurology', reason: 'Consultation for Migraines', status: 'Upcoming' },
    { id: 'appt001', date: '2024-07-15', doctor: 'Dr. Amina Okoro', specialty: 'Cardiovascular & Diabetes Care', reason: 'Annual Check-up', status: 'Completed' },
    { id: 'appt002', date: '2024-05-20', doctor: 'Dr. Fatima Aliyu', specialty: 'Pediatrics', reason: "Child's Vaccination", status: 'Completed' },
    { id: 'appt005', date: '2024-04-25', doctor: 'Dr. Amina Okoro', specialty: 'Cardiovascular & Diabetes Care', reason: 'Follow-up', status: 'Cancelled' },
    { id: 'appt003', date: '2024-03-10', doctor: 'Dr. Ben Carter', specialty: 'Orthopedics', reason: 'Follow-up on Knee Injury', status: 'Completed' }
  ],
  testResults: [
    { 
      id: 'res001', 
      date: '2024-07-16', 
      testName: 'Complete Blood Count (CBC)', 
      value: '4.8',
      units: 'K/uL',
      normalRange: '4.0 - 10.0',
      interpretation: 'Normal',
      notes: 'White blood cell count is within the standard range, no signs of infection detected.'
    },
    { 
      id: 'res002', 
      date: '2024-07-16', 
      testName: 'Lipid Panel', 
      value: '210',
      units: 'mg/dL',
      normalRange: '< 200',
      interpretation: 'High',
      notes: 'Total cholesterol is slightly elevated. Recommend dietary consultation.'
    },
    { 
      id: 'res003', 
      date: '2024-03-11', 
      testName: 'X-Ray - Left Knee', 
      value: 'N/A',
      units: '',
      normalRange: 'N/A',
      interpretation: 'Abnormal',
      notes: 'Mild degenerative changes observed. No acute fracture or dislocation.'
    },
    {
      id: 'res004',
      date: '2024-09-11',
      testName: 'Thyroid-Stimulating Hormone (TSH)',
      interpretation: 'Pending',
    }
  ],
  prescriptions: [
    { id: 'rx001', medication: 'Lisinopril', dosage: '10mg', refillsLeft: 2, lastFilled: '2024-07-01' },
    { id: 'rx002', medication: 'Atorvastatin', dosage: '20mg', refillsLeft: 1, lastFilled: '2024-07-01' },
    { id: 'rx003', medication: 'Metformin', dosage: '500mg', refillsLeft: 0, lastFilled: '2024-06-15' },
  ],
  messages: [
    {
      id: 'msg001',
      sender: 'Care Team',
      subject: 'Re: Your recent test results',
      body: 'Hello Jane, Dr. Okoro has reviewed your recent lipid panel results. While your cholesterol is slightly elevated, it is not a major concern at this time. We recommend scheduling a follow-up consultation to discuss dietary adjustments. You can book an appointment through the portal or by calling our office. Best, Newark Cardiology Team.',
      timestamp: '2024-07-18',
      status: 'unread',
    },
    {
      id: 'msg002',
      sender: 'Patient',
      subject: 'Question about medication',
      body: 'Hello, I have a quick question about the Lisinopril I was prescribed. Are there any side effects I should be aware of? Thank you.',
      timestamp: '2024-07-05',
      status: 'read',
    },
    {
      id: 'msg003',
      sender: 'Care Team',
      subject: 'Re: Question about medication',
      body: 'Hi Jane, common side effects of Lisinopril can include a dry cough, dizziness, or headache. If you experience any severe or persistent side effects, please contact us immediately. Otherwise, it is generally well-tolerated. Thank you, Pharmacy Team.',
      timestamp: '2024-07-06',
      status: 'read',
    }
  ]
};

export const HEALTH_ARTICLES_DATA: HealthArticle[] = [
    {
        title: "Understanding and Managing High Blood Pressure",
        category: "Cardiology",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        excerpt: "High blood pressure is a common condition that can lead to serious health problems. Learn about its causes, risks, and how to manage it through lifestyle changes and medication.",
        path: "#"
    },
    {
        title: "The Importance of Childhood Vaccinations",
        category: "Pediatrics",
        imageUrl: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        excerpt: "Vaccinations are crucial for protecting children from a variety of serious diseases. Understand how they work and the recommended immunization schedule.",
        path: "#"
    },
    {
        title: "Recognizing the Early Signs of a Stroke",
        category: "Neurology",
        imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        excerpt: "A stroke is a medical emergency where every second counts. Learn the F.A.S.T. warning signs to help you identify a stroke and take immediate action.",
        path: "#"
    },
    {
        title: "Nutrition Tips for a Healthy Pregnancy",
        category: "Obstetrics",
        imageUrl: "https://images.unsplash.com/photo-1591348278998-0d23a9d4a3cc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        excerpt: "Proper nutrition during pregnancy is vital for the health of both mother and baby. Discover essential nutrients, foods to eat, and what to avoid.",
        path: "#"
    }
];