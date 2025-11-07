import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { PhoneIcon, MailIcon, MapPinIcon, ChevronDownIcon } from '../components/IconComponents';

const faqs = [
    {
        question: "What are your visiting hours?",
        answer: "General visiting hours are from 10:00 AM to 8:00 PM daily. ICU and other specialized units may have different policies. Please check with the specific department for details."
    },
    {
        question: "How do I book an appointment?",
        answer: "You can book an appointment by calling our dedicated scheduling line at +234 (123) 456 789. Our online booking portal is coming soon for added convenience."
    },
    {
        question: "How can I access my medical records?",
        answer: "You can securely access your medical records, including test results and appointment history, through our online Patient Portal. You can register for access at the front desk during your next visit."
    },
    {
        question: "Do you accept insurance?",
        answer: "Yes, we work with a wide range of national and international health insurance providers. Please contact our billing department for specific questions about your coverage."
    }
];

const Contact: React.FC = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const handleToggleFaq = (index: number) => {
        setOpenFaqIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <PageWrapper pageType="contact"
            title="Get In Touch"
            subtitle="We're here to help. Whether you have a question, need to schedule an appointment, or require emergency assistance, find the right way to reach us below."
        >
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12">
                {/* Contact Form */}
                <div className="lg:col-span-3 bg-white p-8 rounded-lg shadow-xl order-2 lg:order-1">
                    <h2 className="text-2xl font-bold text-primary mb-6">Send Us a Message</h2>
                    <p className="text-gray-600 mb-6">For general inquiries, please use the form below. We will get back to you as soon as possible. Please do not use this form for medical emergencies.</p>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="name" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" id="email" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                            <input type="text" id="subject" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea id="message" rows={5} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-secondary text-white font-bold py-3 px-6 rounded-full hover:bg-secondary/90 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
                
                {/* Contact Info */}
                <div className="lg:col-span-2 space-y-8 order-1 lg:order-2">
                    <div className="bg-red-100 border-l-4 border-secondary text-red-800 p-6 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold mb-2">Emergency</h3>
                        <p className="mb-4">For medical emergencies, please call this number immediately.</p>
                        <a href="tel:+234987654321" className="text-2xl font-bold text-secondary hover:underline rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary" aria-label="Emergency line: +234 (987) 654 321">
                            +234 (987) 654 321
                        </a>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-xl font-bold text-primary mb-4">Contact Information</h3>
                        <ul className="space-y-4 text-gray-700">
                             <li className="flex items-start">
                                <MapPinIcon className="h-6 w-6 mr-4 mt-1 text-secondary flex-shrink-0" />
                                <span>Attapa Village, Off Kila, Odeda LGA, Ogun State, Nigeria.</span>
                            </li>
                             <li className="flex items-center">
                                <MailIcon className="h-5 w-5 mr-4 text-secondary" />
                                <a href="mailto:info@newarkhospital.ng" className="hover:text-secondary rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light">info@newarkhospital.ng</a>
                            </li>
                            <li className="flex items-center">
                                <PhoneIcon className="h-5 w-5 mr-4 text-secondary" />
                                <a href="tel:+234123456789" className="hover:text-secondary rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light">+234 (123) 456 789</a>
                            </li>
                        </ul>
                    </div>
                     <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
                         <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" alt="Map to hospital" className="w-full h-64 object-cover" />
                         <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                            <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full" aria-hidden="true">
                                <MapPinIcon className="h-10 w-10 text-secondary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="mt-16 md:mt-24 max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">Frequently Asked Questions</h2>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
                            <button
                                onClick={() => handleToggleFaq(index)}
                                className="w-full flex justify-between items-center text-left p-6 hover:bg-gray-50/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
                                aria-expanded={openFaqIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <h3 className="font-semibold text-lg text-primary-light">{faq.question}</h3>
                                <ChevronDownIcon className={`h-6 w-6 text-primary transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                            </button>
                            <div
                                id={`faq-answer-${index}`}
                                className={`grid transition-all duration-500 ease-in-out ${openFaqIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                            >
                                <div className="overflow-hidden">
                                    <p className="p-6 pt-0 text-gray-600">{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
};

export default Contact;