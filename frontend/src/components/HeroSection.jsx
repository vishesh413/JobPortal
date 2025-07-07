import { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="text-center px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex flex-col gap-5 max-w-4xl mx-auto">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-indigo-600 font-medium text-sm sm:text-base">
          No. 1 Job Hunt Website
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-indigo-600">Dream Jobs</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-700 max-w-xl mx-auto">
          Find the perfect job that matches your skills and goals — your dream career is just a click away.
        </p>

        <div className="flex w-full max-w-xl mx-auto shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 sm:gap-4">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="px-3 py-2 w-full outline-none rounded-l-full text-sm sm:text-base"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
