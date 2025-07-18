'use client';

import { useRecurrence } from '../context/RecurrenceContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const recurrenceTypes = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
] as const;

const daysOfWeek = [
  { value: 0, label: 'Sunday', short: 'Sun' },
  { value: 1, label: 'Monday', short: 'Mon' },
  { value: 2, label: 'Tuesday', short: 'Tue' },
  { value: 3, label: 'Wednesday', short: 'Wed' },
  { value: 4, label: 'Thursday', short: 'Thu' },
  { value: 5, label: 'Friday', short: 'Fri' },
  { value: 6, label: 'Saturday', short: 'Sat' },
];

const weekOptions = [
  { value: 1, label: 'First' },
  { value: 2, label: 'Second' },
  { value: 3, label: 'Third' },
  { value: 4, label: 'Fourth' },
  { value: -1, label: 'Last' },
];

export function RecurrenceOptions() {
  const { state, dispatch } = useRecurrence();

  const handleDayOfWeekToggle = (dayValue: number) => {
    const newSelectedDays = state.selectedDaysOfWeek.includes(dayValue)
      ? state.selectedDaysOfWeek.filter(day => day !== dayValue)
      : [...state.selectedDaysOfWeek, dayValue];
    
    dispatch({ type: 'SET_SELECTED_DAYS_OF_WEEK', payload: newSelectedDays });
  };

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recurrence-type">Recurrence Type</Label>
          <div className="grid grid-cols-2 gap-2">
            {recurrenceTypes.map((type) => (
              <Button
                key={type.value}
                variant={state.recurrenceType === type.value ? 'default' : 'outline'}
                onClick={() => dispatch({ type: 'SET_RECURRENCE_TYPE', payload: type.value })}
                className="w-full"
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="interval">
            Every {state.interval} {state.recurrenceType === 'daily' ? 'day(s)' : 
                    state.recurrenceType === 'weekly' ? 'week(s)' : 
                    state.recurrenceType === 'monthly' ? 'month(s)' : 'year(s)'}
          </Label>
          <Input
            id="interval"
            type="number"
            min="1"
            max="100"
            value={state.interval}
            onChange={(e) => dispatch({ type: 'SET_INTERVAL', payload: parseInt(e.target.value) || 1 })}
            className="w-20"
          />
        </div>

        {state.recurrenceType === 'weekly' && (
          <div className="space-y-2">
            <Label>Days of Week</Label>
            <div className="grid grid-cols-7 gap-1">
              {daysOfWeek.map((day) => (
                <Button
                  key={day.value}
                  variant={state.selectedDaysOfWeek.includes(day.value) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleDayOfWeekToggle(day.value)}
                  className="h-8 px-1 text-xs"
                >
                  {day.short}
                </Button>
              ))}
            </div>
          </div>
        )}

        {state.recurrenceType === 'monthly' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Monthly Pattern</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={state.monthlyPattern === 'date' ? 'default' : 'outline'}
                  onClick={() => dispatch({ type: 'SET_MONTHLY_PATTERN', payload: 'date' })}
                  className="w-full"
                >
                  By Date
                </Button>
                <Button
                  variant={state.monthlyPattern === 'weekday' ? 'default' : 'outline'}
                  onClick={() => dispatch({ type: 'SET_MONTHLY_PATTERN', payload: 'weekday' })}
                  className="w-full"
                >
                  By Weekday
                </Button>
              </div>
            </div>

            {state.monthlyPattern === 'weekday' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="week-of-month">Week of Month</Label>
                  <Select
                    value={state.weekOfMonth.toString()}
                    onValueChange={(value) => dispatch({ type: 'SET_WEEK_OF_MONTH', payload: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {weekOptions.map((week) => (
                        <SelectItem key={week.value} value={week.value.toString()}>
                          {week.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="day-of-week">Day of Week</Label>
                  <Select
                    value={state.dayOfWeek.toString()}
                    onValueChange={(value) => dispatch({ type: 'SET_DAY_OF_WEEK', payload: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {daysOfWeek.map((day) => (
                        <SelectItem key={day.value} value={day.value.toString()}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}