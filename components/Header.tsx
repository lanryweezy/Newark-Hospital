import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { HospitalIcon, MenuIcon, XIcon, SearchIcon } from './IconComponents';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const navigate = useNavigate();
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsSearchOpen(false);
                setIsMenuOpen(false);
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('mousedown', handleClickOutside);
        
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handleMobileLinkClick = () => {
        setIsMenuOpen(false);
        setOpenDropdown(null);
    };

    return (
        <header ref={headerRef} className="bg-primary/95 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-primary-lightest/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <Link 
                        to="/" 
                        className="flex items-center space-x-3 text-slate-light rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-light focus-visible:ring-offset-primary animate-slide-in-from-left"
                        style={{ animationDelay: '200ms', opacity: 0 }}
                        aria-label="Newark Hospital - Go to homepage"
                    >
                        <HospitalIcon className="h-8 w-8 text-secondary" aria-hidden="true" />
                        <span className="text-xl font-semibold tracking-wider font-serif">Newark Hospital</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1" aria-label="Main navigation">
                        {NAV_LINKS.map((link) => (
                            <div key={link.name} className="flex-shrink-0">
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => `px-2 py-2 text-slate-light hover:text-secondary transition-all duration-300 font-medium rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-light focus-visible:ring-offset-primary hover:drop-shadow-[0_0_5px_theme(colors.secondary.DEFAULT)] ${isActive ? 'text-secondary drop-shadow-[0_0_5px_theme(colors.secondary.DEFAULT)]' : ''}`}
                                    aria-label={link.name}
                                >
                                    {link.name}
                                </NavLink>
                            </div>
                        ))}
                    </nav>

                    <div className="hidden md:flex items-center">
                        <Link
                            to="/appointments"
                            className="bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary/90 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-glow-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-light focus-visible:ring-offset-primary active:scale-95 text-sm"
                             aria-label="Book an appointment"
                        >
                            Book Appointment
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button 
                          onClick={() => setIsMenuOpen(!isMenuOpen)} 
                          className="text-slate-light p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-light focus-visible:ring-offset-primary"
                          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                          aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden bg-primary absolute w-full shadow-xl transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <nav className="flex flex-col items-center space-y-1 py-4" aria-label="Mobile navigation">
                    {NAV_LINKS.map((link) => (
                        <div key={link.name} className="w-full text-center px-4">
                            <NavLink
                                to={link.path}
                                onClick={handleMobileLinkClick}
                                className={({ isActive }) => `block w-full text-slate-light hover:text-secondary transition-colors duration-300 font-medium py-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light ${isActive ? 'text-secondary' : ''}`}
                                aria-label={link.name}
                            >
                                {link.name}
                            </NavLink>
                        </div>
                    ))}
                     <Link
                        to="/appointments"
                        onClick={handleMobileLinkClick}
                        className="bg-secondary text-white font-bold py-2 px-4 rounded-md hover:bg-secondary/90 transition-transform duration-300 ease-in-out transform hover:scale-105 active:scale-95 mt-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-light focus-visible:ring-offset-primary text-sm"
                        aria-label="Book an appointment"
                    >
                        Book Appointment
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;