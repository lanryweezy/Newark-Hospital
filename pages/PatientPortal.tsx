
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { PATIENT_PORTAL_MOCK_DATA, SPECIALTIES_DATA, DOCTORS_DATA } from '../constants';
import type { PatientData, TestResult, Doctor } from '../types';
import { CalendarIcon, LogOutIcon, PillIcon, XIcon, CheckCircleIcon, UserDoctorIcon, BeakerIcon, ChevronDownIcon, BellIcon, MailIcon, MessageSquareIcon, InboxIcon, SendIcon, CalendarPlusIcon, ClockIcon, StethoscopeIcon, SymptomCheckerIcon, CreditCardIcon, VideoIcon } from '../components/IconComponents';

const TIME_SLOTS = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
];

const PatientPortal: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<PatientData | null>(null);
    const [isRefillModalOpen, setIsRefillModalOpen] = useState(false);
    const [isComposeModalOpen, setIsComposeModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    
    // Form state
    const [medication, setMedication] = useState('');
    const [refillStatus, setRefillStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [composeSubject, setComposeSubject] = useState('');
    const [composeBody, setComposeBody] = useState('');
    const [composeStatus, setComposeStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    
    // Booking Form State
    const [bookingForm, setBookingForm] = useState({ specialty: '', doctor: '', date: '', time: '', reason: '' });
    const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
    const [bookingErrors, setBookingErrors] = useState<{ [key: string]: string }>({});
    const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success'>('idle');


    // UI state
    const [expandedResultId, setExpandedResultId] = useState<string | null>(null);
    const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);
    const [notificationPrefs, setNotificationPrefs] = useState({ email: true, sms: false });
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

    // Error handling state
    const [loginError, setLoginError] = useState<string | null>(null);
    const [portalError, setPortalError] = useState<string | null>(null);

    const location = useLocation();

    const updateUnreadCount = (data: PatientData) => {
        const count = data.messages.filter(m => m.status === 'unread').length;
        localStorage.setItem('unreadMessagesCount', count.toString());
        window.dispatchEvent(new Event('messageCountUpdated'));
    };

    useEffect(() => {
        try {
            const storedData = localStorage.getItem('patientPortalData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                setUserData(parsedData);
                setIsLoggedIn(true);
                updateUnreadCount(parsedData);
            } else {
                 localStorage.setItem('unreadMessagesCount', '0');
                 window.dispatchEvent(new Event('messageCountUpdated'));
            }
        } catch (error) {
            console.error("Failed to parse patient data from localStorage", error);
            setLoginError("There was an issue loading your session. Stored data might be corrupt. Please log in again.");
            localStorage.removeItem('patientPortalData');
            localStorage.setItem('unreadMessagesCount', '0');
            window.dispatchEvent(new Event('messageCountUpdated'));
        }
    }, []);

    useEffect(() => {
        if (bookingForm.specialty) {
            const doctorsInSpecialty = DOCTORS_DATA.filter(doc => doc.specialty === bookingForm.specialty);
            setAvailableDoctors(doctorsInSpecialty);
            // Only reset doctor if the current doctor is not in the list for the new specialty.
            // This allows pre-population from URL to work correctly.
            if (bookingForm.doctor && !doctorsInSpecialty.some(d => d.name === bookingForm.doctor)) {
                setBookingForm(prev => ({ ...prev, doctor: '' }));
            }
        } else {
            setAvailableDoctors([]);
        }
    }, [bookingForm.specialty, bookingForm.doctor]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError(null);
        setPortalError(null);
        try {
            localStorage.setItem('patientPortalData', JSON.stringify(PATIENT_PORTAL_MOCK_DATA));
            setUserData(PATIENT_PORTAL_MOCK_DATA);
            setIsLoggedIn(true);
            updateUnreadCount(PATIENT_PORTAL_MOCK_DATA);
        } catch (error) {
            console.error("Failed to save patient data to localStorage on login", error);
            setLoginError("Could not log you in. Your browser's storage might be full or disabled.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('patientPortalData');
        localStorage.setItem('unreadMessagesCount', '0');
        window.dispatchEvent(new Event('messageCountUpdated'));
        setUserData(null);
        setIsLoggedIn(false);
    };

    const closeRefillModal = () => {
        setIsRefillModalOpen(false);
        setTimeout(() => {
            setMedication('');
            setRefillStatus('idle');
        }, 300);
    };
    
    const closeComposeModal = () => {
        setIsComposeModalOpen(false);
        setTimeout(() => {
            setComposeSubject('');
            setComposeBody('');
            setComposeStatus('idle');
        }, 300);
    };

    const closeBookingModal = () => {
        setIsBookingModalOpen(false);
        setTimeout(() => {
            setBookingForm({ specialty: '', doctor: '', date: '', time: '', reason: '' });
            setBookingErrors({});
            setBookingStatus('idle');
        }, 300);
    };

    const handleRefillSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setRefillStatus('submitting');
        setTimeout(() => {
            setRefillStatus('success');
            setTimeout(closeRefillModal, 2000);
        }, 1500);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userData) return;
        setComposeStatus('submitting');
        setPortalError(null);
        
        const newMessage = {
            id: `msg${Date.now()}`,
            sender: 'Patient' as const,
            subject: composeSubject,
            body: composeBody,
            timestamp: new Date().toISOString().split('T')[0],
            status: 'read' as const, // Sent messages are 'read' by the patient
        };

        const updatedData = {
            ...userData,
            messages: [newMessage, ...userData.messages],
        };

        setTimeout(() => {
            try {
                localStorage.setItem('patientPortalData', JSON.stringify(updatedData));
                setUserData(updatedData);
                setComposeStatus('success');
                setTimeout(closeComposeModal, 2000);
            } catch (error) {
                console.error("Failed to save message to localStorage:", error);
                setComposeStatus('idle');
                closeComposeModal();
                setPortalError("Could not save your message. Your browser's storage might be full or disabled. Please try again.");
            }
        }, 1500);
    };

    const validateBookingForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!bookingForm.specialty) newErrors.specialty = "Please select a specialty.";
        if (!bookingForm.doctor) newErrors.doctor = "Please select a doctor.";
        if (!bookingForm.date) {
            newErrors.date = "Please select a date.";
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (new Date(bookingForm.date) < today) {
                newErrors.date = "Please select a date that is not in the past.";
            }
        }
        if (!bookingForm.time) newErrors.time = "Please select a time.";
        if (!bookingForm.reason.trim()) newErrors.reason = "Please provide a reason for your visit.";

        setBookingErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userData || !validateBookingForm()) return;

        setBookingStatus('submitting');
        setPortalError(null);

        const newAppointment = {
            id: `appt${Date.now()}`,
            date: `${bookingForm.date} at ${bookingForm.time}`,
            doctor: bookingForm.doctor,
            specialty: bookingForm.specialty,
            reason: bookingForm.reason,
            status: 'Upcoming' as const,
        };

        const updatedData = {
            ...userData,
            appointments: [newAppointment, ...userData.appointments],
        };

        setTimeout(() => {
            try {
                localStorage.setItem('patientPortalData', JSON.stringify(updatedData));
                setUserData(updatedData);
                setBookingStatus('success');
                setTimeout(closeBookingModal, 2000);
            } catch (error) {
                console.error("Failed to save new appointment:", error);
                setBookingStatus('idle');
                setPortalError("Could not save your appointment. Your browser's storage might be full.");
            }
        }, 1500);
    };
    
    const handleToggleResult = (resultId: string) => {
        setExpandedResultId(prevId => (prevId === resultId ? null : resultId));
    };

    const handleToggleMessage = (messageId: string) => {
        const isOpening = expandedMessageId !== messageId;
        const previousExpandedId = expandedMessageId;
        setExpandedMessageId(isOpening ? messageId : null);

        if (isOpening && userData) {
            const message = userData.messages.find(m => m.id === messageId);
            if (message && message.status === 'unread') {
                const updatedMessages = userData.messages.map(m =>
                    m.id === messageId ? { ...m, status: 'read' as const } : m
                );
                const updatedData = { ...userData, messages: updatedMessages };
                
                setPortalError(null);
                try {
                    localStorage.setItem('patientPortalData', JSON.stringify(updatedData));
                    setUserData(updatedData);
                    updateUnreadCount(updatedData);
                } catch (error) {
                    console.error("Failed to update message status in localStorage:", error);
                    // Revert optimistic UI update on error
                    setExpandedMessageId(previousExpandedId);
                    setPortalError("Could not update message status. Your browser's storage might be full or disabled.");
                }
            }
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setNotificationPrefs(prev => ({ ...prev, [name]: checked }));
    };

    const handleSavePrefs = () => {
        setSaveStatus('saving');
        setTimeout(() => {
            setSaveStatus('success');
            console.log('Saved preferences:', notificationPrefs);
            setTimeout(() => setSaveStatus('idle'), 3000);
        }, 1000);
    };

    const getStatusStyles = (status: 'Completed' | 'Upcoming' | 'Cancelled') => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Upcoming': return 'bg-blue-100 text-blue-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getInterpretationStyles = (interpretation?: TestResult['interpretation']) => {
        switch (interpretation) {
            case 'Normal': return 'bg-green-100 text-green-800';
            case 'High': case 'Low': return 'bg-yellow-100 text-yellow-800';
            case 'Abnormal': return 'bg-red-100 text-red-800';
            case 'Pending': return 'bg-blue-100 text-blue-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (!isLoggedIn || !userData) {
        return (
            <PageWrapper title="Patient Portal" subtitle="Access your medical records, view test results, and manage your appointments securely online.">
                <div className="max-w-md mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl">
                    <h2 className="text-2xl font-bold text-primary text-center mb-6">Portal Login</h2>
                    {loginError && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                            <p className="font-bold">Login Error</p>
                            <p>{loginError}</p>
                        </div>
                    )}
                    <form className="space-y-6" onSubmit={handleLogin}>
                         <div>
                            <label htmlFor="email-login" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" id="email-login" defaultValue={PATIENT_PORTAL_MOCK_DATA.user.email} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light" />
                        </div>
                         <div>
                            <label htmlFor="password-login" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password-login" defaultValue="password" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light" />
                        </div>
                        <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-6 rounded-md hover:bg-primary-light transition-colors duration-300">Sign In</button>
                    </form>
                </div>
            </PageWrapper>
        );
    }
    
    const sortedAppointments = [...userData.appointments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const sortedTestResults = [...userData.testResults].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const sortedMessages = [...userData.messages].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return (
        <PageWrapper title={`Welcome, ${userData.user.name}`} subtitle={`Patient ID: ${userData.user.patientId}`}>
            <div className="max-w-7xl mx-auto">
                 {portalError && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 relative" role="alert">
                        <p className="font-bold">An Error Occurred</p>
                        <p>{portalError}</p>
                        <button onClick={() => setPortalError(null)} className="absolute top-2.5 right-2.5 p-1" aria-label="Close error message">
                            <XIcon className="h-5 w-5" />
                        </button>
                    </div>
                )}
                <div className="flex justify-end mb-8">
                    <button onClick={handleLogout} className="flex items-center bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary/90">
                        <LogOutIcon className="h-5 w-5 mr-2" />
                        Sign Out
                    </button>
                </div>

                 <div className="mb-8 bg-white p-6 rounded-lg shadow-xl border-t-4 border-secondary">
                    <h2 className="text-2xl font-bold text-primary mb-4">Patient Tools</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button onClick={() => setIsBookingModalOpen(true)} className="text-left flex items-center gap-4 p-4 bg-gray-50 hover:bg-secondary/10 border border-gray-200 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary">
                            <div className="bg-secondary/20 p-3 rounded-full">
                                <CalendarPlusIcon className="h-6 w-6 text-secondary" />
                            </div>
                            <div>
                                <p className="font-bold text-primary-light">Book an Appointment</p>
                                <p className="text-sm text-slate">Schedule a new visit from your portal.</p>
                            </div>
                        </button>
                        <Link to="/telemedicine" className="text-left flex items-center gap-4 p-4 bg-gray-50 hover:bg-yellow-100/50 border border-gray-200 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-yellow-500">
                            <div className="bg-yellow-500/20 p-3 rounded-full">
                                <VideoIcon className="h-6 w-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="font-bold text-primary-light">Virtual Care</p>
                                <p className="text-sm text-slate">Request a telemedicine appointment.</p>
                            </div>
                        </Link>
                        <Link to="/symptom-checker" className="text-left flex items-center gap-4 p-4 bg-gray-50 hover:bg-blue-100/50 border border-gray-200 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                            <div className="bg-blue-500/20 p-3 rounded-full">
                                <SymptomCheckerIcon className="h-6 w-6 text-blue-600" />
                            </div>
                             <div>
                                <p className="font-bold text-primary-light">AI Symptom Checker</p>
                                <p className="text-sm text-slate">Get a quick analysis of your symptoms.</p>
                            </div>
                        </Link>
                        <Link to="/bill-pay" className="text-left flex items-center gap-4 p-4 bg-gray-50 hover:bg-green-100/50 border border-gray-200 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500">
                            <div className="bg-green-500/20 p-3 rounded-full">
                                <CreditCardIcon className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                                <p className="font-bold text-primary-light">Pay My Bill</p>
                                <p className="text-sm text-slate">Securely pay your bills online.</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Appointment History */}
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-primary flex items-center"><CalendarIcon className="h-7 w-7 mr-3 text-primary-light"/>Appointment History</h2>
                            <button onClick={() => setIsBookingModalOpen(true)} className="flex items-center bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary/90 transition-transform hover:scale-105">
                                <CalendarPlusIcon className="h-5 w-5 mr-2" />
                                Book
                            </button>
                        </div>
                        <div className="space-y-4 max-h-[300px] sm:max-h-[350px] md:max-h-[400px] overflow-y-auto pr-2">
                            {sortedAppointments.map(appt => (
                                <div key={appt.id} className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                                    <div className="flex justify-between items-center mb-3">
                                        <p className="font-bold text-primary">{appt.date}</p>
                                        <span className={`text-xs font-bold py-1 px-3 rounded-full ${getStatusStyles(appt.status)}`}>{appt.status}</span>
                                    </div>
                                    <p className="text-lg font-semibold text-primary-lightest">{appt.specialty}</p>
                                    <p className="text-sm text-slate">With {appt.doctor}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Test Results */}
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center"><BeakerIcon className="h-7 w-7 mr-3 text-primary-light" />Test Results</h2>
                        <div className="space-y-3 max-h-[300px] sm:max-h-[350px] md:max-h-[400px] overflow-y-auto pr-2">
                            {sortedTestResults.map(result => (
                                <div key={result.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-shadow hover:shadow-lg">
                                    <button
                                        onClick={() => handleToggleResult(result.id)}
                                        className="w-full flex justify-between items-center text-left p-4 hover:bg-gray-50/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
                                        aria-expanded={expandedResultId === result.id}
                                        aria-controls={`result-details-${result.id}`}
                                    >
                                        <div className="min-w-0">
                                            <p className="font-bold text-primary text-lg truncate">{result.testName}</p>
                                            <p className="text-sm text-slate">{result.date}</p>
                                        </div>
                                        <div className="flex items-center flex-shrink-0 ml-4">
                                            <span className={`text-xs font-bold py-1 px-3 rounded-full ${getInterpretationStyles(result.interpretation)}`}>
                                                {result.interpretation}
                                            </span>
                                            <ChevronDownIcon className={`h-6 w-6 text-slate transition-transform transform ml-4 ${expandedResultId === result.id ? 'rotate-180' : ''}`} />
                                        </div>
                                    </button>
                                    <div
                                        id={`result-details-${result.id}`}
                                        className={`grid transition-all duration-500 ease-in-out ${expandedResultId === result.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/70 text-sm">
                                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                                    {result.value && (
                                                        <div>
                                                            <dt className="font-semibold text-slate">Value</dt>
                                                            <dd className="text-slate-dark">{result.value} {result.units}</dd>
                                                        </div>
                                                    )}
                                                    {result.normalRange && (
                                                        <div>
                                                            <dt className="font-semibold text-slate">Normal Range</dt>
                                                            <dd className="text-slate-dark">{result.normalRange}</dd>
                                                        </div>
                                                    )}
                                                </dl>
                                                {result.notes && (
                                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                                        <h4 className="font-semibold text-slate mb-2">Doctor's Notes</h4>
                                                        <blockquote className="border-l-4 border-secondary/50 pl-4 italic text-slate-dark bg-secondary/5 p-3 rounded-r-md">
                                                            {result.notes}
                                                        </blockquote>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* My Messages */}
                <div className="mt-8 bg-white p-6 rounded-lg shadow-xl">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                        <h2 className="text-2xl font-bold text-primary flex items-center mb-4 sm:mb-0">
                            <InboxIcon className="h-7 w-7 mr-3 text-primary-light"/>
                            My Messages
                        </h2>
                        <button onClick={() => setIsComposeModalOpen(true)} className="flex items-center bg-primary text-white font-bold py-2 px-5 rounded-md hover:bg-primary-light self-start sm:self-center">
                            Compose New Message
                        </button>
                    </div>
                     <div className="space-y-2 max-h-[300px] sm:max-h-[350px] md:max-h-[400px] overflow-y-auto pr-2">
                        {sortedMessages.map(message => {
                            const isExpanded = expandedMessageId === message.id;
                            const isUnread = message.status === 'unread';
                            return (
                                <div key={message.id} className={`rounded-lg border overflow-hidden transition-all duration-300 hover:shadow-lg ${isUnread ? 'border-secondary/50' : 'border-gray-200'}`}>
                                    <button onClick={() => handleToggleMessage(message.id)} className={`w-full text-left p-4 transition-colors hover:bg-gray-50/50 ${isUnread ? 'bg-secondary/5' : ''}`}>
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex items-start min-w-0 flex-1">
                                                {isUnread && <div className="w-2.5 h-2.5 bg-secondary rounded-full mr-3 mt-1.5 flex-shrink-0"></div>}
                                                <div className="min-w-0 flex-1">
                                                    <p className={`font-bold text-lg truncate ${isUnread ? 'text-secondary' : 'text-primary-lightest'}`}>{message.subject}</p>
                                                    <p className="text-sm text-gray-500">From: {message.sender} on {message.timestamp}</p>
                                                </div>
                                            </div>
                                            <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform transform flex-shrink-0 mt-1 ${isExpanded ? 'rotate-180' : ''}`} />
                                        </div>
                                    </button>
                                     <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                        <div className="overflow-hidden">
                                            <div className="p-6 border-t border-gray-200 bg-gray-50/50 text-slate-dark whitespace-pre-wrap">{message.body}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* My Prescriptions & Notification Settings */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                         <h2 className="text-2xl font-bold text-primary flex items-center mb-4"><PillIcon className="h-7 w-7 mr-3 text-primary-light"/>My Prescriptions</h2>
                         {/* Prescription List could go here */}
                         <button onClick={() => setIsRefillModalOpen(true)} className="mt-4 flex items-center bg-primary text-white font-bold py-2 px-5 rounded-md hover:bg-primary-light">Request a Refill</button>
                    </div>
                    
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center"><BellIcon className="h-7 w-7 mr-3 text-primary-light" />Notification Settings</h2>
                        <div className="space-y-3">
                            <label className="flex items-center">
                                <input type="checkbox" name="email" checked={notificationPrefs.email} onChange={handleCheckboxChange} className="h-5 w-5 rounded border-gray-300 text-secondary focus:ring-secondary" />
                                <span className="ml-3 text-slate-dark">Email Notifications</span>
                            </label>
                            <label className="flex items-center">
                                <input type="checkbox" name="sms" checked={notificationPrefs.sms} onChange={handleCheckboxChange} className="h-5 w-5 rounded border-gray-300 text-secondary focus:ring-secondary" />
                                <span className="ml-3 text-slate-dark">SMS Alerts</span>
                            </label>
                        </div>
                        <button onClick={handleSavePrefs} disabled={saveStatus !== 'idle'} className="mt-6 bg-primary text-white font-bold py-2 px-5 rounded-md hover:bg-primary-light disabled:bg-gray-400">
                             {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'success' ? 'Saved!' : 'Save Preferences'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {isBookingModalOpen && (
                 <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg relative animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
                        <button onClick={closeBookingModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 p-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light" aria-label="Close booking form">
                            <XIcon className="h-6 w-6" />
                        </button>
                        {bookingStatus === 'success' ? (
                            <div className="p-8 text-center">
                                <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                <h3 id="booking-modal-title" className="text-2xl font-bold text-primary">Appointment Requested!</h3>
                                <p className="mt-2 text-slate">Your appointment has been added to your history.</p>
                            </div>
                        ) : (
                            <>
                                <div className="p-6 border-b">
                                    <h3 id="booking-modal-title" className="text-xl font-bold text-primary">Book a New Appointment</h3>
                                </div>
                                <form className="p-6 space-y-4" onSubmit={handleBookingSubmit} noValidate>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Specialty</label>
                                            <div className="relative mt-1">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <StethoscopeIcon className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <select id="specialty" value={bookingForm.specialty} onChange={e => setBookingForm(prev => ({...prev, specialty: e.target.value}))} required className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light ${bookingErrors.specialty ? 'border-red-500' : 'border-gray-300'}`}>
                                                    <option value="" disabled>Select...</option>
                                                    {SPECIALTIES_DATA.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                                </div>
                                            </div>
                                            {bookingErrors.specialty && <p className="mt-1 text-sm text-red-600">{bookingErrors.specialty}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor</label>
                                            <div className="relative mt-1">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <UserDoctorIcon className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <select id="doctor" value={bookingForm.doctor} onChange={e => setBookingForm(prev => ({...prev, doctor: e.target.value}))} required disabled={!bookingForm.specialty} className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-light ${bookingErrors.doctor ? 'border-red-500' : 'border-gray-300'}`}>
                                                    <option value="" disabled>Select...</option>
                                                    {availableDoctors.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                                </div>
                                            </div>
                                            {bookingErrors.doctor && <p className="mt-1 text-sm text-red-600">{bookingErrors.doctor}</p>}
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                                            <div className="relative mt-1">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                                                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <input type="date" id="date" value={bookingForm.date} onChange={e => setBookingForm(prev => ({...prev, date: e.target.value}))} required min={new Date().toISOString().split("T")[0]} className={`relative block w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light ${bookingErrors.date ? 'border-red-500' : 'border-gray-300'}`} />
                                            </div>
                                            {bookingErrors.date && <p className="mt-1 text-sm text-red-600">{bookingErrors.date}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                                            <div className="relative mt-1">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <ClockIcon className="h-5 w-5 text-gray-400" />
                                                </div>
                                                <select id="time" value={bookingForm.time} onChange={e => setBookingForm(prev => ({...prev, time: e.target.value}))} required className={`appearance-none block w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light ${bookingErrors.time ? 'border-red-500' : 'border-gray-300'}`}>
                                                    <option value="" disabled>Select...</option>
                                                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                                </div>
                                            </div>
                                            {bookingErrors.time && <p className="mt-1 text-sm text-red-600">{bookingErrors.time}</p>}
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Visit</label>
                                        <textarea id="reason" rows={3} value={bookingForm.reason} onChange={e => setBookingForm(prev => ({...prev, reason: e.target.value}))} required placeholder="Briefly describe your symptoms or reason for the visit..." className={`mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light ${bookingErrors.reason ? 'border-red-500' : 'border-gray-300'}`}></textarea>
                                        {bookingErrors.reason && <p className="mt-1 text-sm text-red-600">{bookingErrors.reason}</p>}
                                    </div>
                                    <div className="pt-2 flex justify-end gap-3">
                                        <button type="button" onClick={closeBookingModal} className="bg-gray-200 text-gray-800 font-bold py-2 px-5 rounded-md hover:bg-gray-300">Cancel</button>
                                        <button type="submit" disabled={bookingStatus === 'submitting'} className="bg-secondary text-white font-bold py-2 px-5 rounded-md hover:bg-secondary/90 disabled:bg-gray-400">
                                            {bookingStatus === 'submitting' ? 'Submitting...' : 'Request Appointment'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Compose Modal */}
            {isComposeModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg relative">
                         <button onClick={closeComposeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
                             <XIcon className="h-6 w-6" />
                        </button>
                        {composeStatus === 'success' ? (
                            <div className="p-8 text-center"><CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" /><h3 className="text-2xl font-bold text-primary">Message Sent!</h3></div>
                        ) : (
                            <>
                                <div className="p-6 border-b"><h3 className="text-xl font-bold text-primary">Compose New Message</h3></div>
                                <form className="p-6 space-y-4" onSubmit={handleSendMessage}>
                                    <div>
                                        <label htmlFor="composeSubject" className="block text-sm font-medium text-gray-700">Subject</label>
                                        <input type="text" id="composeSubject" value={composeSubject} onChange={(e) => setComposeSubject(e.target.value)} required className="mt-1 block w-full px-4 py-2 border rounded-md" />
                                    </div>
                                    <div>
                                        <label htmlFor="composeBody" className="block text-sm font-medium text-gray-700">Message</label>
                                        <textarea id="composeBody" rows={5} value={composeBody} onChange={(e) => setComposeBody(e.target.value)} required className="mt-1 block w-full px-4 py-2 border rounded-md"></textarea>
                                    </div>
                                    <div className="pt-2">
                                        <button type="submit" disabled={composeStatus === 'submitting'} className="w-full bg-secondary text-white font-bold py-3 px-6 rounded-md hover:bg-secondary/90 disabled:bg-gray-400 flex items-center justify-center">
                                            {composeStatus === 'submitting' ? 'Sending...' : <><SendIcon className="h-5 w-5 mr-2" />Send Message</>}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Refill Modal */}
            {isRefillModalOpen && (
                 <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
                     {/* ... Refill Modal Content */}
                 </div>
            )}
        </PageWrapper>
    );
};

export default PatientPortal;