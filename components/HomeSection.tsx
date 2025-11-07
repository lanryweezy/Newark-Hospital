import React from 'react';
import AnimatedBlock from './AnimatedBlock';

interface HomeSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  containerClassName?: string;
}

const HomeSection: React.FC<HomeSectionProps> = ({ 
  title, 
  description, 
  children, 
  className = '', 
  titleClassName = '', 
  descriptionClassName = '',
  containerClassName = ''
}) => {
  return (
    <section className={`py-20 ${className}`}>
      <AnimatedBlock className={`container mx-auto px-4 sm:px-6 lg:px-8 reveal ${containerClassName}`}>
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-primary font-serif ${titleClassName}`}>{title}</h2>
          <p className={`mt-4 max-w-2xl mx-auto text-slate ${descriptionClassName}`}>{description}</p>
        </div>
        {children}
      </AnimatedBlock>
    </section>
  );
};

export default HomeSection;
