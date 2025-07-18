'use client';

import { useRecurrence } from '../context/RecurrenceContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Repeat, Zap } from 'lucide-react';

const recurrenceTypes = [
  { value: 'daily', label: 'Daily', icon: Clock, color: 'from-blue-500 to-cyan-500' },
  { value: 'weekly', label: 'Weekly', icon: Calendar, color: 'from-purple-500 to-pink-500' },
  { value: 'monthly', label: 'Monthly', icon: Repeat, color: 'from-green-500 to-teal-500' },
  { value: 'yearly', label: 'Yearly', icon: Zap, color: 'from-orange-500 to-red-500' },
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
    <Card className="bg-gradient-to-br from-white to-gray-50/50 border-0 shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <Label htmlFor="recurrence-type" className="text-base font-semibold text-gray-700 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
            Recurrence Type
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {recurrenceTypes.map((type) => (
              const Icon = type.icon;
              return (
              <Button
                key={type.value}
                variant="outline"
                onClick={() => dispatch({ type: 'SET_RECURRENCE_TYPE', payload: type.value })}
                className={cn(
                  'w-full h-14 relative overflow-hidden transition-all duration-300 hover:scale-105',
                  state.recurrenceType === type.value
                    ? `bg-gradient-to-r ${type.color} text-white border-0 shadow-lg`
                    : 'bg-white hover:bg-gray-50 border-gray-200'
                )}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {type.label}
                </div>
                {state.recurrenceType === type.value && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                )}
              </Button>
              );
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="interval" className="text-base font-semibold text-gray-700 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
            Every {state.interval} {state.recurrenceType === 'daily' ? 'day(s)' : 
                    state.recurrenceType === 'weekly' ? 'week(s)' : 
                    state.recurrenceType === 'monthly' ? 'month(s)' : 'year(s)'}
          </Label>
          <div className="flex items-center gap-3">
            <Input
              id="interval"
              type="number"
              min="1"
              max="100"
              value={state.interval}
              onChange={(e) => dispatch({ type: 'SET_INTERVAL', payload: parseInt(e.target.value) || 1 })}
              className="w-24 h-12 text-center font-semibold text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            />
            <div className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
              <span className="text-sm font-medium text-gray-700">
                {state.recurrenceType === 'daily' ? 'Days' : 
                 state.recurrenceType === 'weekly' ? 'Weeks' : 
                 state.recurrenceType === 'monthly' ? 'Months' : 'Years'}
              </span>
            </div>
          </div>
        </div>

        {state.recurrenceType === 'weekly' && (
          <div className="space-y-4 animate-slide-up">
            <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              Days of Week
            </Label>
            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map((day) => (
                <Button
                  key={day.value}
                  variant="outline"
                  size="sm"
                  onClick={() => handleDayOfWeekToggle(day.value)}
                  className={cn(
                    'h-12 px-2 text-xs font-medium transition-all duration-300 hover:scale-105',
                    state.selectedDaysOfWeek.includes(day.value)
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-lg'
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  )}
                >
                  {day.short}
                </Button>
              ))}
            </div>
          </div>
        )}

        {state.recurrenceType === 'monthly' && (
          <div className="space-y-6 animate-slide-up">
            <div className="space-y-4">
              <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                Monthly Pattern
              </Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => dispatch({ type: 'SET_MONTHLY_PATTERN', payload: 'date' })}
                  className={cn(
                    'w-full h-12 transition-all duration-300 hover:scale-105',
                    state.monthlyPattern === 'date'
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white border-0 shadow-lg'
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  )}
                >
                  📅 By Date
                </Button>
                <Button
                  variant="outline"
                  onClick={() => dispatch({ type: 'SET_MONTHLY_PATTERN', payload: 'weekday' })}
                  className={cn(
                    'w-full h-12 transition-all duration-300 hover:scale-105',
                    state.monthlyPattern === 'weekday'
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white border-0 shadow-lg'
                      : 'bg-white hover:bg-gray-50 border-gray-200'
                  )}
                >
                  📆 By Weekday
                </Button>
              </div>
            </div>

            {state.monthlyPattern === 'weekday' && (
              <div className="grid grid-cols-2 gap-6 animate-slide-up">
                <div className="space-y-3">
                  <Label htmlFor="week-of-month" className="text-sm font-medium text-gray-700">Week of Month</Label>
                  <Select
                    value={state.weekOfMonth.toString()}
                    onValueChange={(value) => dispatch({ type: 'SET_WEEK_OF_MONTH', payload: parseInt(value) })}
                  >
                    <SelectTrigger className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-0 shadow-xl">
                      {weekOptions.map((week) => (
                        <SelectItem key={week.value} value={week.value.toString()}>
                          {week.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="day-of-week" className="text-sm font-medium text-gray-700">Day of Week</Label>
                  <Select
                    value={state.dayOfWeek.toString()}
                    onValueChange={(value) => dispatch({ type: 'SET_DAY_OF_WEEK', payload: parseInt(value) })}
                  >
                    <SelectTrigger className="h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-0 shadow-xl">
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