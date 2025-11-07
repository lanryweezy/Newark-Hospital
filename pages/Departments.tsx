import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { SPECIALTIES_DATA } from '../constants';
import { Specialty } from '../types';
import { CheckCircleIcon } from '../components/IconComponents';
import AnimatedBlock from '../components/AnimatedBlock';

const Specialties: React.FC = () => {
    // Group specialties by category
    const groupedSpecialties = SPECIALTIES_DATA.reduce((acc, specialty) => {
        const category = specialty.category || 'Other Services';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(specialty);
        return acc;
    }, {} as Record<string, Specialty[]>);

    const categoryOrder = ['Core Medical & Surgical', 'Diagnostic & Therapeutic', 'Specialized Care Centers'];

    return (
        <PageWrapper title="Our Specialties" subtitle="Explore our comprehensive range of specialized medical services, all equipped with state-of-the-art technology and staffed by expert professionals.">
            {/* Hero section removed - now handled by PageWrapper */}
            <div className="space-y-16">
                {categoryOrder.map(category => (
                    groupedSpecialties[category] && (
                        <AnimatedBlock as="section" key={category} aria-labelledby={category.replace(/\s+/g, '-').toLowerCase()} className="reveal">
                            <h2 id={category.replace(/\s+/g, '-').toLowerCase()} className="text-3xl font-bold text-primary mb-8 pb-4 text-center font-serif border-b-2 border-secondary/30">
                                {category}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {groupedSpecialties[category].map((specialty, index) => (
                                    <AnimatedBlock key={specialty.name} className="reveal" style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}>
                                        <article className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl h-full border border-gray-100">
                                            <img src={specialty.imageUrl} alt={specialty.name} className="w-full h-56 object-cover" />
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="flex items-center mb-4">
                                                    <specialty.icon className="h-10 w-10 text-secondary mr-4 flex-shrink-0" />
                                                    <h3 className="text-xl font-bold text-primary">{specialty.name}</h3>
                                                </div>
                                                <p className="text-gray-600 mb-6 flex-grow">{specialty.description}</p>
                                                
                                                <div className="mt-auto border-t border-gray-200 pt-4">
                                                    <h4 className="font-semibold text-primary-light mb-3">Key Services:</h4>
                                                    <ul className="space-y-2">
                                                        {specialty.services.map((service, index) => (
                                                            <li key={index} className="flex items-center text-gray-700">
                                                                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                                                                <span>{service}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </article>
                                    </AnimatedBlock>
                                ))}
                            </div>
                        </AnimatedBlock>
                    )
                ))}
            </div>
        </PageWrapper>
    );
};

export default Specialties;