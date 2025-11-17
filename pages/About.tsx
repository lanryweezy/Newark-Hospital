import React, { useState, useEffect, useRef } from 'react';
import PageWrapper from '../components/PageWrapper';
import { CheckCircleIcon, UsersIcon, BrainCircuitIcon, HeartHandshakeIcon, ChevronDownIcon, HospitalIcon, BedIcon, StethoscopeIcon } from '../components/IconComponents';
import AnimatedBlock from '../components/AnimatedBlock';

const useCountUp = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;

        const startCount = (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                let start = 0;
                const stepTime = Math.abs(Math.floor(duration / end));
                const timer = setInterval(() => {
                    start += 1;
                    setCount(start);
                    if (start === end) {
                        clearInterval(timer);
                    }
                }, stepTime);
                if (observer.current) {
                    observer.current.unobserve(currentRef);
                }
            }
        };
        
        observer.current = new IntersectionObserver(startCount, { threshold: 0.5 });
        observer.current.observe(currentRef);

        return () => {
            if (observer.current && currentRef) {
                observer.current.unobserve(currentRef);
            }
        };
    }, [end, duration]);

    return { count, ref };
};


const stats = [
    { value: 150, label: "Patient Beds", icon: BedIcon, suffix: "+" },
    { value: 50, label: "Medical Specialists", icon: UsersIcon, suffix: "+" },
    { value: 3000, label: "Square Meters", icon: HospitalIcon, suffix: "m²" },
    { value: 24, label: "Emergency Care", icon: StethoscopeIcon, suffix: "/7" },
];

const objectives = [
    { icon: UsersIcon, title: "Enhance Access", description: "Increase the availability of essential medical services to the growing population in the area." },
    { icon: BrainCircuitIcon, title: "Improve Outcomes", description: "Provide state-of-the-art facilities and technology to ensure high-quality care and patient recovery." },
    { icon: HeartHandshakeIcon, title: "Patient-Centered Care", description: "Design spaces that promote healing, comfort, and a supportive environment for patients and their families." },
];

const bestPractices = [
    {
        icon: UsersIcon,
        title: "Community Health Integration",
        description: "We actively engage with our communities through health education programs, preventive care screenings for local health concerns like malaria and hypertension, and partnerships with local health organizations."
    },
    {
        icon: BrainCircuitIcon,
        title: "Resilient Infrastructure",
        description: "Our facility is equipped with redundant power systems, including solar energy and backup generators, ensuring our advanced medical technology operates uninterrupted, 24/7, regardless of external grid conditions."
    },
    {
        icon: HeartHandshakeIcon,
        title: "Culturally Competent Care",
        description: "We respect and incorporate the cultural values and family structures of our patients into our care plans, ensuring a comfortable and dignified experience for everyone."
    },
    {
        icon: CheckCircleIcon,
        title: "Stringent Clinical Governance",
        description: "We adhere to the highest international standards for infection prevention and control, medication safety, and supply chain integrity to guarantee patient safety and the best possible outcomes."
    }
];

const facilityFeatures = [
    "Equipped with advanced triage systems",
    "Comfortable private and semi-private inpatient rooms",
    "State-of-the-art operating rooms",
    "Comprehensive in-facility pharmacy",
    "Dedicated areas for follow-up care and preventive services",
    "On-property Helipad for medical air transportation",
];

const supportServices = [
    "Food Services Department",
    "House Keeping/Maintenance Services",
    "Central Supply (Equipment, Inventory, Logistics)",
    "Administrative Offices",
    "Essential Medical Staff Building",
];


