
import React from 'react';
import PageWrapper from '../components/PageWrapper';

const jobOpenings = [
    {
        title: 'Registered Nurse (RN) - ICU',
        department: 'Intensive Care Unit',
        location: 'Odeda, Ogun State',
        type: 'Full-time',
    },
    {
        title: 'Medical Laboratory Scientist',
        department: 'Laboratory Services',
        location: 'Odeda, Ogun State',
        type: 'Full-time',
    },
    {
        title: 'Senior Radiographer',
        department: 'Diagnostic Imaging',
        location: 'Odeda, Ogun State',
        type: 'Full-time',
    },
    {
        title: 'Hospital Administrator',
        department: 'Administration',
        location: 'Odeda, Ogun State',
        type: 'Full-time',
    },
];

const Careers: React.FC = () => {
    return (
        <PageWrapper
            title="Careers at Newark Hospital"
            subtitle="Join our team of dedicated professionals and help us redefine healthcare in Nigeria. We are looking for passionate individuals to fill various roles."
        >
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-primary mb-6">Current Openings</h2>
                    <div className="space-y-6">
                        {jobOpenings.map((job, index) => (
                            <div key={index} className="border border-gray-200 p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                    <div className="mb-4 sm:mb-0">
                                        <h3 className="text-xl font-bold text-primary-light">{job.title}</h3>
                                        <p className="text-gray-600 mt-1">{job.department}</p>
                                        <div className="flex items-center text-sm text-gray-500 mt-2">
                                            <span>{job.location}</span>
                                            <span className="mx-2">|</span>
                                            <span>{job.type}</span>
                                        </div>
                                    </div>
                                    <button className="bg-secondary text-white font-bold py-2 px-5 rounded-full hover:bg-secondary/90 transition-colors duration-300 self-start sm:self-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary">
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                 <div className="mt-12 text-center bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-primary">Don't see a role for you?</h3>
                    <p className="text-gray-600 mt-2">We are always looking for talented individuals. Send your resume to <a href="mailto:careers@newarkhospital.ng" className="text-secondary font-semibold rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light">careers@newarkhospital.ng</a>.</p>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Careers;
