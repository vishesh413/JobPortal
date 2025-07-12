import { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Filter } from 'lucide-react';

const filterData = [
  {
    filterType: 'Location',
    options: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'Industry',
    options: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
  },
  {
    filterType: 'Salary',
    options: ['0-40k', '42-1lakh', '1lakh to 5lakh'],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="w-full bg-white p-4 rounded-md shadow-md">
      <h1 className="flex items-center font-bold text-xl mb-3 space-x-2">
        <Filter className="w-6 h-6 text-indigo-600" />
        <span>Filter Jobs</span>
      </h1>
      <hr className="mb-4" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-black" />
              <h2 className="font-semibold text-md">{data.filterType}</h2>
            </div>
            {data.options.map((item, idx) => {
              const itemId = `id-${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 mb-2 pl-6">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
