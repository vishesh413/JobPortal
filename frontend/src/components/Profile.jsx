import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-6 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left Avatar + Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-semibold text-xl text-gray-800">
                {user?.fullname}
              </h1>
              <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>

          {/* Edit Button */}
          <Button onClick={() => setOpen(true)} variant="outline">
            <Pen className="h-4 w-4 mr-1" /> Edit
          </Button>
        </div>

        {/* Contact Info */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <Mail className="h-4 w-4" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <Contact className="h-4 w-4" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="text-md font-semibold mb-2 text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user?.profile?.skills?.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume Link */}
        <div className="mt-6">
          <Label className="text-md font-bold text-gray-800">Resume</Label>
          <div className="mt-1">
            {isResume ? (
              <a
                target="_blank"
                href={user?.profile?.resume}
                className="text-indigo-600 hover:underline text-sm"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mb-10">
        <h1 className="font-bold text-lg mb-4 text-gray-800">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
