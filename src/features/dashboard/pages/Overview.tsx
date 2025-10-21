import React from 'react';
import SkeletonCards from '../components/SkeletonCards';

const Overview: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Overview</h2>
            <SkeletonCards />
            {/* Future: Revenue cards, Transaction table, Charts */}
        </div>
    );
};

export default Overview;
