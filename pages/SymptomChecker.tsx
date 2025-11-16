import React, { useState, useEffect } from 'react';
import PageWrapper from '../components/PageWrapper';
import { getSymptomAnalysis, isAiAvailable } from '../services/geminiService';
import { SymptomCheckerIcon } from '../components/IconComponents';

const Typewriter: React.FC<{ text: string }> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        setDisplayedText(''); // Reset on new text
        let i = 0;
        const intervalId = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(intervalId);
            }
        }, 20); // Adjust speed here

        return () => clearInterval(intervalId);
    }, [text]);

    return <>{displayedText}</>;
};


const SymptomChecker: React.FC = () => {
    const [symptoms, setSymptoms] = useState('');
    const [analysis, setAnalysis] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const MAX_CHARS = 1000;

    if (!isAiAvailable()) {
        return (
            <PageWrapper
                title="AI Symptom Checker"
                subtitle="Describe your symptoms to get an AI-powered analysis. This tool is for informational purposes only and is not a substitute for professional medical advice."
            >
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-white p-8 rounded-lg shadow-xl">
                        <h2 className="text-2xl font-bold text-primary mb-4">Feature Unavailable</h2>
                        <p className="text-lg text-gray-600">
                            The AI Symptom Checker is currently unavailable. Please check back later or contact the hospital directly for assistance.
                        </p>
                    </div>
                </div>
            </PageWrapper>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!symptoms.trim()) {
            setError('Please describe your symptoms.');
            return;
        }
        setError('');
        setIsLoading(true);
        setAnalysis('');
        try {
            const result = await getSymptomAnalysis(symptoms);
            setAnalysis(result);
        } catch (err)
            {
            setError('An error occurred while analyzing symptoms. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageWrapper
            title="AI Symptom Checker"
            subtitle="Describe your symptoms to get an AI-powered analysis. This tool is for informational purposes only and is not a substitute for professional medical advice."
        >
            <div className="max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-xl">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="symptoms" className="block text-lg font-bold text-primary mb-2">
                                Please describe your symptoms in detail:
                            </label>
                            <p className="text-sm text-gray-600 mb-4">
                                Include when they started, their severity (e.g., mild, moderate, severe), and anything that makes them better or worse. For example: "I have had a sharp headache and a mild fever for two days."
                            </p>
                             <div className="relative">
                                <textarea
                                    id="symptoms"
                                    rows={6}
                                    value={symptoms}
                                    onChange={(e) => {
                                        if (e.target.value.length <= MAX_CHARS) {
                                            setSymptoms(e.target.value);
                                        }
                                    }}
                                    className="mt-1 block w-full px-4 py-3 pb-8 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-light focus:animate-focus-border-pulse text-lg transition-all duration-300"
                                    placeholder="e.g., I have a sore throat, runny nose, and a slight cough..."
                                    maxLength={MAX_CHARS}
                                />
                                <div className="absolute bottom-4 right-4 text-sm text-slate pointer-events-none">
                                    {symptoms.length} / {MAX_CHARS}
                                </div>
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <div className="text-center">
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className="w-full sm:w-auto bg-secondary text-white font-bold py-3 px-12 rounded-full hover:bg-secondary/90 transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center mx-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <SymptomCheckerIcon className="h-6 w-6 mr-3"/>
                                        Analyze Symptoms
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                <div aria-live="polite" aria-atomic="true">
                    {analysis && !isLoading && (
                        <div className="mt-12 bg-white p-8 rounded-lg shadow-xl border-t-4 border-primary-light animate-fade-in-up">
                            <h2 className="text-2xl font-bold text-primary mb-4">Analysis Result</h2>
                            <div className="prose max-w-none text-gray-800 whitespace-pre-wrap font-sans bg-gray-50 p-6 rounded-md border border-gray-200">
                                <Typewriter text={analysis} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PageWrapper>
    );
};

export default SymptomChecker;