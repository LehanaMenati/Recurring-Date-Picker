# Recurring Date Picker Component

A comprehensive and reusable recurring date picker component built with React, Next.js, and Tailwind CSS. This component provides a user-friendly interface for selecting recurring dates with various patterns, similar to popular calendar applications.

## Features

### Core Functionality
- **Multiple Recurrence Types**: Daily, Weekly, Monthly, and Yearly patterns
- **Flexible Intervals**: Configure custom intervals (every X days/weeks/months/years)
- **Day Selection**: Choose specific days of the week for weekly patterns
- **Advanced Monthly Patterns**: Support for both date-based and weekday-based monthly recurrence
- **Date Range Selection**: Set start and optional end dates
- **Calendar Preview**: Visual representation of selected recurring dates

### Advanced Features
- **Complex Monthly Patterns**: "The second Tuesday of every month" style patterns
- **Real-time Preview**: See generated dates as you configure the pattern
- **Responsive Design**: Works seamlessly across all device sizes
- **Accessible UI**: Built with accessibility best practices
- **TypeScript Support**: Full type safety throughout the component

## Technical Stack

- **Framework**: Next.js 13.5.1
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API with useReducer
- **Testing**: Jest with React Testing Library
- **TypeScript**: Full type safety
- **Date Utilities**: date-fns for date manipulation

## Installation

```bash
npm install
```

## Usage

```tsx
import { RecurringDatePicker } from '@/components/recurring-date-picker/RecurringDatePicker';

function App() {
  const handleDateSelection = (selection) => {
    console.log('Selected recurring dates:', selection);
  };

  return (
    <RecurringDatePicker
      onSelectionChange={handleDateSelection}
      initialStartDate={new Date()}
      className="w-full max-w-4xl mx-auto"
    />
  );
}
```

## Component Architecture

The component is broken down into modular, reusable parts:

### Core Components
- **RecurringDatePicker**: Main wrapper component
- **RecurrenceOptions**: Handles recurrence type and pattern selection
- **DateRangePicker**: Manages start and end date selection
- **CalendarPreview**: Displays generated dates in calendar and list views

### State Management
- **RecurrenceContext**: Centralized state management using React Context
- **useRecurrence**: Custom hook for accessing recurrence state

### Utilities
- **dateGenerator**: Core logic for generating recurring dates
- **Date utilities**: Helper functions for date manipulation and formatting

## Testing

The component includes comprehensive tests covering:

### Unit Tests
- Date generation logic for all recurrence types
- Utility functions for date manipulation
- Component state management

### Integration Tests
- Complete component functionality
- User interactions and state updates
- Calendar preview accuracy

Run tests:
```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## Customization Options

### Recurrence Types
- **Daily**: Every N days
- **Weekly**: Every N weeks, with optional day selection
- **Monthly**: By date or by weekday pattern
- **Yearly**: Every N years

### Monthly Patterns
- **By Date**: Same date each month (e.g., 15th of every month)
- **By Weekday**: Specific weekday of specific week (e.g., 2nd Tuesday)

### Advanced Configuration
- Custom intervals (1-100)
- Multiple day selection for weekly patterns
- Flexible end date options
- Maximum date generation limits for performance

## API Reference

### RecurringDatePicker Props
```tsx
interface RecurringDatePickerProps {
  onSelectionChange?: (selection: RecurrenceSelection) => void;
  className?: string;
  initialStartDate?: Date;
  initialEndDate?: Date;
}
```

### RecurrenceSelection Object
```tsx
interface RecurrenceSelection {
  recurrenceType: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  startDate: Date;
  endDate?: Date;
  selectedDaysOfWeek: number[];
  monthlyPattern: 'date' | 'weekday';
  weekOfMonth: number;
  dayOfWeek: number;
  generatedDates: Date[];
}
```

## Performance Considerations

- **Date Generation Limit**: Maximum 50 dates to prevent performance issues
- **Memoized Calculations**: Expensive operations are optimized
- **Efficient Re-renders**: Context updates only when necessary
- **Lazy Loading**: Calendar preview renders only visible dates

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

MIT License - see LICENSE file for details