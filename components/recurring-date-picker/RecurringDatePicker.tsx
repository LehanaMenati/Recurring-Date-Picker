'use client';

import { useState, useEffect } from 'react';
import { RecurrenceProvider } from './context/RecurrenceContext';
import { RecurrenceOptions } from './components/RecurrenceOptions';
import { DateRangePicker } from './components/DateRangePicker';
import { CalendarPreview } from './components/CalendarPreview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Settings, Calendar, Eye, Sparkles } from 'lucide-react';

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
  const [activeSection, setActiveSection] = useState<string>('pattern');
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <RecurrenceProvider
      onSelectionChange={onSelectionChange}
      initialStartDate={initialStartDate}
      initialEndDate={initialEndDate}
    >
      <div className={cn('space-y-8', className, isVisible && 'animate-fade-in')}>
        <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
          <CardHeader className="relative z-10 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Smart Configuration
              </CardTitle>
              <Badge variant="secondary" className="ml-auto bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
            <p className="text-gray-600 text-lg">Design your perfect recurring schedule with intelligent pattern recognition</p>
            
            {/* Section Navigation */}
            <div className="flex gap-2 mt-6">
              {[
                { id: 'pattern', label: 'Pattern', icon: Settings },
                { id: 'dates', label: 'Dates', icon: Calendar },
                { id: 'preview', label: 'Preview', icon: Eye }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300',
                    activeSection === id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-102'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="relative z-10 space-y-8">
            <div className={cn(
              'transition-all duration-500 transform',
              activeSection === 'pattern' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 absolute inset-0 pointer-events-none'
            )}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6 animate-slide-up">
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    Recurrence Pattern
                  </h3>
                  <RecurrenceOptions />
                </div>
                
                <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-600 rounded-full"></div>
                    Date Range
                  </h3>
                  <DateRangePicker />
                </div>
              </div>
            </div>
            
            <div className={cn(
              'transition-all duration-500 transform',
              activeSection === 'preview' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 absolute inset-0 pointer-events-none'
            )}>
              <Separator className="my-8 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            
              <div className="space-y-6 animate-slide-up">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                  Interactive Preview
                </h3>
                <CalendarPreview />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </RecurrenceProvider>
  );
}