const About: React.FC = () => {
    const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(0);
    const [activeTab, setActiveTab] = useState<'medical' | 'support'>('medical');
    
    const CountUpStat: React.FC<{ stat: typeof stats[0] }> = ({ stat }) => {
        const { count, ref } = useCountUp(stat.value);
        return (
             <div className="text-center">
                <stat.icon className="h-12 w-12 text-secondary mx-auto mb-4" />
                <p className="text-4xl md:text-5xl font-bold text-primary">
                    <span ref={ref}>{count}</span>{stat.suffix}
                </p>
                <p className="text-slate mt-2">{stat.label}</p>
            </div>
        );
    };

    return (
        <PageWrapper
            title="About Newark Hospital"
            subtitle="Pioneering the future of healthcare in Nigeria with a commitment to excellence, compassion, and innovation."
        >
            <AnimatedBlock as="section" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center reveal">
                <div className="order-2 lg:order-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-serif">Our Mission & Vision</h2>
                    <p className="text-slate mb-4 text-lg">
                        Our mission is to deliver comprehensive, compassionate, and high-quality healthcare to every patient. 
                    </p>
                    <p className="text-slate mb-4 text-lg font-semibold">
                        Vision Statement – Newark Hospital
                    </p>
                    <p className="text-slate mb-4 text-lg italic">
                        "To be the beacon of universal healthcare in Newark, delivering timely, world‑class treatment to every patient—from the most affluent to the most vulnerable—ensuring no individual is left behind because of financial status."
                    </p>
                    <p className="text-slate">
                        Located on a 3005.310m² property in the Nigeria region, Newark Hospital is designed to be a center of medical excellence, featuring over 150 beds, specialized departments, and emergency services including a dedicated helipad.
                    </p>
                </div>
                <div className="order-1 lg:order-2">
                    <img
                        src="/Newark (1).jpg"
                        alt="Newark Hospital Building"
                        className="rounded-lg shadow-2xl w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </AnimatedBlock>
            
            <AnimatedBlock as="section" className="my-16 md:my-24 py-16 bg-white rounded-lg shadow-inner-lg reveal">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map(stat => <CountUpStat key={stat.label} stat={stat} />)}
                    </div>
                </div>
            </AnimatedBlock>
            
            <AnimatedBlock as="section" className="mt-16 md:mt-24 reveal">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary font-serif">Our Core Objectives</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-slate">
                        Shaping the future of healthcare in Africa and beyond.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {objectives.map((obj, index) => (
                         <AnimatedBlock key={index} className="reveal" style={{ '--delay': `${index * 150}ms` } as React.CSSProperties}>
                            <div className="text-center p-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white border border-gray-100 h-full">
                               <div className="flex justify-center items-center mb-4">
                                   <div className="bg-primary/10 p-4 rounded-full">
                                       <obj.icon className="h-10 w-10 text-primary" />
                                   </div>
                               </div>
                               <h3 className="text-xl font-bold text-primary mb-2">{obj.title}</h3>
                               <p className="text-slate">{obj.description}</p>
                           </div>
                        </AnimatedBlock>
                    ))}
                </div>
            </AnimatedBlock>

            <AnimatedBlock as="section" className="mt-16 md:mt-24 reveal">
                 <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary font-serif">Our Commitment to Nigerian Healthcare</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-slate">
                        We integrate global best practices with a deep understanding of local health needs to provide unparalleled care.
                    </p>
                </div>
                 <div className="max-w-3xl mx-auto space-y-4">
                    {bestPractices.map((practice, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => setOpenAccordionIndex(openAccordionIndex === index ? null : index)}
                                className="w-full flex justify-between items-center text-left p-6 hover:bg-gray-50/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
                                aria-expanded={openAccordionIndex === index}
                                aria-controls={`accordion-content-${index}`}
                            >
                                <span className="flex items-center">
                                    <practice.icon className="h-8 w-8 text-secondary mr-4" />
                                    <h3 className="font-semibold text-lg text-primary-light">{practice.title}</h3>
                                </span>
                                <ChevronDownIcon className={`h-6 w-6 text-primary transition-transform duration-300 ${openAccordionIndex === index ? 'rotate-180' : ''}`} />
                            </button>
                             <div
                                id={`accordion-content-${index}`}
                                className={`grid transition-all duration-500 ease-in-out ${openAccordionIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                            >
                                <div className="overflow-hidden">
                                    <p className="p-6 pt-0 text-slate">{practice.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </AnimatedBlock>
            
            <AnimatedBlock as="section" className="mt-16 md:mt-24 reveal">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary font-serif">Our World-Class Facility</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-slate">
                        Designed with cutting-edge technology and robust support systems to provide world-class care.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-4 sm:p-6">
                    <div className="border-b border-gray-200 mb-6">
                        <nav className="-mb-px flex space-x-4 sm:space-x-8" aria-label="Tabs">
                            <button onClick={() => setActiveTab('medical')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors ${activeTab === 'medical' ? 'border-secondary text-secondary' : 'border-transparent text-slate hover:text-primary hover:border-gray-300'}`}>
                                Key Medical Features
                            </button>
                            <button onClick={() => setActiveTab('support')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors ${activeTab === 'support' ? 'border-secondary text-secondary' : 'border-transparent text-slate hover:text-primary hover:border-gray-300'}`}>
                                Support Services
                            </button>
                        </nav>
                    </div>
                    <div className="p-2 sm:p-4 min-h-[280px]">
                        {activeTab === 'medical' && (
                            <ul className="space-y-4 animate-fade-in-up">
                                {facilityFeatures.map((feature, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1 mr-4" />
                                        <p className="text-slate-dark">{feature}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {activeTab === 'support' && (
                            <ul className="space-y-4 animate-fade-in-up">
                                {supportServices.map((service, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1 mr-4" />
                                        <p className="text-slate-dark">{service}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </AnimatedBlock>

            <AnimatedBlock as="section" className="mt-16 md:mt-24 text-center reveal">
                 <h2 className="text-3xl md:text-4xl font-bold text-primary font-serif">A Glimpse of Our Facility</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-slate">
                    Explore the modern architecture and patient-centric design of our hospital.
                 </p>
                 <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                    <div className="col-span-2 row-span-2 rounded-lg overflow-hidden shadow-lg group">
                        <img src="/Newark (1).jpg" alt="Newark Hospital exterior" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    </div>
                     <div className="rounded-lg overflow-hidden shadow-lg group">
                        <img src="/interior-view-operating-room.jpg" alt="Emergency Room and Operating Theater" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    </div>
                     <div className="rounded-lg overflow-hidden shadow-lg group">
                        <img src="/facility 3.png" alt="Hospital facility" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    </div>
                    <div className="col-span-2 rounded-lg overflow-hidden shadow-lg group">
                        <img src="/faciliyy 4.png" alt="Hospital facility" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                    </div>
                 </div>
            </AnimatedBlock>

            <AnimatedBlock as="section" className="mt-16 md:mt-24 bg-primary text-white py-20 rounded-lg reveal">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif">Join Our Journey to Better Health</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-slate-light/90">
                        Discover the exceptional care our world-class specialists provide and see how we are making a difference.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <a href="/#/find-a-doctor" className="w-full sm:w-auto bg-secondary font-bold py-3 px-8 rounded-full hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-glow-secondary active:scale-95">
                            Meet Our Doctors
                        </a>
                         <a href="/#/specialties" className="w-full sm:w-auto bg-transparent border-2 border-slate-light font-bold py-3 px-8 rounded-full hover:bg-slate-light hover:text-primary transition-colors duration-300 active:scale-95">
                            Explore Our Specialties
                        </a>
                    </div>
                </div>
            </AnimatedBlock>
        </PageWrapper>
    );
};

export default About;