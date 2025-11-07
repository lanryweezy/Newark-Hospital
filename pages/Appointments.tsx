
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { SPECIALTIES_DATA, DOCTORS_DATA } from '../constants';
import type { Doctor } from '../types';
import { UserDoctorIcon, ChevronDownIcon, StethoscopeIcon, CalendarIcon, ClockIcon, CheckCircleIcon } from '../components/IconComponents';

const TIME_SLOTS = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
];

// Helper function to format the date for display
const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "Select a date";
    // Appending T00:00:00 ensures the date is parsed in the local timezone
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

// --- Interactive Calendar Component ---
const CalendarComponent: React.FC<{
    selectedDate: string;
    onDateSelect: (date: string) => void;
}> = ({ selectedDate, onDateSelect }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const initialDate = selectedDate ? new Date(selectedDate + 'T00:00:00') : new Date();
    const [currentDate, setCurrentDate] = useState(initialDate);
    const [view, setView] = useState<'days' | 'months' | 'years'>('days');
    const [yearBlockStart, setYearBlockStart] = useState(Math.floor(currentDate.getFullYear() / 12) * 12);

    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const handlePrev = () => {
        switch (view) {
            case 'days':
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
                break;
            case 'months':
                setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
                break;
            case 'years':
                setYearBlockStart(yearBlockStart - 12);
                break;
        }
    };

    const handleNext = () => {
        switch (view) {
            case 'days':
                setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
                break;
            case 'months':
                setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
                break;
            case 'years':
                setYearBlockStart(yearBlockStart + 12);
                break;
        }
    };
    
    const renderHeader = () => (
        <div className="flex justify-between items-center mb-4">
            <button type="button" onClick={handlePrev} aria-label="Previous" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            <div className="flex items-center gap-1">
                {view === 'days' && (
                    <button type="button" onClick={() => setView('months')} className="font-bold text-lg text-primary hover:bg-gray-100 px-2 py-1 rounded transition-colors">
                        {currentDate.toLocaleString('default', { month: 'long' })}
                    </button>
                )}
                 <button type="button" onClick={() => setView('years')} className="font-bold text-lg text-primary hover:bg-gray-100 px-2 py-1 rounded transition-colors">
                     {view === 'years' ? `${yearBlockStart} - ${yearBlockStart + 11}` : currentDate.getFullYear()}
                </button>
            </div>
            <button type="button" onClick={handleNext} aria-label="Next" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
        </div>
    );

    const renderDaysView = () => {
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const startingDayOfWeek = firstDayOfMonth.getDay();
        const days = [];

        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="p-1"></div>);
        }

        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dateString = date.toISOString().split('T')[0];
            const isSelected = dateString === selectedDate;
            const isPast = date < today;
            const isToday = date.getTime() === today.getTime();
            const isWeekend = date.getDay() === 0 || date.getDay() === 6; // Sunday is 0, Saturday is 6
            const isDisabled = isPast || isWeekend;

            let dayClasses = "w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200";
            if (isDisabled) {
                dayClasses += " text-gray-400 cursor-not-allowed line-through";
            } else if (isSelected) {
                dayClasses += " bg-secondary text-white font-bold shadow-md";
            } else if (isToday) {
                dayClasses += " bg-primary/10 text-primary font-bold";
            } else {
                dayClasses += " text-gray-700 hover:bg-gray-100 cursor-pointer";
            }

            days.push(
                <button
                    type="button"
                    key={day}
                    onClick={() => !isDisabled && onDateSelect(dateString)}
                    disabled={isDisabled}
                    className={dayClasses}
                    aria-label={isSelected ? `Selected date, ${formatDateForDisplay(dateString)}` : `Select date, ${formatDateForDisplay(dateString)}`}
                >
                    {day}
                </button>
            );
        }

        return (
            <>
                <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 font-semibold mb-2">
                    {daysOfWeek.map(day => <div key={day}>{day}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-y-1 justify-items-center">{days}</div>
            </>
        );
    };

    const renderMonthsView = () => {
        const year = currentDate.getFullYear();
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return (
            <div className="grid grid-cols-3 gap-2 py-2">
                {monthsOfYear.map((month, index) => {
                    const isMonthPast = year < currentYear || (year === currentYear && index < currentMonth);
                    return (
                        <button
                            key={month}
                            type="button"
                            disabled={isMonthPast}
                            onClick={() => {
                                setCurrentDate(new Date(year, index, 1));
                                setView('days');
                            }}
                            className={`p-3 rounded-lg text-center font-semibold transition-colors ${isMonthPast ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 text-primary'}`}
                        >
                            {month}
                        </button>
                    );
                })}
            </div>
        );
    };

    const renderYearsView = () => {
        const years = Array.from({ length: 12 }, (_, i) => yearBlockStart + i);
        const currentYear = new Date().getFullYear();

        return (
             <div className="grid grid-cols-3 gap-2 py-2">
                {years.map(year => {
                    const isYearPast = year < currentYear;
                    return (
                        <button
                            key={year}
                            type="button"
                            disabled={isYearPast}
                            onClick={() => {
                                setCurrentDate(new Date(year, currentDate.getMonth(), 1));
                                setView('months');
                            }}
                            className={`p-3 rounded-lg text-center font-semibold transition-colors ${isYearPast ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 text-primary'} ${year === currentDate.getFullYear() ? 'bg-primary/10' : ''}`}
                        >
                            {year}
                        </button>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg border w-80">
            {renderHeader()}
            {view === 'days' && renderDaysView()}
            {view === 'months' && renderMonthsView()}
            {view === 'years' && renderYearsView()}
        </div>
    );
};


const Appointments: React.FC = () => {
    const location = useLocation();

    // Booking Form State
    const [bookingForm, setBookingForm] = useState({ specialty: '', doctor: '', date: '', time: '', reason: '' });
    const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
    const [bookingErrors, setBookingErrors] = useState<{ [key: string]: string }>({});
    const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const dateButtonRef = useRef<HTMLButtonElement>(null);


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const doctor = params.get('doctor');
        const specialty = params.get('specialty');

        if (doctor && specialty) {
            setBookingForm(prev => ({ ...prev, specialty, doctor, }));
        }
    }, [location.search]);
    
    useEffect(() => {
        if (bookingForm.specialty) {
            const doctorsInSpecialty = DOCTORS_DATA.filter(doc => doc.specialty === bookingForm.specialty);
            setAvailableDoctors(doctorsInSpecialty);
            if (bookingForm.doctor && !doctorsInSpecialty.some(d => d.name === bookingForm.doctor)) {
                setBookingForm(prev => ({ ...prev, doctor: '' }));
            }
        } else {
            setAvailableDoctors([]);
        }
    }, [bookingForm.specialty, bookingForm.doctor]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                calendarRef.current && !calendarRef.current.contains(event.target as Node) &&
                dateButtonRef.current && !dateButtonRef.current.contains(event.target as Node)
            ) {
                setIsCalendarOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const validateBookingForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!bookingForm.specialty) newErrors.specialty = "Please select a specialty.";
        if (!bookingForm.doctor) newErrors.doctor = "Please select a doctor.";
        if (!bookingForm.date) {
            newErrors.date = "Please select a date.";
        } else {
            const selectedDate = new Date(bookingForm.date + 'T00:00:00');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (selectedDate < today) {
                newErrors.date = "Please select a date that is not in the past.";
            } else if (selectedDate.getDay() === 0 || selectedDate.getDay() === 6) {
                newErrors.date = "Appointments are only available on weekdays.";
            }
        }
        if (!bookingForm.time) newErrors.time = "Please select a time.";
        if (!bookingForm.reason.trim()) newErrors.reason = "Please provide a reason for your visit.";

        setBookingErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBookingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateBookingForm()) return;
        setBookingStatus('submitting');
        setTimeout(() => {
            console.log("Booking Request:", bookingForm);
            setBookingStatus('success');
        }, 1500);
    };
    
     const resetBookingForm = () => {
        setBookingForm({ specialty: '', doctor: '', date: '', time: '', reason: '' });
        setBookingErrors({});
        setBookingStatus('idle');
    };

    return (
        <PageWrapper title="Book an Appointment" subtitle="Seamlessly schedule your visit with our specialists. Your path to better health starts here.">
            <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl">
                {bookingStatus === 'success' ? (
                    <div className="text-center animate-fade-in-up">
                        <div className="flex justify-center items-center mb-6">
                            <div className="bg-green-100 p-5 rounded-full">
                                <CheckCircleIcon className="h-16 w-16 text-green-600" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-primary mb-4">Appointment Requested!</h2>
                        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                            Thank you for your request. Our scheduling team will contact you shortly to confirm your final appointment details. For urgent matters, please call us directly.
                        </p>
                        <button 
                            onClick={resetBookingForm} 
                            className="bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-secondary/90 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary min-w-[220px]"
                        >
                            Book Another Appointment
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 text-center">Schedule Your Visit</h2>
                        <p className="text-gray-600 mb-8 text-center">Fill out the form below to request an appointment. We will contact you to confirm.</p>
                        <form className="space-y-6" onSubmit={handleBookingSubmit} noValidate>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <StethoscopeIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select 
                                            id="specialty" 
                                            value={bookingForm.specialty} 
                                            onChange={e => setBookingForm(prev => ({...prev, specialty: e.target.value}))} 
                                            required 
                                            className={`appearance-none block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 transition-colors ${bookingErrors.specialty ? 'border-red-500' : 'border-gray-300'} bg-white`}
                                        >
                                            <option value="" disabled>Select a specialty...</option>
                                            {SPECIALTIES_DATA.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                    {bookingErrors.specialty && <p className="mt-1 text-sm text-red-600">{bookingErrors.specialty}</p>}
                                </div>
                                <div>
                                    <label htmlFor="doctor" className="block text-sm font-medium text-gray-700 mb-2">Doctor</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <UserDoctorIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select 
                                            id="doctor" 
                                            value={bookingForm.doctor} 
                                            onChange={e => setBookingForm(prev => ({...prev, doctor: e.target.value}))} 
                                            required 
                                            disabled={!bookingForm.specialty} 
                                            className={`appearance-none block w-full pl-10 pr-10 py-3 border rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 transition-colors ${bookingErrors.doctor ? 'border-red-500' : 'border-gray-300'} bg-white`}
                                        >
                                            <option value="" disabled>{bookingForm.specialty ? 'Select a doctor...' : 'Select specialty first'}</option>
                                            {availableDoctors.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                    {bookingErrors.doctor && <p className="mt-1 text-sm text-red-600">{bookingErrors.doctor}</p>}
                                </div>
                            </div>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="date-button" className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                    <div className="relative">
                                        <button
                                            ref={dateButtonRef}
                                            type="button"
                                            id="date-button"
                                            onClick={() => setIsCalendarOpen(prev => !prev)}
                                            aria-haspopup="true"
                                            aria-expanded={isCalendarOpen}
                                            className={`relative w-full text-left pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 ${bookingErrors.date ? 'border-red-500' : 'border-gray-300'} ${!bookingForm.date ? 'text-gray-500' : 'text-gray-900'} bg-white`}
                                        >
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><CalendarIcon className="h-5 w-5 text-gray-400" /></div>
                                            {formatDateForDisplay(bookingForm.date)}
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><ChevronDownIcon className="h-5 w-5 text-gray-400" /></div>
                                        </button>
                                        {isCalendarOpen && (
                                            <div ref={calendarRef} className="absolute z-10 mt-2">
                                                <CalendarComponent
                                                    selectedDate={bookingForm.date}
                                                    onDateSelect={(date) => {
                                                        setBookingForm(prev => ({...prev, date}));
                                                        setIsCalendarOpen(false);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {bookingErrors.date && <p className="mt-1 text-sm text-red-600">{bookingErrors.date}</p>}
                                </div>
                                <div>
                                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <ClockIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select id="time" value={bookingForm.time} onChange={e => setBookingForm(prev => ({...prev, time: e.target.value}))} required className={`appearance-none block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 ${bookingErrors.time ? 'border-red-500' : 'border-gray-300'} bg-white`}>
                                            <option value="" disabled>Select a time...</option>
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
                                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                                <textarea 
                                    id="reason" 
                                    rows={4} 
                                    value={bookingForm.reason} 
                                    onChange={e => setBookingForm(prev => ({...prev, reason: e.target.value}))} 
                                    required 
                                    placeholder="Briefly describe your symptoms or reason for the visit..." 
                                    className={`block w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 transition-colors ${bookingErrors.reason ? 'border-red-500' : 'border-gray-300'} bg-white`}
                                ></textarea>
                                {bookingErrors.reason && <p className="mt-1 text-sm text-red-600">{bookingErrors.reason}</p>}
                            </div>
                            <div className="pt-4 flex justify-end gap-4">
                                <Link 
                                    to="/" 
                                    className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 text-center"
                                >
                                    Cancel
                                </Link>
                                <button 
                                    type="submit" 
                                    disabled={bookingStatus === 'submitting'} 
                                    className="bg-secondary text-white font-bold py-3 px-6 rounded-lg hover:bg-secondary/90 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary disabled:bg-gray-400 disabled:cursor-not-allowed min-w-[180px]"
                                >
                                    {bookingStatus === 'submitting' ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                        </span>
                                    ) : 'Request Appointment'}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </PageWrapper>
    );
};

export default Appointments;
