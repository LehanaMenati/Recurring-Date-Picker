import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecurringDatePicker } from '../RecurringDatePicker';

// Mock the date to ensure consistent testing
const mockDate = new Date('2024-01-01');
jest.useFakeTimers();
jest.setSystemTime(mockDate);

describe('RecurringDatePicker', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<RecurringDatePicker />);
    expect(screen.getByText('Recurring Date Configuration')).toBeInTheDocument();
  });

  it('should display all recurrence type options', () => {
    render(<RecurringDatePicker />);
    
    expect(screen.getByText('Daily')).toBeInTheDocument();
    expect(screen.getByText('Weekly')).toBeInTheDocument();
    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.getByText('Yearly')).toBeInTheDocument();
  });

  it('should allow changing recurrence type', async () => {
    const mockOnSelectionChange = jest.fn();
    render(<RecurringDatePicker onSelectionChange={mockOnSelectionChange} />);
    
    const weeklyButton = screen.getByText('Weekly');
    fireEvent.click(weeklyButton);
    
    await waitFor(() => {
      expect(mockOnSelectionChange).toHaveBeenCalledWith(
        expect.objectContaining({
          recurrenceType: 'weekly'
        })
      );
    });
  });

  it('should display interval input', () => {
    render(<RecurringDatePicker />);
    
    const intervalInput = screen.getByDisplayValue('1');
    expect(intervalInput).toBeInTheDocument();
    expect(intervalInput).toHaveAttribute('type', 'number');
  });

  it('should allow changing interval', async () => {
    const mockOnSelectionChange = jest.fn();
    render(<RecurringDatePicker onSelectionChange={mockOnSelectionChange} />);
    
    const intervalInput = screen.getByDisplayValue('1');
    fireEvent.change(intervalInput, { target: { value: '3' } });
    
    await waitFor(() => {
      expect(mockOnSelectionChange).toHaveBeenCalledWith(
        expect.objectContaining({
          interval: 3
        })
      );
    });
  });

  it('should show day selection for weekly recurrence', () => {
    render(<RecurringDatePicker />);
    
    const weeklyButton = screen.getByText('Weekly');
    fireEvent.click(weeklyButton);
    
    expect(screen.getByText('Days of Week')).toBeInTheDocument();
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('Tue')).toBeInTheDocument();
    expect(screen.getByText('Wed')).toBeInTheDocument();
    expect(screen.getByText('Thu')).toBeInTheDocument();
    expect(screen.getByText('Fri')).toBeInTheDocument();
    expect(screen.getByText('Sat')).toBeInTheDocument();
  });

  it('should show monthly pattern options for monthly recurrence', () => {
    render(<RecurringDatePicker />);
    
    const monthlyButton = screen.getByText('Monthly');
    fireEvent.click(monthlyButton);
    
    expect(screen.getByText('Monthly Pattern')).toBeInTheDocument();
    expect(screen.getByText('By Date')).toBeInTheDocument();
    expect(screen.getByText('By Weekday')).toBeInTheDocument();
  });

  it('should show weekday pattern options when monthly by weekday is selected', () => {
    render(<RecurringDatePicker />);
    
    const monthlyButton = screen.getByText('Monthly');
    fireEvent.click(monthlyButton);
    
    const byWeekdayButton = screen.getByText('By Weekday');
    fireEvent.click(byWeekdayButton);
    
    expect(screen.getByText('Week of Month')).toBeInTheDocument();
    expect(screen.getByText('Day of Week')).toBeInTheDocument();
  });

  it('should display calendar preview', () => {
    render(<RecurringDatePicker />);
    
    expect(screen.getByText('Calendar Preview')).toBeInTheDocument();
    expect(screen.getByText('Calendar View')).toBeInTheDocument();
    expect(screen.getByText('Recurrence Pattern')).toBeInTheDocument();
  });

  it('should show custom end date option', () => {
    render(<RecurringDatePicker />);
    
    expect(screen.getByText('Set custom end date')).toBeInTheDocument();
  });

  it('should call onSelectionChange when configuration changes', async () => {
    const mockOnSelectionChange = jest.fn();
    render(<RecurringDatePicker onSelectionChange={mockOnSelectionChange} />);
    
    // Initial call should happen on mount
    await waitFor(() => {
      expect(mockOnSelectionChange).toHaveBeenCalledWith(
        expect.objectContaining({
          recurrenceType: 'daily',
          interval: 1,
          generatedDates: expect.any(Array)
        })
      );
    });
  });
});