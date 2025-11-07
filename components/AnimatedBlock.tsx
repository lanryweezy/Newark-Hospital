import React, { useRef, useEffect } from 'react';

// FIX: Added 'as' prop to allow the component to render as different HTML elements (e.g., 'div', 'section'), making it polymorphic.
interface AnimatedBlockProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    threshold?: number;
    as?: React.ElementType;
}

// FIX: Updated the component props to accept all standard HTML attributes (like id, aria-labelledby) and pass them through.
const AnimatedBlock: React.FC<AnimatedBlockProps & React.AllHTMLAttributes<HTMLElement>> = ({ 
    children, 
    className = '', 
    style, 
    threshold = 0.1, 
    as: Component = 'div', 
    ...rest 
}) => {
    // FIX: Changed ref type from HTMLDivElement to the more generic HTMLElement to support various element types.
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    currentRef.classList.add('visible');
                    observer.unobserve(currentRef);
                }
            },
            { threshold }
        );

        observer.observe(currentRef);

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold]);
    
    return (
        <Component ref={ref} className={className} style={style} {...rest}>
            {children}
        </Component>
    );
};
export default AnimatedBlock;
