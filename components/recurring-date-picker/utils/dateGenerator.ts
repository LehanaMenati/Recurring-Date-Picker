import { RecurrenceState } from '../types/recurrence';

export function generateRecurringDates(state: RecurrenceState): Date[] {
  const {
    recurrenceType,
    interval,
    startDate,
    endDate,
    selectedDaysOfWeek,
    monthlyPattern,
    weekOfMonth,
    dayOfWeek,
  } = state;

  const dates: Date[] = [];
  const maxDates = 50; // Limit to prevent infinite loops
  const defaultEndDate = new Date(startDate);
  defaultEndDate.setFullYear(defaultEndDate.getFullYear() + 1);
  
  const finalEndDate = endDate || defaultEndDate;
  let currentDate = new Date(startDate);

  while (dates.length < maxDates && currentDate <= finalEndDate) {
    switch (recurrenceType) {
      case 'daily':
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + interval);
        break;

      case 'weekly':
        if (selectedDaysOfWeek.length === 0) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + (interval * 7));
        } else {
          const weekStart = new Date(currentDate);
          weekStart.setDate(weekStart.getDate() - weekStart.getDay());
          
          for (const dayOfWeek of selectedDaysOfWeek) {
            const date = new Date(weekStart);
            date.setDate(date.getDate() + dayOfWeek);
            
            if (date >= startDate && date <= finalEndDate) {
              dates.push(new Date(date));
            }
          }
          
          currentDate.setDate(currentDate.getDate() + (interval * 7));
        }
        break;

      case 'monthly':
        if (monthlyPattern === 'date') {
          const targetDate = startDate.getDate();
          const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), targetDate);
          
          if (newDate.getDate() === targetDate) {
            dates.push(new Date(newDate));
          }
          
          currentDate.setMonth(currentDate.getMonth() + interval);
        } else {
          const targetWeekday = dayOfWeek;
          const targetWeek = weekOfMonth;
          const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          
          const firstWeekday = monthStart.getDay();
          const daysToAdd = (targetWeekday - firstWeekday + 7) % 7;
          const firstTargetWeekday = new Date(monthStart);
          firstTargetWeekday.setDate(1 + daysToAdd);
          
          const targetDate = new Date(firstTargetWeekday);
          targetDate.setDate(targetDate.getDate() + ((targetWeek - 1) * 7));
          
          if (targetDate.getMonth() === currentDate.getMonth()) {
            dates.push(new Date(targetDate));
          }
          
          currentDate.setMonth(currentDate.getMonth() + interval);
        }
        break;

      case 'yearly':
        dates.push(new Date(currentDate));
        currentDate.setFullYear(currentDate.getFullYear() + interval);
        break;
    }
  }

  return dates.sort((a, b) => a.getTime() - b.getTime());
}

export function formatDateForDisplay(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function getWeekOfMonth(date: Date): number {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstWeekday = firstDayOfMonth.getDay();
  const dayOfMonth = date.getDate();
  
  return Math.ceil((dayOfMonth + firstWeekday) / 7);
}

export function getDayOfWeek(date: Date): number {
  return date.getDay();
}