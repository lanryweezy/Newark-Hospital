import React from 'react';
import { Link } from 'react-router-dom';
import { SPECIALTIES_DATA, TESTIMONIALS_DATA, DOCTORS_DATA, HEALTH_ARTICLES_DATA, whyChooseUsData } from '../constants';
import { QuoteIcon } from '../components/IconComponents';
import AnimatedBlock from '../components/AnimatedBlock';
import HomeSection from '../components/HomeSection';

const Home: React.FC = () => {
    return (
        <div className="bg-accent">
            {/* Hero Section */}
            <section
                className="relative bg-cover bg-center text-white"
                style={{ backgroundImage: "url('/Newark  (1).jpg')" }}
                aria-label="Welcome to Newark Hospital"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60"></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 text-center">
                    <h1 
                        className="text-4xl md:text-6xl font-bold tracking-tight leading-tight font-serif animate-fade-in-up"
                        style={{ animationDelay: '200ms' }}
                    >
                        Healing with Technology & Humanity
                    </h1>
                    <p 
                        className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-light/90 animate-fade-in-up"
                        style={{ animationDelay: '400ms' }}
                    >
                        Welcome to Newark Hospital, a state-of-the-art facility dedicated to providing exceptional healthcare for the Ibadan-Ogun community and beyond.
                    </p>
                    <div 
                        className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up"
                        style={{ animationDelay: '600ms' }}
                    >
                        <Link
                            to="/appointments"
                            className="w-full sm:w-auto bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-glow-secondary active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-light min-w-[180px]"
                        >
                            Book Appointment
                        </Link>
                        <Link
                            to="/specialties"
                            className="w-full sm:w-auto bg-transparent border-2 border-slate-light text-slate-light font-bold py-3 px-8 rounded-lg hover:bg-slate-light hover:text-primary transition-colors duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light min-w-[180px]"
                        >
                            Explore Specialties
                        </Link>
                    </div>
                </div>
            </section>
            
            {/* Why Choose Us Section */}
            <HomeSection
                title="Excellence in Every Aspect"
                description="Discover the cornerstones of our commitment to your health and well-being."
                className="bg-white"
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {whyChooseUsData.map((item, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                            <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                                <div 
                                    className="h-64 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                                    // TODO: Replace with optimized images for each item
                                    style={{ backgroundImage: `url('${item.imageUrl}')` }}
                                ></div>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 text-white">
                                <div className="flex items-center mb-3">
                                    <div className="bg-secondary p-3 rounded-full mr-4">
                                        <item.icon className="h-8 w-8" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                </div>
                                <p className="text-slate-light/90">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </HomeSection>

            {/* Core Specialties */}
            <HomeSection
                title="Our Core Specialties"
                description="We provide a wide range of advanced medical specialties to meet the needs of our diverse population."
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SPECIALTIES_DATA.slice(0, 6).map((specialty, index) => (
                        <AnimatedBlock key={specialty.name} className="reveal group" style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}>
                            <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full border border-gray-100">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={specialty.imageUrl}
                                        alt={specialty.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-start mb-4">
                                        <div className="bg-secondary/10 p-3 rounded-lg mr-4 flex-shrink-0">
                                            <specialty.icon className="h-8 w-8 text-secondary" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-xl font-bold text-primary">{specialty.name}</h3>
                                    </div>
                                    <p className="text-slate flex-grow mb-6">{specialty.description}</p>
                                    
                                    <div className="mt-auto pt-4 border-t border-gray-100">
                                        <h4 className="font-semibold text-secondary mb-2">Services:</h4>
                                        <ul className="space-y-1 max-h-24 overflow-y-auto pr-2">
                                            {specialty.services.slice(0, 3).map((service, idx) => (
                                                <li key={idx} className="flex items-start text-sm text-slate">
                                                    <span className="text-secondary mr-2">•</span>
                                                    <span>{service}</span>
                                                </li>
                                            ))}
                                            {specialty.services.length > 3 && (
                                                <li className="text-sm text-secondary font-medium">+ {specialty.services.length - 3} more</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </AnimatedBlock>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link to="/specialties" className="inline-flex items-center bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-light transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-light hover:shadow-lg active:scale-95 min-w-[200px]">
                        View All Specialties <span className="ml-2">→</span>
                    </Link>
                </div>
            </HomeSection>
            
            {/* Meet Our Experts Section */}
            <HomeSection
                title="Meet Our World-Class Medical Team"
                description="Our physicians are leaders in their fields, dedicated to providing you with exceptional care."
                className="bg-white"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {DOCTORS_DATA.slice(0, 4).map((doctor, index) => (
                        <AnimatedBlock key={doctor.name} className="reveal" style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}>
                            <article className="group bg-white rounded-lg shadow-lg overflow-hidden text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full">
                                <div className="overflow-hidden">
                                    {/* TODO: Replace with optimized images for each doctor */}
                                    <img className="w-full h-72 object-cover object-center group-hover:scale-105 transition-transform duration-300" src={doctor.imageUrl} alt={`Dr. ${doctor.name}, ${doctor.specialty}`} />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-primary">{doctor.name}</h3>
                                    <p className="text-secondary font-semibold">{doctor.specialty}</p>
                                </div>
                            </article>
                        </AnimatedBlock>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link to="/find-a-doctor" className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-light transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-light hover:shadow-lg active:scale-95 min-w-[180px]">
                       Find a Doctor
                    </Link>
                </div>
            </HomeSection>

             {/* Testimonials */}
            <HomeSection
                title="What Our Community Says"
                description=""
                className="bg-primary-light"
                titleClassName="text-white"
            >
                 <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                     {TESTIMONIALS_DATA.map((testimonial, index) => (
                         <AnimatedBlock key={index} className="reveal" style={{ '--delay': `${index * 150}ms` } as React.CSSProperties}>
                             <figure className="bg-accent p-8 rounded-lg shadow-lg text-left relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-200 h-full">
                                 <QuoteIcon className="absolute top-4 right-4 h-16 w-16 text-primary/10" aria-hidden="true" />
                                 <blockquote className="text-slate-dark italic relative z-10">"{testimonial.quote}"</blockquote>
                                 <figcaption className="mt-4 font-bold text-primary relative z-10">
                                     {testimonial.name}
                                     <div className="text-sm text-slate font-normal">{testimonial.relation}</div>
                                 </figcaption>
                             </figure>
                         </AnimatedBlock>
                     ))}
                 </div>
            </HomeSection>

            {/* Health Hub & Latest News */}
            <HomeSection
                title="Health Hub & Latest News"
                description="Stay informed with the latest health tips, hospital news, and wellness advice from our experts."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {HEALTH_ARTICLES_DATA.map((article, index) => (
                        <AnimatedBlock key={index} className="reveal" style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}>
                            <article className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300 group h-full">
                                <div className="overflow-hidden">
                                     {/* TODO: Replace with optimized images for each article */}
                                     <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <p className="text-sm text-secondary font-semibold mb-2">{article.category}</p>
                                    <h3 className="text-lg font-bold text-primary mb-3 flex-grow">{article.title}</h3>
                                    <Link to={article.path} className="font-semibold text-primary-light hover:text-secondary mt-auto self-start rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light">
                                        Read More &rarr;
                                    </Link>
                                </div>
                            </article>
                        </AnimatedBlock>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link to="/blog" className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-light transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-light hover:shadow-lg active:scale-95 min-w-[180px]">
                        Visit Our Health Blog
                    </Link>
                </div>
            </HomeSection>
            
            {/* Final CTA Section */}
            <section className="bg-primary py-20">
                <AnimatedBlock className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white reveal">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif">Ready to Take the Next Step?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-slate-light/90">
                        Your health is our priority. Schedule a consultation with our specialists or find the right doctor for your needs today.
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Link to="/appointments" className="w-full sm:w-auto bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-glow-secondary active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-light min-w-[180px]">
                            Book an Appointment
                        </Link>
                         <Link to="/find-a-doctor" className="w-full sm:w-auto bg-transparent border-2 border-slate-light text-slate-light font-bold py-3 px-8 rounded-lg hover:bg-slate-light hover:text-primary transition-colors duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-light min-w-[180px]">
                            Find a Doctor
                        </Link>
                    </div>
                </AnimatedBlock>
            </section>
        </div>
    );
};

export default Home;