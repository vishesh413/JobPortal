import { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...singleJob.applications,
            { applicant: user?._id },
          ],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get/${jobId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-6 px-4">
      {/* Top section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
        {/* Title & badges */}
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.postion} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary} LPA
            </Badge>
          </div>
        </div>

        {/* Apply button */}
        <div className="sm:ml-4">
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg px-5 py-2 text-sm ${
              isApplied
                ? 'bg-gray-600 cursor-not-allowed text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>
      </div>

      {/* Divider */}
      <h1 className="border-b-2 border-gray-300 font-medium py-4 mt-6">
        Job Description
      </h1>

      {/* Details */}
      <div className="my-4 space-y-3 text-sm sm:text-base">
        <p>
          <span className="font-bold">Role:</span>{' '}
          <span className="text-gray-800">{singleJob?.title}</span>
        </p>
        <p>
          <span className="font-bold">Location:</span>{' '}
          <span className="text-gray-800">{singleJob?.location}</span>
        </p>
        <p>
          <span className="font-bold">Description:</span>{' '}
          <span className="text-gray-800">{singleJob?.description}</span>
        </p>
        <p>
          <span className="font-bold">Experience:</span>{' '}
          <span className="text-gray-800">
            {singleJob?.experience} yrs
          </span>
        </p>
        <p>
          <span className="font-bold">Salary:</span>{' '}
          <span className="text-gray-800">{singleJob?.salary} LPA</span>
        </p>
        <p>
          <span className="font-bold">Total Applicants:</span>{' '}
          <span className="text-gray-800">
            {singleJob?.applications?.length}
          </span>
        </p>
        <p>
          <span className="font-bold">Posted Date:</span>{' '}
          <span className="text-gray-800">
            {singleJob?.createdAt?.split('T')[0]}
          </span>
        </p>
      </div>
    </div>
  );
};

export default JobDescription;
