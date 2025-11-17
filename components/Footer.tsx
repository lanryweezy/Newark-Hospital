
import React from 'react';
import { Link } from 'react-router-dom';
import { HospitalIcon, PhoneIcon, MailIcon, MapPinIcon } from './IconComponents';

const Footer: React.FC = () => {
    return (
        <footer className="bg-primary text-slate-light" role="contentinfo">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Info */}
                    <div className="space-y-4 md:col-span-1">
                        <Link to="/" className="flex items-center space-x-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-light focus-visible:ring-offset-primary" aria-label="Newark Hospital - Return to homepage">
                            <HospitalIcon className="h-8 w-8 text-secondary" />
                            <span className="text-xl font-semibold font-serif">Newark Hospital</span>
                        </Link>
                        <p className="text-sm text-slate">
                            Healing with Technology & Humanity. Providing world-class healthcare in the heart of the Ibadan-Ogun region.
                        </p>
                    </div>

                    {/* Our Hospital Links */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold mb-4 tracking-wider text-slate-light" id="hospital-links">Our Hospital</h3>
                        <ul className="space-y-2" aria-labelledby="hospital-links">
                            <li><Link to="/about" className="hover:text-secondary transition-colors duration-300 text-sm text-slate rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light">About Us</Link></li>
                            <li><Link to="/specialties" className="hover:text-secondary transition-colors duration-300 text-sm text-slate rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light">Specialties</Link></li>
                            <li><Link to="/find-a-doctor" className="hover:text-secondary transition-colors duration-300 text-sm text-slate rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light">Find a Doctor</Link></li>
                            <li><Link to="/careers" className="hover:text-secondary transition-colors duration-300 text-sm text-slate rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light">Careers</Link></li>
                        </ul>
                    </div>
                    
                    {/* Health & Education */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold mb-4 tracking-wider text-slate-light" id="health-links">Health & Education</h3>
                        <ul className="space-y-2" aria-labelledby="health-links">
                            <li><Link to="/blog" className="hover:text-secondary transition-colors duration-300 text-sm text-slate rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light">Health Blog</Link></li>
                        </ul>
                    </div>
                    
                    {/* Patient Resources */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold mb-4 tracking-wider text-slate-light" id="patient-links">Patient Resources</h3>
                        <ul className="space-y-2" aria-labelledby="patient-links">
                            <li><Link to="/patient-portal" className="hover:text-secondary transition-colors duration-300 text-sm text-slate rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light">Patient Portal</Link></li>
                            <li><Link to="/telemedicine" className="hover:text-secondary transition-colors duration-300 text-sm text-slate rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light">Telemedicine</Link></li>
                            <li><Link to="/bill-pay" className="hover:text-secondary transition-colors duration-300 text-sm text-slate rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light">Online Bill Pay</Link></li>
                            <li><Link to="/symptom-checker" className="hover:text-secondary transition-colors duration-300 text-sm text-slate rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light">Symptom Checker</Link></li>
                            <li><Link to="/appointments" className="hover:text-secondary transition-colors duration-300 text-sm text-slate rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light">Book Appointment</Link></li>
                        </ul>
                    </div>

                    {/* Contact & Emergency */}
                    <div className="md:col-span-1">
                        <h3 className="text-lg font-semibold mb-4 tracking-wider text-slate-light" id="contact-info">Contact Us</h3>
                        <ul className="space-y-3 text-sm mb-6" aria-labelledby="contact-info">
                            <li className="flex items-start">
                                <MapPinIcon className="h-5 w-5 mr-3 mt-0.5 text-secondary flex-shrink-0" aria-hidden="true" />
                                <span className="text-slate">Attapa Village, Off Kila, Odeda LGA, Ogun State, Nigeria.</span>
                            </li>
                            <li className="flex items-center">
                                <MailIcon className="h-5 w-5 mr-3 text-secondary" aria-hidden="true" />
                                <a href="mailto:info@newarkhospital.ng" className="hover:text-secondary text-slate rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light" aria-label="Email us at info@newarkhospital.ng">info@newarkhospital.ng</a>
                            </li>
                            <li className="flex items-center">
                                <PhoneIcon className="h-5 w-5 mr-3 text-secondary" aria-hidden="true" />
                                <a href="tel:+3248166250581" className="hover:text-secondary text-slate rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light" aria-label="Call us at +3248166250581">+3248166250581</a>
                            </li>
                        </ul>
                        <h3 className="text-lg font-semibold tracking-wider text-secondary">Emergency</h3>
                        <a href="tel:+3248166250581" className="text-xl font-bold text-white hover:text-secondary transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light" aria-label="Emergency line: +3248166250581">
                            +3248166250581
                        </a>
                    </div>
                </div>

                <div className="mt-12 border-t border-primary-lightest/30 pt-8 text-center text-sm text-slate">
                    <p>
                        &copy; {new Date().getFullYear()} Newark Hospital. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
