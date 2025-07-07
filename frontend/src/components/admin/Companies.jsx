import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';

const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 px-4">
        {/* Input and Button Row */}
        <div className="w-full my-5">
          <div className="flex flex-nowrap items-center gap-3 overflow-x-auto">
            <Input
              className="h-10 min-w-[200px] sm:min-w-[300px] border-gray-300 text-sm"
              placeholder="Filter by name"
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              className="h-10 px-5 bg-black text-white text-sm whitespace-nowrap"
              onClick={() => navigate('/admin/companies/create')}
            >
              New Company
            </Button>
          </div>
        </div>

        {/* Table */}
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
