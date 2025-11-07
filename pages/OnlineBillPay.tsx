import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { CreditCardIcon } from '../components/IconComponents';

const OnlineBillPay: React.FC = () => {
    const [isPaid, setIsPaid] = useState(false);
    const [patientId, setPatientId] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would integrate a payment gateway here.
        // For this demo, we'll just simulate a successful payment.
        setIsPaid(true);
    };

    if (isPaid) {
        return (
            <PageWrapper
                title="Payment Successful"
                subtitle="Thank you for your payment."
            >
                <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl text-center">
                    <div className="flex justify-center items-center mb-4">
                         <div className="bg-green-100 p-4 rounded-full">
                            <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-4">Thank You!</h2>
                    <p className="text-gray-600">
                        Your payment for invoice <span className="font-semibold">{invoiceNumber}</span> has been processed successfully. A confirmation receipt has been sent to your registered email address.
                    </p>
                    <button onClick={() => setIsPaid(false)} className="mt-8 bg-primary text-white font-bold py-2 px-6 rounded-full hover:bg-primary-light transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-light">
                        Make Another Payment
                    </button>
                </div>
            </PageWrapper>
        )
    }

    return (
        <PageWrapper
            title="Online Bill Pay"
            subtitle="Securely pay your hospital bills online. It's fast, easy, and convenient."
        >
            <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold text-primary mb-6">Payment Information</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Patient ID</label>
                        <input type="text" id="patientId" value={patientId} onChange={(e) => setPatientId(e.target.value)} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light" />
                    </div>
                     <div>
                        <label htmlFor="invoiceNumber" className="block text-sm font-medium text-gray-700">Invoice Number</label>
                        <input type="text" id="invoiceNumber" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light" />
                    </div>
                     <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (NGN)</label>
                        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light" />
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                         <h3 className="text-lg font-medium text-gray-900">Credit Card Details</h3>
                         <div className="mt-4 space-y-6">
                             <div>
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                                <input type="text" id="cardNumber" placeholder="0000 0000 0000 0000" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                    <input type="text" id="expiryDate" placeholder="MM / YY" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light" />
                                </div>
                                <div>
                                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                                    <input type="text" id="cvv" placeholder="123" required className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary-light focus:border-primary-light" />
                                </div>
                            </div>
                         </div>
                    </div>

                    <div>
                        <button type="submit" className="w-full flex items-center justify-center bg-secondary text-white font-bold py-3 px-6 rounded-full hover:bg-secondary/90 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary">
                            <CreditCardIcon className="h-5 w-5 mr-3" />
                            Pay Now
                        </button>
                    </div>
                </form>
            </div>
        </PageWrapper>
    );
};

export default OnlineBillPay;