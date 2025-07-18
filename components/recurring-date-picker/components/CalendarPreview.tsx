'use client';

import { useRecurrence } from '../context/RecurrenceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar } from '@/components/ui/calendar';
import { formatDateForDisplay, isSameDay } from '../utils/dateGenerator';
import { CalendarDays, Clock } from 'lucide-react';

export function CalendarPreview() {
  const { state } = useRecurrence();

  const isRecurringDate = (date: Date): boolean => {
    return state.generatedDates.some(recurringDate => isSameDay(date, recurringDate));
  };

  const getRecurrenceDescription = (): string => {
    const { recurrenceType, interval, selectedDaysOfWeek, monthlyPattern, weekOfMonth, dayOfWeek } = state;
    
    let description = `Every ${interval > 1 ? interval : ''} ${recurrenceType}`;
    
    if (recurrenceType === 'weekly' && selectedDaysOfWeek.length > 0) {
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const selectedDayNames = selectedDaysOfWeek.map(day => dayNames[day]).join(', ');
      description += ` on ${selectedDayNames}`;
    }
    
    if (recurrenceType === 'monthly' && monthlyPattern === 'weekday') {
      const weekNames = ['', 'First', 'Second', 'Third', 'Fourth', 'Last'];
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const weekName = weekOfMonth === -1 ? 'Last' : weekNames[weekOfMonth];
      description += ` on the ${weekName} ${dayNames[dayOfWeek]}`;
    }
    
    return description;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <CalendarDays className="h-5 w-5" />
            Calendar View
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="multiple"
            selected={state.generatedDates}
            className="rounded-md border"
            modifiers={{
              recurring: isRecurringDate,
            }}
            modifiersStyles={{
              recurring: {
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                fontWeight: 'bold',
              },
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5" />
            Recurrence Pattern
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-sm font-medium text-blue-900">
              {getRecurrenceDescription()}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Generated Dates:</span>
              <Badge variant="secondary">{state.generatedDates.length} dates</Badge>
            </div>
            
            <ScrollArea className="h-48 w-full rounded-md border p-2">
              <div className="space-y-1">
                {state.generatedDates.slice(0, 20).map((date, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm text-gray-700">
                      {formatDateForDisplay(date)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                  </div>
                ))}
                {state.generatedDates.length > 20 && (
                  <div className="p-2 text-center text-sm text-gray-500">
                    ... and {state.generatedDates.length - 20} more dates
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}