'use client';

import { useRecurrence } from '../context/RecurrenceContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { CalendarIcon, Clock, Calendar as CalendarLucide } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function DateRangePicker() {
  const { state, dispatch } = useRecurrence();

  const handleStartDateChange = (date: Date | undefined) => {
    if (date) {
      dispatch({ type: 'SET_START_DATE', payload: date });
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    dispatch({ type: 'SET_END_DATE', payload: date });
  };

  const handleCustomEndDateToggle = (checked: boolean) => {
    dispatch({ type: 'SET_CUSTOM_END_DATE', payload: checked });
    if (!checked) {
      dispatch({ type: 'SET_END_DATE', payload: undefined });
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50/50 border-0 shadow-lg rounded-2xl overflow-hidden">
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <Clock className="w-4 h-4" />
            Start Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full h-14 justify-start text-left font-medium bg-white border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all duration-300 hover:scale-102',
                  !state.startDate && 'text-muted-foreground'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                    <CalendarIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Start Date</div>
                    <div className="font-semibold">
                      {state.startDate ? format(state.startDate, 'EEEE, MMMM do, yyyy') : 'Pick a date'}
                    </div>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-0 shadow-2xl rounded-2xl" align="start">
              <Calendar
                mode="single"
                selected={state.startDate}
                onSelect={handleStartDateChange}
                initialFocus
                className="rounded-2xl"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
          <Switch
            id="custom-end-date"
            checked={state.customEndDate}
            onCheckedChange={handleCustomEndDateToggle}
            className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-600"
          />
          <Label htmlFor="custom-end-date" className="font-medium text-gray-700 cursor-pointer">
            Set custom end date
          </Label>
        </div>

        {state.customEndDate && (
          <div className="space-y-4 animate-slide-up">
            <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              <CalendarLucide className="w-4 h-4" />
              End Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full h-14 justify-start text-left font-medium bg-white border-2 border-gray-200 rounded-xl hover:border-red-500 transition-all duration-300 hover:scale-102',
                    !state.endDate && 'text-muted-foreground'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg">
                      <CalendarIcon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">End Date</div>
                      <div className="font-semibold">
                        {state.endDate ? format(state.endDate, 'EEEE, MMMM do, yyyy') : 'Pick an end date'}
                      </div>
                    </div>
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-0 shadow-2xl rounded-2xl" align="start">
                <Calendar
                  mode="single"
                  selected={state.endDate}
                  onSelect={handleEndDateChange}
                  initialFocus
                  disabled={(date) => date < state.startDate}
                  className="rounded-2xl"
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </CardContent>
    </Card>
  );
}