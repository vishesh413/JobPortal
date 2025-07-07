import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ['Accepted', 'Rejected'];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <div className="w-full px-4">
      {/* DESKTOP TABLE */}
      <div className="hidden md:block border bg-white rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableCaption>A list of your recent applied users</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>FullName</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants?.applications?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {item?.applicant?.profile?.resume ? (
                    <a
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    'NA'
                  )}
                </TableCell>
                <TableCell>{item?.applicant?.createdAt?.split('T')[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => (
                        <div
                          key={index}
                          onClick={() => statusHandler(status, item?._id)}
                          className="cursor-pointer py-1 hover:text-indigo-600"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden flex flex-col gap-4 mt-4">
        {applicants?.applications?.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-lg shadow border flex flex-col gap-2"
          >
            <div className="font-bold text-lg text-indigo-700">{item?.applicant?.fullname}</div>
            <div className="text-sm text-gray-700"><span className="font-medium">Email:</span> {item?.applicant?.email}</div>
            <div className="text-sm text-gray-700"><span className="font-medium">Contact:</span> {item?.applicant?.phoneNumber}</div>
            <div className="text-sm text-gray-700">
              <span className="font-medium">Resume:</span>{' '}
              {item?.applicant?.profile?.resume ? (
                <a
                  href={item?.applicant?.profile?.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {item?.applicant?.profile?.resumeOriginalName}
                </a>
              ) : (
                'NA'
              )}
            </div>
            <div className="text-sm text-gray-700">
              <span className="font-medium">Date:</span> {item?.applicant?.createdAt?.split('T')[0]}
            </div>
            <div className="flex gap-2 mt-2">
              {shortlistingStatus.map((status, index) => (
                <button
                  key={index}
                  onClick={() => statusHandler(status, item?._id)}
                  className="text-sm px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200"
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicantsTable;
