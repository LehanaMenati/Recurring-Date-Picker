'use client';

import { useRecurrence } from '../context/RecurrenceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar } from '@/components/ui/calendar';
import { formatDateForDisplay, isSameDay } from '../utils/dateGenerator';
import { CalendarDays, Clock, Sparkles, TrendingUp, Eye } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-gradient-to-br from-white to-blue-50/30 border-0 shadow-xl rounded-2xl overflow-hidden animate-slide-up">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
              <CalendarDays className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Interactive Calendar
            </span>
            <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
          </CardTitle>
          <p className="text-gray-600 text-sm">Visual representation of your recurring pattern</p>
        </CardHeader>
        <CardContent className="relative z-10">
          <Calendar
            mode="multiple"
            selected={state.generatedDates}
            className="rounded-xl border-2 border-gray-100 shadow-inner bg-white/50 backdrop-blur-sm"
            modifiers={{
              recurring: isRecurringDate,
            }}
            modifiersStyles={{
              recurring: {
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '8px',
                transform: 'scale(1.1)',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              },
            }}
          />
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-white to-purple-50/30 border-0 shadow-xl rounded-2xl overflow-hidden animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center gap-3 text-xl font-bold">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <Clock className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Smart Analysis
            </span>
            <TrendingUp className="h-4 w-4 text-green-500 animate-pulse" />
          </CardTitle>
          <p className="text-gray-600 text-sm">Intelligent insights about your recurring pattern</p>
        </CardHeader>
        <CardContent className="relative z-10 space-y-6">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Pattern Summary</span>
            </div>
            <p className="text-sm font-medium text-blue-900 leading-relaxed">
              {getRecurrenceDescription()}
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
              <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Generated Dates
              </span>
              <Badge 
                variant="secondary" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-3 py-1 font-semibold"
              >
                <AnimatedCounter value={state.generatedDates.length} /> dates
              </Badge>
            </div>
            
            <ScrollArea className="h-56 w-full rounded-xl border-2 border-gray-100 bg-white/50 backdrop-blur-sm p-3">
              <div className="space-y-2">
                {state.generatedDates.slice(0, 20).map((date, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 hover:scale-102 group"
                  >
                    <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900">
                      {formatDateForDisplay(date)}
                    </span>
                    <Badge 
                      variant="outline" 
                      className="text-xs bg-white border-gray-200 group-hover:border-blue-300 group-hover:bg-blue-50 transition-colors"
                    >
                      {index + 1}
                    </Badge>
                  </div>
                ))}
                {state.generatedDates.length > 20 && (
                  <div className="p-3 text-center">
                    <Badge variant="secondary" className="bg-gradient-to-r from-gray-100 to-blue-100 text-gray-600">
                      +{state.generatedDates.length - 20} more dates
                    </Badge>
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