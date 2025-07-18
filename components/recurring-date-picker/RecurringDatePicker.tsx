'use client';

import { useState } from 'react';
import { RecurrenceProvider } from './context/RecurrenceContext';
import { RecurrenceOptions } from './components/RecurrenceOptions';
import { DateRangePicker } from './components/DateRangePicker';
import { CalendarPreview } from './components/CalendarPreview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface RecurringDatePickerProps {
  onSelectionChange?: (selection: any) => void;
  className?: string;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

export function RecurringDatePicker({
  onSelectionChange,
  className,
  initialStartDate = new Date(),
  initialEndDate,
}: RecurringDatePickerProps) {
  return (
    <RecurrenceProvider
      onSelectionChange={onSelectionChange}
      initialStartDate={initialStartDate}
      initialEndDate={initialEndDate}
    >
      <div className={cn('space-y-6', className)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Recurring Date Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Recurrence Pattern
                </h3>
                <RecurrenceOptions />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Date Range
                </h3>
                <DateRangePicker />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">
                Calendar Preview
              </h3>
              <CalendarPreview />
            </div>
          </CardContent>
        </Card>
      </div>
    </RecurrenceProvider>
  );
}