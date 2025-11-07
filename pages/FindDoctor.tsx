
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { DOCTORS_DATA } from '../constants';
import type { Doctor } from '../types';
import { UserDoctorIcon } from '../components/IconComponents';

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const handleRequestAppointment = () => {
        const params = new URLSearchParams({
            doctor: doctor.name,
            specialty: doctor.specialty,
        });
        navigate(`/appointments?${params.toString()}`);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-all duration-300 group border border-gray-100">
            <div className="relative w-full h-64 bg-gray-200 overflow-hidden">
                {!imageError ? (
                    <img
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        src={doctor.imageUrl}
                        alt={`Photo of ${doctor.name}, a specialist in ${doctor.specialty} at Newark Hospital.`}
                        onError={handleImageError}
                        aria-hidden="false"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100" role="img" aria-label={`Placeholder image for ${doctor.name}`}>
                        <UserDoctorIcon className="h-24 w-24 text-gray-400" />
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-primary">{doctor.name}</h3>
                <p className="text-secondary font-semibold mt-1">{doctor.specialty}</p>
                <p className="mt-4 text-slate text-sm flex-grow">{doctor.bio}</p>
                <button
                    onClick={handleRequestAppointment}
                    className="mt-6 w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-light transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-light shadow-md hover:shadow-lg"
                >
                    Request Appointment
                </button>
            </div>
        </div>
    );
};


const FindDoctor: React.FC = () => {
    const location = useLocation();

    const getInitialSearchTerm = () => {
        const params = new URLSearchParams(location.search);
        return params.get('q') || '';
    };

    const [searchTerm, setSearchTerm] = useState(getInitialSearchTerm);
    const [specialtyFilter, setSpecialtyFilter] = useState('All');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get('q');
        if (query !== null) {
            setSearchTerm(query);
        }
    }, [location.search]);

    const specialties = ['All', ...Array.from(new Set(DOCTORS_DATA.map(d => d.specialty)))];

    const filteredDoctors = DOCTORS_DATA.filter(doctor => {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = doctor.name.toLowerCase().includes(searchLower) || doctor.specialty.toLowerCase().includes(searchLower);
        const matchesSpecialty = specialtyFilter === 'All' || doctor.specialty === specialtyFilter;
        return matchesSearch && matchesSpecialty;
    });

    return (
        <PageWrapper title="Find a Doctor" subtitle="Search our directory of world-class physicians and specialists to find the right care for you.">
            {/* Hero section removed - now handled by PageWrapper */}
            <div className="mb-12 bg-white p-6 rounded-xl shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="doctor-search" className="block text-sm font-medium text-gray-700 mb-2">Search Doctors</label>
                        <div className="relative">
                            <input
                                id="doctor-search"
                                type="text"
                                placeholder="Search by name or specialty..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary-light focus:outline-none focus:ring-offset-2"
                                aria-label="Search for a doctor by name or specialty"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="specialty-filter" className="block text-sm font-medium text-gray-700 mb-2">Filter by Specialty</label>
                        <select
                            id="specialty-filter"
                            value={specialtyFilter}
                            onChange={(e) => setSpecialtyFilter(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-light focus:border-primary-light focus:outline-none focus:ring-offset-2 bg-white"
                            aria-label="Filter doctors by specialty"
                        >
                            {specialties.map(spec => (
                                <option key={spec} value={spec}>{spec}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map(doctor => <DoctorCard key={doctor.name} doctor={doctor} />)
                ) : (
                    <p className="col-span-full text-center text-slate py-12 text-lg">No doctors found matching your criteria.</p>
                )}
            </div>

        </PageWrapper>
    );
};

export default FindDoctor;