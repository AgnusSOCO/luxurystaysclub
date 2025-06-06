import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface DatePickerProps {
  listingId?: string;
  onDateSelect: (checkIn: string, checkOut: string) => void;
  availabilityData?: Array<{
    date: string;
    status: 'available' | 'unavailable' | 'blocked';
    price?: number;
    minNights?: number;
  }>;
  isLoading?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  listingId, 
  onDateSelect, 
  availabilityData = [],
  isLoading = false 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCheckIn, setSelectedCheckIn] = useState<string | null>(null);
  const [selectedCheckOut, setSelectedCheckOut] = useState<string | null>(null);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Reset selections when listingId changes
  useEffect(() => {
    setSelectedCheckIn(null);
    setSelectedCheckOut(null);
    setHoveredDate(null);
  }, [listingId]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const formatDateString = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const getDateAvailability = (date: Date) => {
    const dateString = formatDateString(date);
    return availabilityData.find(a => a.date === dateString);
  };

  const isDateAvailable = (date: Date): boolean => {
    if (date < today) return false;
    
    const availability = getDateAvailability(date);
    return availability ? availability.status === 'available' : true; // Default to available if no data
  };

  const isDateInRange = (date: Date): boolean => {
    if (!selectedCheckIn || !selectedCheckOut) return false;
    
    const dateString = formatDateString(date);
    return dateString > selectedCheckIn && dateString < selectedCheckOut;
  };

  const isDateSelected = (date: Date): boolean => {
    const dateString = formatDateString(date);
    return dateString === selectedCheckIn || dateString === selectedCheckOut;
  };

  const isDateInHoverRange = (date: Date): boolean => {
    if (!selectedCheckIn || !hoveredDate || selectedCheckOut) return false;
    
    const dateString = formatDateString(date);
    const start = selectedCheckIn;
    const end = hoveredDate;
    
    return dateString > start && dateString < end;
  };

  const handleDateClick = (date: Date) => {
    if (!isDateAvailable(date)) return;

    const dateString = formatDateString(date);

    if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
      // First selection or reset
      setSelectedCheckIn(dateString);
      setSelectedCheckOut(null);
    } else if (selectedCheckIn && !selectedCheckOut) {
      // Second selection
      if (dateString > selectedCheckIn) {
        setSelectedCheckOut(dateString);
        onDateSelect(selectedCheckIn, dateString);
      } else {
        // If selected date is before check-in, make it the new check-in
        setSelectedCheckIn(dateString);
        setSelectedCheckOut(null);
      }
    }
  };

  const handleDateHover = (date: Date) => {
    if (!isDateAvailable(date) || !selectedCheckIn || selectedCheckOut) return;
    
    const dateString = formatDateString(date);
    if (dateString > selectedCheckIn) {
      setHoveredDate(dateString);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const getDateClasses = (date: Date): string => {
    const baseClasses = 'w-10 h-10 flex items-center justify-center text-sm rounded-full cursor-pointer transition-colors';
    
    if (!isDateAvailable(date)) {
      return `${baseClasses} text-gray-300 cursor-not-allowed line-through`;
    }
    
    if (isDateSelected(date)) {
      return `${baseClasses} bg-blue-600 text-white font-medium`;
    }
    
    if (isDateInRange(date) || isDateInHoverRange(date)) {
      return `${baseClasses} bg-blue-100 text-blue-800`;
    }
    
    if (date < today) {
      return `${baseClasses} text-gray-300 cursor-not-allowed`;
    }
    
    return `${baseClasses} text-gray-700 hover:bg-gray-100`;
  };

  const formatMonthYear = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const days = getDaysInMonth(currentMonth);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex items-center justify-center h-64">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400 animate-pulse" />
            <span className="text-gray-500">Loading availability...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          disabled={currentMonth <= today}
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        
        <h3 className="text-lg font-medium text-gray-900">
          {formatMonthYear(currentMonth)}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => (
          <div key={index} className="flex justify-center">
            {date ? (
              <button
                className={getDateClasses(date)}
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => handleDateHover(date)}
                onMouseLeave={() => setHoveredDate(null)}
                disabled={!isDateAvailable(date)}
                title={
                  !isDateAvailable(date) 
                    ? 'Not available' 
                    : getDateAvailability(date)?.price 
                      ? `$${getDateAvailability(date)?.price}/night`
                      : undefined
                }
              >
                {date.getDate()}
              </button>
            ) : (
              <div className="w-10 h-10" />
            )}
          </div>
        ))}
      </div>

      {/* Selection info */}
      {selectedCheckIn && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            {selectedCheckOut ? (
              <div className="space-y-1">
                <div><strong>Check-in:</strong> {new Date(selectedCheckIn).toLocaleDateString()}</div>
                <div><strong>Check-out:</strong> {new Date(selectedCheckOut).toLocaleDateString()}</div>
                <div><strong>Nights:</strong> {Math.ceil((new Date(selectedCheckOut).getTime() - new Date(selectedCheckIn).getTime()) / (1000 * 60 * 60 * 24))}</div>
              </div>
            ) : (
              <div>
                <strong>Check-in:</strong> {new Date(selectedCheckIn).toLocaleDateString()}
                <br />
                <span className="text-gray-500">Select check-out date</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-4 text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-100 rounded-full"></div>
          <span>In range</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;

