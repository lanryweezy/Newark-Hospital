import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string;
  subtitle: string;
  showButtons?: boolean;
  mediaSrc?: string; // New prop for video/GIF source
  mediaType?: 'video' | 'image'; // New prop to specify media type
}

const Hero: React.FC<HeroProps> = ({ title, subtitle, showButtons = true, mediaSrc, mediaType = 'image' }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        // Autoplay was prevented.
        console.error("Video autoplay was prevented:", error);
      });
    }
  }, []);

  return (
    <section
      className="relative text-white animate-ken-burns overflow-hidden"
      aria-label="Welcome to Newark Hospital"
    >
      {mediaSrc && mediaType === 'video' ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={mediaSrc}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url('${mediaSrc || '/Newark%20%20(1).jpg'}')` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60"></div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 text-center">
        <h1
          className="text-4xl md:text-6xl font-bold tracking-tight leading-tight font-serif animate-fade-in-up"
          style={{ animationDelay: '200ms', opacity: 0 }}
        >
          {title}
        </h1>
        <p
          className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-slate-light/90 animate-fade-in-up"
          style={{ animationDelay: '400ms', opacity: 0 }}
        >
          {subtitle}
        </p>
        {showButtons && (
          <div
            className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '600ms', opacity: 0 }}
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
        )}
      </div>
    </section>
  );
};

export default Hero;
