export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type MonthlyPattern = 'date' | 'weekday';

export interface RecurrenceState {
  recurrenceType: RecurrenceType;
  interval: number;
  startDate: Date;
  endDate?: Date;
  selectedDaysOfWeek: number[];
  monthlyPattern: MonthlyPattern;
  weekOfMonth: number;
  dayOfWeek: number;
  generatedDates: Date[];
  customEndDate: boolean;
}

export type RecurrenceAction =
  | { type: 'SET_RECURRENCE_TYPE'; payload: RecurrenceType }
  | { type: 'SET_INTERVAL'; payload: number }
  | { type: 'SET_START_DATE'; payload: Date }
  | { type: 'SET_END_DATE'; payload: Date | undefined }
  | { type: 'SET_SELECTED_DAYS_OF_WEEK'; payload: number[] }
  | { type: 'SET_MONTHLY_PATTERN'; payload: MonthlyPattern }
  | { type: 'SET_WEEK_OF_MONTH'; payload: number }
  | { type: 'SET_DAY_OF_WEEK'; payload: number }
  | { type: 'SET_GENERATED_DATES'; payload: Date[] }
  | { type: 'SET_CUSTOM_END_DATE'; payload: boolean };