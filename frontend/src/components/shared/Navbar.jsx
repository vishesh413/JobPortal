import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="bg-white border-b sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold">
          Job<span className="text-indigo-600">Verse</span>
        </h1>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu />
          </Button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            {user?.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="text-white 
                  md:bg-indigo-600 md:hover:bg-indigo-700 
                  bg-black hover:bg-zinc-900 
                  w-full md:w-auto"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <div className="flex gap-2 mb-2">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 text-gray-600">
                    {user?.role === 'student' && (
                      <div className="flex items-center gap-2">
                        <User2 />
                        <Link to="/profile">
                          <Button variant="link" className="px-0">View Profile</Button>
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <LogOut />
                      <Button variant="link" onClick={logoutHandler} className="px-0">Logout</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="flex flex-col gap-3 font-medium mb-4">
            {user?.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex flex-col gap-2">
              <Link to="/login">
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="text-white 
                  md:bg-indigo-600 md:hover:bg-indigo-700 
                  bg-black hover:bg-zinc-600 
                  w-full"
                >
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2 text-gray-600">
              {user?.role === 'student' && (
                <Link to="/profile">
                  <Button variant="ghost" className="w-full justify-start">View Profile</Button>
                </Link>
              )}
              <Button variant="ghost" className="w-full justify-start" onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
