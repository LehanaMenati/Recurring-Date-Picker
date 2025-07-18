'use client';

import { useRecurrence } from '../context/RecurrenceContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { CalendarIcon } from 'lucide-react';
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
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label>Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !state.startDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {state.startDate ? format(state.startDate, 'PPP') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={state.startDate}
                onSelect={handleStartDateChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="custom-end-date"
            checked={state.customEndDate}
            onCheckedChange={handleCustomEndDateToggle}
          />
          <Label htmlFor="custom-end-date">Set custom end date</Label>
        </div>

        {state.customEndDate && (
          <div className="space-y-2">
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !state.endDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {state.endDate ? format(state.endDate, 'PPP') : 'Pick an end date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={state.endDate}
                  onSelect={handleEndDateChange}
                  initialFocus
                  disabled={(date) => date < state.startDate}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
      </CardContent>
    </Card>
  );
}