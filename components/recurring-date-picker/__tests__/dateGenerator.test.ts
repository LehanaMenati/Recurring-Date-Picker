import { generateRecurringDates, isSameDay, getWeekOfMonth } from '../utils/dateGenerator';
import { RecurrenceState } from '../types/recurrence';

describe('dateGenerator', () => {
  const baseState: RecurrenceState = {
    recurrenceType: 'daily',
    interval: 1,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-10'),
    selectedDaysOfWeek: [],
    monthlyPattern: 'date',
    weekOfMonth: 1,
    dayOfWeek: 1,
    generatedDates: [],
    customEndDate: true,
  };

  describe('generateRecurringDates', () => {
    it('should generate daily recurring dates', () => {
      const state = { ...baseState, recurrenceType: 'daily' as const, interval: 1 };
      const dates = generateRecurringDates(state);
      
      expect(dates).toHaveLength(10);
      expect(dates[0]).toEqual(new Date('2024-01-01'));
      expect(dates[1]).toEqual(new Date('2024-01-02'));
      expect(dates[9]).toEqual(new Date('2024-01-10'));
    });

    it('should generate weekly recurring dates', () => {
      const state = { 
        ...baseState, 
        recurrenceType: 'weekly' as const, 
        interval: 1,
        endDate: new Date('2024-01-29')
      };
      const dates = generateRecurringDates(state);
      
      expect(dates).toHaveLength(5);
      expect(dates[0]).toEqual(new Date('2024-01-01'));
      expect(dates[1]).toEqual(new Date('2024-01-08'));
      expect(dates[2]).toEqual(new Date('2024-01-15'));
    });

    it('should generate weekly recurring dates with specific days', () => {
      const state = { 
        ...baseState, 
        recurrenceType: 'weekly' as const, 
        interval: 1,
        selectedDaysOfWeek: [1, 3, 5], // Monday, Wednesday, Friday
        endDate: new Date('2024-01-15')
      };
      const dates = generateRecurringDates(state);
      
      expect(dates.length).toBeGreaterThan(0);
      // All generated dates should be on Monday, Wednesday, or Friday
      dates.forEach(date => {
        expect([1, 3, 5]).toContain(date.getDay());
      });
    });

    it('should generate monthly recurring dates by date', () => {
      const state = { 
        ...baseState, 
        recurrenceType: 'monthly' as const, 
        interval: 1,
        monthlyPattern: 'date' as const,
        endDate: new Date('2024-06-01')
      };
      const dates = generateRecurringDates(state);
      
      expect(dates).toHaveLength(6);
      dates.forEach(date => {
        expect(date.getDate()).toBe(1);
      });
    });

    it('should generate monthly recurring dates by weekday', () => {
      const state = { 
        ...baseState, 
        recurrenceType: 'monthly' as const, 
        interval: 1,
        monthlyPattern: 'weekday' as const,
        weekOfMonth: 1,
        dayOfWeek: 1, // First Monday
        endDate: new Date('2024-06-01')
      };
      const dates = generateRecurringDates(state);
      
      expect(dates.length).toBeGreaterThan(0);
      dates.forEach(date => {
        expect(date.getDay()).toBe(1); // All should be Mondays
      });
    });

    it('should generate yearly recurring dates', () => {
      const state = { 
        ...baseState, 
        recurrenceType: 'yearly' as const, 
        interval: 1,
        endDate: new Date('2027-01-01')
      };
      const dates = generateRecurringDates(state);
      
      expect(dates).toHaveLength(4);
      expect(dates[0]).toEqual(new Date('2024-01-01'));
      expect(dates[1]).toEqual(new Date('2025-01-01'));
      expect(dates[2]).toEqual(new Date('2026-01-01'));
      expect(dates[3]).toEqual(new Date('2027-01-01'));
    });

    it('should respect custom intervals', () => {
      const state = { 
        ...baseState, 
        recurrenceType: 'daily' as const, 
        interval: 3,
        endDate: new Date('2024-01-10')
      };
      const dates = generateRecurringDates(state);
      
      expect(dates).toHaveLength(4);
      expect(dates[0]).toEqual(new Date('2024-01-01'));
      expect(dates[1]).toEqual(new Date('2024-01-04'));
      expect(dates[2]).toEqual(new Date('2024-01-07'));
      expect(dates[3]).toEqual(new Date('2024-01-10'));
    });
  });

  describe('isSameDay', () => {
    it('should return true for same dates', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-01');
      expect(isSameDay(date1, date2)).toBe(true);
    });

    it('should return false for different dates', () => {
      const date1 = new Date('2024-01-01');
      const date2 = new Date('2024-01-02');
      expect(isSameDay(date1, date2)).toBe(false);
    });

    it('should return true for same date with different times', () => {
      const date1 = new Date('2024-01-01T08:00:00');
      const date2 = new Date('2024-01-01T18:00:00');
      expect(isSameDay(date1, date2)).toBe(true);
    });
  });

  describe('getWeekOfMonth', () => {
    it('should return correct week for first week', () => {
      const date = new Date('2024-01-01');
      expect(getWeekOfMonth(date)).toBe(1);
    });

    it('should return correct week for second week', () => {
      const date = new Date('2024-01-08');
      expect(getWeekOfMonth(date)).toBe(2);
    });

    it('should return correct week for last day of month', () => {
      const date = new Date('2024-01-31');
      expect(getWeekOfMonth(date)).toBe(5);
    });
  });
});