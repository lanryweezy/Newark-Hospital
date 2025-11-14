import React from 'react';
import PageWrapper from '../components/PageWrapper';
import AnimatedBlock from '../components/AnimatedBlock';

const Donate: React.FC = () => {
  return (
    <PageWrapper
      title="Support Our Mission"
      subtitle="Your generous contribution helps us provide care for everyone, regardless of their financial status. Together, we can make a difference."
    >
      <AnimatedBlock className="text-center reveal">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Make a Donation
          </h2>
          <p className="text-lg text-slate-dark mb-6">
            To make a donation, please use the following bank details:
          </p>
          <div className="text-2xl font-bold text-primary space-y-2">
            <p>
              <span className="font-semibold">Account Name:</span> Alapini Olufunmilola
            </p>
            <p>
              <span className="font-semibold">Account Number:</span> 1517886378
            </p>
            <p>
              <span className="font-semibold">Bank:</span> Access Bank
            </p>
          </div>
          <p className="mt-8 text-slate">
            Your support is invaluable to us. Thank you for your generosity.
          </p>
        </div>
      </AnimatedBlock>
    </PageWrapper>
  );
};

export default Donate;
