
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="rounded-xl shadow-md bg-white border border-gray-100 w-full max-w-sm sm:max-w-md mx-auto p-4 transition-all hover:shadow-xl">
      {/* Top Info */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
        <p>
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Today'
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>

      {/* Logo and Company Info */}
      <div className="flex flex-col items-center gap-2 text-center">
        <Avatar className="w-16 h-16">
          <AvatarImage src={job?.company?.logo} />
        </Avatar>
        <div>
          <h2 className="font-semibold text-base">{job?.company?.name}</h2>
          <p className="text-xs text-gray-500">India</p>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mt-4 text-center">
        <h3 className="font-bold text-base">{job?.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        <Badge className="text-[#7e22ce] font-bold" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#2563EB] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="sm:w-auto w-full text-sm"
        >
          Details
        </Button>
        <Button
          className="bg-[#2563EB] hover:bg-[#1D4ED8] sm:w-auto w-full text-sm"
        >
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
