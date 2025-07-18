'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { RecurrenceState, RecurrenceAction } from '../types/recurrence';
import { generateRecurringDates } from '../utils/dateGenerator';

const initialState: RecurrenceState = {
  recurrenceType: 'daily',
  interval: 1,
  startDate: new Date(),
  endDate: undefined,
  selectedDaysOfWeek: [],
  monthlyPattern: 'date',
  weekOfMonth: 1,
  dayOfWeek: 1,
  generatedDates: [],
  customEndDate: false,
};

function recurrenceReducer(state: RecurrenceState, action: RecurrenceAction): RecurrenceState {
  switch (action.type) {
    case 'SET_RECURRENCE_TYPE':
      return { ...state, recurrenceType: action.payload };
    case 'SET_INTERVAL':
      return { ...state, interval: action.payload };
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload };
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload };
    case 'SET_SELECTED_DAYS_OF_WEEK':
      return { ...state, selectedDaysOfWeek: action.payload };
    case 'SET_MONTHLY_PATTERN':
      return { ...state, monthlyPattern: action.payload };
    case 'SET_WEEK_OF_MONTH':
      return { ...state, weekOfMonth: action.payload };
    case 'SET_DAY_OF_WEEK':
      return { ...state, dayOfWeek: action.payload };
    case 'SET_GENERATED_DATES':
      return { ...state, generatedDates: action.payload };
    case 'SET_CUSTOM_END_DATE':
      return { ...state, customEndDate: action.payload };
    default:
      return state;
  }
}

const RecurrenceContext = createContext<{
  state: RecurrenceState;
  dispatch: React.Dispatch<RecurrenceAction>;
} | null>(null);

interface RecurrenceProviderProps {
  children: ReactNode;
  onSelectionChange?: (selection: any) => void;
  initialStartDate?: Date;
  initialEndDate?: Date;
}

export function RecurrenceProvider({
  children,
  onSelectionChange,
  initialStartDate,
  initialEndDate,
}: RecurrenceProviderProps) {
  const [state, dispatch] = useReducer(recurrenceReducer, {
    ...initialState,
    startDate: initialStartDate || new Date(),
    endDate: initialEndDate,
    customEndDate: !!initialEndDate,
  });

  useEffect(() => {
    const dates = generateRecurringDates(state);
    dispatch({ type: 'SET_GENERATED_DATES', payload: dates });
    
    if (onSelectionChange) {
      onSelectionChange({
        ...state,
        generatedDates: dates,
      });
    }
  }, [
    state.recurrenceType,
    state.interval,
    state.startDate,
    state.endDate,
    state.selectedDaysOfWeek,
    state.monthlyPattern,
    state.weekOfMonth,
    state.dayOfWeek,
    onSelectionChange,
  ]);

  return (
    <RecurrenceContext.Provider value={{ state, dispatch }}>
      {children}
    </RecurrenceContext.Provider>
  );
}

export function useRecurrence() {
  const context = useContext(RecurrenceContext);
  if (!context) {
    throw new Error('useRecurrence must be used within a RecurrenceProvider');
  }
  return context;
}