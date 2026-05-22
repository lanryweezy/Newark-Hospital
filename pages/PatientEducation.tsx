import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { HEALTH_ARTICLES_DATA } from '../constants';
import { Link } from 'react-router-dom';

const PatientEducation: React.FC = () => {
    // JSON-LD Blog Schema
    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Newark Hospital Health Blog",
        "description": "Stay informed with the latest health tips, medical news, and wellness advice from our experts.",
        "publisher": {
            "@type": "Hospital",
            "name": "Newark Hospital"
        },
        "blogPost": HEALTH_ARTICLES_DATA.map(article => ({
            "@type": "BlogPosting",
            "headline": article.title,
            "image": article.imageUrl,
            "description": article.excerpt,
            "author": {
                "@type": "Organization",
                "name": "Newark Hospital Medical Team"
            }
        }))
    };

    return (
        <PageWrapper
            title="Our Health Blog"
            subtitle="Stay informed with the latest health tips, hospital news, and wellness advice from our experts."
        >
            <script type="application/ld+json">
                {JSON.stringify(blogSchema)}
            </script>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {HEALTH_ARTICLES_DATA.map((article, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
                        <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" loading="lazy" />
                        <div className="p-6 flex flex-col flex-grow">
                            <p className="text-sm text-secondary font-semibold mb-2">{article.category}</p>
                            <h3 className="text-lg font-bold text-primary mb-3 flex-grow">{article.title}</h3>
                            <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                            <Link to={article.path} className="font-semibold text-primary-light hover:text-secondary mt-auto self-start rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-light">
                                Read More &rarr;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </PageWrapper>
    );
};

export default PatientEducation;