import React from 'react';
import PageWrapper from '../components/PageWrapper';

const Donation: React.FC = () => {
    return (
        <PageWrapper
            title="Support Our Mission"
            subtitle="Your generous donations help us provide quality healthcare to all patients, regardless of their financial status"
        >
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-xl p-8 mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Make a Difference Today</h2>
                    <p className="text-slate mb-6">
                        At Newark Hospital, we are committed to delivering world-class healthcare to every patient who walks through our doors. 
                        Your support helps us maintain state-of-the-art equipment, train our medical staff, and provide care to those who cannot afford it.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <div className="bg-primary/5 p-6 rounded-lg border border-primary-lightest">
                            <h3 className="text-xl font-bold text-primary mb-4">Bank Transfer Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-semibold text-slate">Account Name:</p>
                                    <p className="text-slate">Alapini Olufunmilola Fummi</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate">Bank:</p>
                                    <p className="text-slate">Access Bank</p>
                                </div>
                                <div>
                                    <p className="font-semibold text-slate">Account Number:</p>
                                    <p className="text-slate">1517886378</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-secondary/5 p-6 rounded-lg border border-secondary">
                            <h3 className="text-xl font-bold text-secondary mb-4">Why Donate?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="text-secondary mr-2">•</span>
                                    <span className="text-slate">Provide free medical care to the underprivileged</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-secondary mr-2">•</span>
                                    <span className="text-slate">Upgrade medical equipment and facilities</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-secondary mr-2">•</span>
                                    <span className="text-slate">Support medical training and research</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-secondary mr-2">•</span>
                                    <span className="text-slate">Expand our outreach programs</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="mt-12 p-6 bg-primary text-white rounded-lg">
                        <h3 className="text-xl font-bold mb-4">Your Impact</h3>
                        <p className="mb-4">
                            Every donation, no matter the size, makes a difference in someone's life. Here's how your contribution helps:
                        </p>
                        <ul className="space-y-2">
                            <li>₦5,000 can provide basic medications for 5 patients</li>
                            <li>₦15,000 can cover diagnostic tests for a family</li>
                            <li>₦50,000 can fund a day of free clinic services</li>
                            <li>₦100,000 can support a medical student's training</li>
                        </ul>
                    </div>
                </div>
                
                <div className="text-center">
                    <a 
                        href="/#/contact" 
                        className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-light transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-light hover:shadow-lg"
                    >
                        Contact Us for More Information
                    </a>
                </div>
            </div>
        </PageWrapper>
    );
};

export default Donation;