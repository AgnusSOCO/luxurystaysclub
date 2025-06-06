import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, Users } from 'lucide-react';
import Button from '../ui/Button';
import DatePicker from './DatePicker';
import { addDays, format } from 'date-fns';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (checkIn) params.append('checkIn', format(checkIn, 'yyyy-MM-dd'));
    if (checkOut) params.append('checkOut', format(checkOut, 'yyyy-MM-dd'));
    if (guests > 1) params.append('guests', guests.toString());

    navigate(`/properties?${params.toString()}`);
  };

  const handleDateSelect = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    
    // Ensure minimum 2-night stay
    if (start && !end) {
      const minEndDate = addDays(start, 2);
      setCheckIn(start);
      setCheckOut(minEndDate);
    } else {
      setCheckIn(start);
      setCheckOut(end);
    }
  };

  return (
    <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              id="location"
              placeholder="Where are you going?"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
        </div>

        <div className="md:col-span-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Dates
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full pl-10 pr-4 py-2 text-left rounded-md border border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              {checkIn && checkOut
                ? `${format(checkIn, 'MMM d')} - ${format(checkOut, 'MMM d')}`
                : 'Select dates'}
            </button>
            {showDatePicker && (
              <div className="absolute top-full left-0 mt-2 z-50">
                <DatePicker
                  startDate={checkIn}
                  endDate={checkOut}
                  onChange={handleDateSelect}
                  minStay={2}
                />
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
            Guests
          </label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-2 rounded-md border-gray-300 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num} Guest{num !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-transparent mb-1">
            Search
          </label>
          <Button type="submit" variant="primary" className="w-full">
            Search
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;