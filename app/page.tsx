'use client';

import { RecurringDatePicker } from '@/components/recurring-date-picker/RecurringDatePicker';

export default function Home() {
  const handleDateSelection = (selection: any) => {
    console.log('Selected recurring dates:', selection);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Recurring Date Picker
          </h1>
          <p className="text-lg text-gray-600">
            A powerful component for selecting recurring dates with flexible patterns
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <RecurringDatePicker
            onSelectionChange={handleDateSelection}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}