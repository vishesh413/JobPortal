import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import {
  Loader2,
  User,
  Mail,
  Phone,
  Lock,
  UploadCloud,
} from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: '',
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!input.file) {
      toast.error('Please upload a profile image before signing up.');
      return;
    }

    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    formData.append('file', input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-4xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full md:w-2/3 bg-white border border-gray-200 rounded-xl shadow-md p-8 my-10"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            🔐 Create your account
          </h2>

          {/* Full Name */}
          <div className="mb-4">
            <Label>Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="John Doe"
                className="pl-10"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <Label>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="john@example.com"
                className="pl-10"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mb-4">
            <Label>Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="1234567890"
                className="pl-10"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <Label>Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Enter your password"
                className="pl-10"
              />
            </div>
          </div>

          {/* Role */}
          <div className="mb-4">
            <Label>Role</Label>
            <RadioGroup className="flex gap-6 mt-2">
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <span>Student</span>
              </label>
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <span>Recruiter</span>
              </label>
            </RadioGroup>
          </div>

          {/* Upload Profile Image */}
          <div className="mb-6">
            <Label>Upload Profile Image</Label>
            <div className="flex items-center gap-3 mt-2">
              <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-200 transition">
                <UploadCloud className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Choose File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-600 truncate max-w-xs">
                {input.file ? input.file.name : 'No file chosen'}
              </span>
            </div>
          </div>

          {/* Submit */}
          {loading ? (
            <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
            >
              Signup
            </Button>
          )}

          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
