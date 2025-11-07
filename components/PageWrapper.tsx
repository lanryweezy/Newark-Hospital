import React from 'react';

interface PageWrapperProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ title, subtitle, children }) => {
    return (
        <div className="bg-accent animate-page-fade-in">
            <header 
                className="relative bg-cover bg-center border-b border-primary-lightest/20"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519491338542-53ed369d3f28?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
            >
                {/* Overlay for readability */}
                <div className="absolute inset-0 bg-primary/70"></div>
                
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
                    <h1 
                        className="text-4xl md:text-5xl font-bold tracking-tight font-serif animate-fade-in-up"
                        style={{ animationDelay: '200ms', opacity: 0 }}
                    >
                        {title}
                    </h1>
                    {subtitle && (
                        <p 
                            className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-slate-light/90 animate-fade-in-up"
                            style={{ animationDelay: '400ms', opacity: 0 }}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>
            </header>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
                {children}
            </main>
        </div>
    );
}

export default PageWrapper;