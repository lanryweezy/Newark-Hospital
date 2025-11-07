import React, { useState, useRef, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import { CheckCircleIcon, VideoIcon, XIcon, CalendarIcon, ShareIcon } from '../components/IconComponents';
import { SPECIALTIES_DATA, DOCTORS_DATA } from '../constants';
import { Doctor } from '../types';
import AnimatedBlock from '../components/AnimatedBlock';

const benefits = [
    {
        title: "Ultimate Convenience",
        description: "Consult with our specialists from the comfort and privacy of your home or office, saving travel time and hassle."
    },
    {
        title: "Access to Specialists",
        description: "Easily connect with a wide range of medical experts without geographical limitations."
    },
    {
        title: "Enhanced Safety",
        description: "Reduce your exposure to potential infections by avoiding crowded waiting rooms, especially for routine follow-ups."
    },
    {
        title: "Time-Saving",
        description: "No more long commutes or waiting room delays. Virtual appointments are efficient and fit into your busy schedule."
    }
];


const Telemedicine: React.FC = () => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [isCameraLoading, setIsCameraLoading] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Booking form state
    const [bookingStep, setBookingStep] = useState<'form' | 'success'>('form');
    const [patientName, setPatientName] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [selectedSpecialty, setSelectedSpecialty] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [preferredDate, setPreferredDate] = useState('');
    const [visitReason, setVisitReason] = useState('');
    const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    
    // Share button state
    const [shareText, setShareText] = useState('Share Page');


    useEffect(() => {
        if (selectedSpecialty) {
            const doctorsInSpecialty = DOCTORS_DATA.filter(doc => doc.specialty === selectedSpecialty);
            setAvailableDoctors(doctorsInSpecialty);
            setSelectedDoctor(''); // Reset doctor selection when specialty changes
        } else {
            setAvailableDoctors([]);
            setSelectedDoctor('');
        }
    }, [selectedSpecialty]);

    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};

        if (!patientName.trim()) newErrors.patientName = "Full Name is required.";
        
        if (!patientEmail.trim()) {
            newErrors.patientEmail = "Email Address is required.";
        } else if (!/\S+@\S+\.\S+/.test(patientEmail)) {
            newErrors.patientEmail = "Please enter a valid email address.";
        }

        if (!selectedSpecialty) newErrors.selectedSpecialty = "Please select a specialty.";
        
        if (!selectedDoctor) newErrors.selectedDoctor = "Please select a doctor.";

        if (!preferredDate) {
            newErrors.preferredDate = "Please select a preferred date.";
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Normalize today's date to midnight
            const selectedDate = new Date(preferredDate + 'T00:00:00');
            if (selectedDate < today) {
                newErrors.preferredDate = "Please select a date that is not in the past.";
            }
        }

        if (!visitReason.trim()) newErrors.visitReason = "Reason for Visit is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // In a real application, this would send data to a backend.
            console.log("Booking Request:", { patientName, patientEmail, selectedSpecialty, selectedDoctor, preferredDate, visitReason });
            setBookingStep('success');
        }
    };

    const resetBookingForm = () => {
        setPatientName('');
        setPatientEmail('');
        setSelectedSpecialty('');
        setSelectedDoctor('');
        setPreferredDate('');
        setVisitReason('');
        setBookingStep('form');
        setErrors({});
    };

    const handleShare = async () => {
        const shareData = {
            title: "Telemedicine at Newark Hospital",
            text: "Check out the convenient telemedicine services offered by Newark Hospital.",
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Share failed:', err);
            }
        } else {
            // Fallback for browsers that don't support the Web Share API
            try {
                await navigator.clipboard.writeText(window.location.href);
                setShareText('Link Copied!');
                setTimeout(() => {
                    setShareText('Share Page');
                }, 2000);
            } catch (err) {
                console.error('Failed to copy link:', err);
                alert('Failed to copy link to clipboard.');
            }
        }
    };


    const startCamera = async () => {
        setIsCameraLoading(true);
        setCameraError(null);
        try {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setIsCameraOn(true);
                }
            } else {
                setCameraError("Your browser does not support video calls.");
            }
        } catch (err) {
            console.error("Error accessing camera:", err);
            setCameraError("Camera access was denied. Please enable camera permissions in your browser settings.");
        }
        setIsCameraLoading(false);
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setIsCameraOn(false);
    };

    return (
        <PageWrapper
            title="Telemedicine / Virtual Care"
            subtitle="Consult with our expert doctors from the comfort of your home. Quality care is just a click away."
        >
            {/* Top Section */}
            <AnimatedBlock className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center reveal">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Convenient & Secure Virtual Consultations</h2>
                    <p className="text-gray-600 mb-6">
                        Newark Hospital's telemedicine service provides a secure and easy way to connect with our specialists. Whether it's for a follow-up, a minor illness, or a second opinion, our virtual care platform is designed for your convenience.
                    </p>
                    <div className="space-y-4">
                         <div className="flex items-start">
                            <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                            <p className="text-gray-700"><span className="font-semibold">Secure Platform:</span> Your consultation is private and confidential, using encrypted video technology.</p>
                        </div>
                         <div className="flex items-start">
                            <CheckCircleIcon className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                            <p className="text-gray-700"><span className="font-semibold">Comprehensive Care:</span> Receive diagnoses, treatment plans, and e-prescriptions directly from your doctor.</p>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                        <a href="#book-virtual" className="w-full sm:w-auto bg-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 active:scale-95 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary">
                            Book a Virtual Consultation
                        </a>
                        <button 
                            onClick={handleShare}
                            className="w-full sm:w-auto flex items-center justify-center bg-transparent border-2 border-primary-light text-primary-light font-bold py-2.5 px-8 rounded-full hover:bg-primary-light hover:text-white transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
                            aria-label="Share this page"
                        >
                            <ShareIcon className="h-5 w-5 mr-2" />
                            {shareText}
                        </button>
                    </div>
                </div>
                <div>
                    <img
                        src="https://picsum.photos/seed/telemedicine/800/700"
                        alt="Doctor on a video call with a patient"
                        className="rounded-lg shadow-2xl w-full h-auto object-cover"
                    />
                </div>
            </AnimatedBlock>
            
            {/* Booking Section */}
            <AnimatedBlock as="section" id="book-virtual" className="mt-16 md:mt-24 scroll-mt-20 reveal">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl">
                    {bookingStep === 'success' ? (
                        <div className="text-center animate-fade-in-up">
                            <div className="flex justify-center items-center mb-4">
                                <div className="bg-green-100 p-4 rounded-full">
                                    <CheckCircleIcon className="h-12 w-12 text-green-600" />
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-primary mb-4">Appointment Requested!</h2>
                            <p className="text-gray-600 mb-6">
                                Thank you, {patientName}. Your request for a virtual consultation has been received.
                            </p>
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 my-6 text-left shadow-inner">
                                <h3 className="font-bold text-lg text-primary mb-4 border-b pb-2">Your Request Summary</h3>
                                <div className="space-y-3 text-gray-700">
                                    <p><strong>Doctor:</strong> {selectedDoctor}</p>
                                    <p><strong>Preferred Date:</strong> {new Date(preferredDate + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <p><strong>Reason for Visit:</strong></p>
                                    <p className="pl-4 italic text-gray-600">"{visitReason}"</p>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-8">
                                Our scheduling team will contact you at <span className="font-semibold">{patientEmail}</span> within 24 hours to confirm your final appointment details.
                            </p>
                            <button onClick={resetBookingForm} className="bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary-light transition-colors active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-light">
                                Book Another Appointment
                            </button>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 text-center">Book a Virtual Consultation</h2>
                            <p className="text-gray-600 mb-8 text-center">Fill out the form below to request your virtual appointment.</p>
                            <form onSubmit={handleBookingSubmit} className="space-y-6" noValidate>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input type="text" id="patientName" value={patientName} onChange={e => setPatientName(e.target.value)} required aria-invalid={!!errors.patientName} aria-describedby="patientName-error" className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light ${errors.patientName ? 'border-red-500' : 'border-gray-300'}`} />
                                        {errors.patientName && <p id="patientName-error" className="mt-2 text-sm text-red-600" role="alert">{errors.patientName}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="patientEmail" className="block text-sm font-medium text-gray-700">Email Address</label>
                                        <input type="email" id="patientEmail" value={patientEmail} onChange={e => setPatientEmail(e.target.value)} required aria-invalid={!!errors.patientEmail} aria-describedby="patientEmail-error" className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light ${errors.patientEmail ? 'border-red-500' : 'border-gray-300'}`} />
                                        {errors.patientEmail && <p id="patientEmail-error" className="mt-2 text-sm text-red-600" role="alert">{errors.patientEmail}</p>}
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Select Specialty</label>
                                        <select id="specialty" value={selectedSpecialty} onChange={e => setSelectedSpecialty(e.target.value)} required aria-invalid={!!errors.selectedSpecialty} aria-describedby="specialty-error" className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light bg-white ${errors.selectedSpecialty ? 'border-red-500' : 'border-gray-300'}`}>
                                            <option value="" disabled>Choose a specialty...</option>
                                            {SPECIALTIES_DATA.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                                        </select>
                                        {errors.selectedSpecialty && <p id="specialty-error" className="mt-2 text-sm text-red-600" role="alert">{errors.selectedSpecialty}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Select Doctor</label>
                                        <select id="doctor" value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)} required disabled={!selectedSpecialty || availableDoctors.length === 0} aria-invalid={!!errors.selectedDoctor} aria-describedby="doctor-error" className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light bg-white disabled:bg-gray-100 ${errors.selectedDoctor ? 'border-red-500' : 'border-gray-300'}`}>
                                            <option value="" disabled>
                                                {selectedSpecialty ? 'Choose a doctor...' : 'Select specialty first'}
                                            </option>
                                            {availableDoctors.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                                        </select>
                                        {errors.selectedDoctor && <p id="doctor-error" className="mt-2 text-sm text-red-600" role="alert">{errors.selectedDoctor}</p>}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700">Preferred Date</label>
                                    <input type="date" id="preferredDate" value={preferredDate} onChange={e => setPreferredDate(e.target.value)} required min={new Date().toISOString().split("T")[0]} aria-invalid={!!errors.preferredDate} aria-describedby="date-error" className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light ${errors.preferredDate ? 'border-red-500' : 'border-gray-300'}`} />
                                    {errors.preferredDate && <p id="date-error" className="mt-2 text-sm text-red-600" role="alert">{errors.preferredDate}</p>}
                                </div>
                                <div>
                                    <label htmlFor="visitReason" className="block text-sm font-medium text-gray-700">Reason for Visit</label>
                                    <textarea id="visitReason" rows={4} value={visitReason} onChange={e => setVisitReason(e.target.value)} required aria-invalid={!!errors.visitReason} aria-describedby="reason-error" className={`mt-1 block w-full px-4 py-3 border rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light ${errors.visitReason ? 'border-red-500' : 'border-gray-300'}`} placeholder="Briefly describe your symptoms or reason for the consultation."></textarea>
                                    {errors.visitReason && <p id="reason-error" className="mt-2 text-sm text-red-600" role="alert">{errors.visitReason}</p>}
                                </div>
                                <div>
                                    <button type="submit" className="w-full flex items-center justify-center bg-secondary text-white font-bold py-3 px-6 rounded-full hover:bg-secondary/90 transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary">
                                        <CalendarIcon className="h-5 w-5 mr-3" />
                                        Request Appointment
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </AnimatedBlock>

            {/* Benefits Section */}
            <AnimatedBlock className="mt-16 md:mt-24 reveal">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">Benefits of Virtual Care</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                        Discover the advantages of choosing a telemedicine consultation for your healthcare needs.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {benefits.map((benefit, index) => (
                        <AnimatedBlock key={index} className="reveal" style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}>
                            <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full">
                                <CheckCircleIcon className="h-8 w-8 text-secondary flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-primary">{benefit.title}</h3>
                                    <p className="mt-1 text-gray-600">{benefit.description}</p>
                                </div>
                            </div>
                        </AnimatedBlock>
                    ))}
                </div>
            </AnimatedBlock>
            
            {/* Video Call Section */}
            <AnimatedBlock className="mt-16 md:mt-24 max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl text-center reveal">
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Have an Appointment? Join Here.</h2>
                <p className="text-gray-600 mb-8">
                    Ready to connect with a doctor? Click the button below to start your secure video call. Please ensure you have a stable internet connection and are in a private, well-lit area.
                </p>

                <div className="w-full aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center overflow-hidden relative">
                    <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover transition-opacity ${isCameraOn ? 'opacity-100' : 'opacity-0'}`} />
                    {!isCameraOn && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                            <VideoIcon className="h-16 w-16 mb-4" />
                            <p>Your video will appear here</p>
                        </div>
                    )}
                </div>
                
                {cameraError && <p className="text-red-500 text-sm mb-4">{cameraError}</p>}

                {!isCameraOn ? (
                    <button 
                        onClick={startCamera} 
                        disabled={isCameraLoading}
                        className="flex items-center justify-center w-full sm:w-auto mx-auto bg-secondary text-white font-bold py-3 px-8 rounded-full hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 active:scale-95 inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary disabled:bg-gray-400"
                    >
                         {isCameraLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Starting Camera...
                            </>
                        ) : (
                            <>
                                <VideoIcon className="h-6 w-6 mr-3"/>
                                Start Video Call
                            </>
                        )}
                    </button>
                ) : (
                    <button onClick={stopCamera} className="flex items-center justify-center w-full sm:w-auto mx-auto bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary-light transition-colors duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary">
                        <XIcon className="h-6 w-6 mr-3" />
                        Stop Camera
                    </button>
                )}
            </AnimatedBlock>
        </PageWrapper>
    );
};

export default Telemedicine;