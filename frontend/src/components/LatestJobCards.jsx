import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job?._id}`)}
            className="p-5 rounded-md shadow-xl bg-white border border-indigo-100 cursor-pointer transition-all 
                       hover:shadow-[0_4px_24px_rgba(99,102,241,0.15)]"
        >
            {/* Company Info */}
            <div>
                <h1 className="font-medium text-lg">{job?.company?.name || 'Unknown Company'}</h1>
                <p className="text-sm text-gray-500">India</p>
            </div>

            {/* Job Title & Description */}
            <div className="mt-2">
                <h1 className="font-bold text-lg mb-1">{job?.title || 'Untitled Role'}</h1>
                <p className="text-sm text-gray-600 line-clamp-2">
                    {job?.description || 'No description available.'}
                </p>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mt-4">
                {/* Positions Badge - Indigo */}
                <Badge className="text-indigo-600 font-bold" variant="ghost">
                    {job?.position ? `${job.position} Positions` : 'N/A'}
                </Badge>

                {/* Job Type Badge - Fuchsia */}
                <Badge className="text-fuchsia-600 font-bold" variant="ghost">
                    {job?.jobType || 'Type N/A'}
                </Badge>

                {/* Salary Badge - Neutral */}
                <Badge className="text-neutral-800 font-bold" variant="ghost">
                    {job?.salary ? `${job.salary} LPA` : 'Salary N/A'}
                </Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
