<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# EkaAI Frontend Project Instructions

This is a React TypeScript project built with Vite for the EkaAI platform. The project follows enterprise-grade coding standards and architectural principles.

## Design System
- **Color Palette**: Dark theme with charcoal background (#1A1A1A), yellow accent (#FFD700), and off-white text (#F5F5F5)
- **Typography**: Poppins for headlines, Inter for body text
- **Component Architecture**: Modular React components with TypeScript
- **Styling**: Tailwind CSS v4+ with custom color configuration

## Project Structure

The project follows enterprise-grade architectural patterns with clear separation of concerns:

- `/src/components/` - React components organized by type and purpose
- `/src/components/ui/` - Reusable UI components (Button, Input, Card, etc.)
- `/src/components/common/` - Layout components and shared patterns
- `/src/components/forms/` - Form-specific components with both original and refactored versions
- `/src/hooks/` - Custom React hooks for state management and logic
- `/src/constants/` - Centralized application constants and data
- `/src/utils/` - Utility functions for validation, formatting, etc.
- `/src/services/` - API service layer for backend integration
- Custom Tailwind configuration in `tailwind.config.ts`, Docs for v4.0 is available at [Tailwind CSS Documentation](https://tailwindcss.com/docs/*) - regex link
- React Router DOM for client-side routing
- Responsive design principles (mobile-first)
- Clean, modern UI with subtle animations and hover effects

## Architectural Principles

### Component Architecture
Always prefer composition over inheritance when building React components. Use the established UI component library for consistency:

```typescript
// Preferred: Use reusable UI components
import { Button, Input, Card } from '../components/ui';

const MyComponent: React.FC = () => (
  <Card>
    <Input label="Name" />
    <Button>Submit</Button>
  </Card>
);

// Avoid: Creating custom styled components for common elements
const MyComponent: React.FC = () => (
  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
    <input className="px-4 py-3 bg-gray-900/50..." />
    <button className="bg-primary-accent text-primary-bg...">Submit</button>
  </div>
);
```

### State Management Patterns
Use custom hooks for complex state logic and side effects:

```typescript
// Preferred: Custom hooks for reusable logic
import { useForm } from '../hooks/useForm';
import { useLoading } from '../hooks/useLoading';

const FormComponent: React.FC = () => {
  const { formData, errors, handleChange, handleSubmit } = useForm({...});
  const { isLoading, executeAsync } = useLoading();
  // Component logic
};

// Avoid: Inline state management in components
const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  // Repetitive form logic
};
```

### Form Development Standards
Use the centralized form system for all form-related components:

```typescript
import { useForm } from '../hooks/useForm';
import { Button, Input, Select, CheckboxGroup } from '../components/ui';
import { SUBJECT_OPTIONS, GRADE_OPTIONS } from '../constants';
import type { FormField } from '../utils/formValidation';

const MyForm: React.FC = () => {
  const formFields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'grade', label: 'Grade', type: 'select', required: true }
  ];

  const { formData, errors, handleChange, handleSubmit } = useForm({
    initialData: { name: '', grade: '' },
    fields: formFields,
    onSubmit: async (data) => { /* submit logic */ }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Input name="name" value={formData.name} onChange={handleChange} error={errors.name} />
      <Select name="grade" value={formData.grade} onChange={handleChange} options={GRADE_OPTIONS} />
      <Button type="submit">Submit</Button>
    </form>
  );
};
```
- Custom Tailwind configuration in `tailwind.config.ts`, Docs for v4.0 is available at [Tailwind CSS Documentation](https://tailwindcss.com/docs/*) - regex link
- React Router DOM for client-side routing
- Responsive design principles (mobile-first)
- Clean, modern UI with subtle animations and hover effects

## Key Features
- Landing page with Hero, Student Features, Educator Features, and Waitlist sections
- AI-powered doubt clearing system with real-time chat interface
- Multi-role waitlist registration system (Students, Instructors, Universities)
- Route-based navigation with React Router DOM
- Comprehensive form validation and error handling
- API-ready service layer for backend integration
- Responsive navigation with smooth routing transitions
- Modern card-based layouts with hover effects
- Accessibility considerations (proper semantic HTML, focus states)

## SOLID Principles Implementation

### Single Responsibility Principle (SRP)
- Each component has one clear purpose and reason to change
- Separate components for UI logic, business logic, and data management
- Forms handle only form-specific concerns, not API calls
- Service classes handle only API communication

### Open/Closed Principle (OCP)
- Components are open for extension but closed for modification
- Use composition patterns for component reusability
- Abstract common functionality into reusable hooks
- Leverage TypeScript interfaces for contract definitions

### Liskov Substitution Principle (LSP)
- Form components can be substituted without breaking functionality
- Consistent interface contracts across similar components
- Predictable behavior for component hierarchies

### Interface Segregation Principle (ISP)
- Create specific interfaces for different component needs
- Avoid forcing components to depend on unused interface methods
- Split large interfaces into smaller, focused ones

### Dependency Inversion Principle (DIP)
- Components depend on abstractions (interfaces) not concrete implementations
- Service layer abstracts API implementation details
- Use dependency injection patterns where applicable

## Object-Oriented Concepts

### Encapsulation
- Private state management within components
- Controlled access to component internals through props/callbacks
- Service classes encapsulate API logic and error handling

### Inheritance (Composition over Inheritance)
- Favor React component composition over class inheritance
- Use higher-order components (HOCs) and custom hooks for code reuse
- Implement shared functionality through mixins and utility functions

### Polymorphism
- Components accept different prop types while maintaining consistent interfaces
- Service methods handle various data types through method overloading
- Form components handle different user types with consistent behavior

### Abstraction
- Abstract complex UI patterns into reusable components
- Hide implementation details behind clean, simple interfaces
- Create abstraction layers for API communication

## Code Style & Structure

### Component Organization
- **Single Responsibility**: Each component should have one clear purpose
- **Composition**: Build complex UI through component composition
- **Reusability**: Use the established UI component library
- **Consistency**: Follow established patterns for similar components

### File Naming Conventions
- **Components**: PascalCase (e.g., `StudentDashboard.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useForm.ts`)
- **Utils**: camelCase (e.g., `formValidation.ts`)
- **Constants**: camelCase with descriptive names (e.g., `index.ts`)
- **Refactored Files**: Add "Refactored" suffix to maintain both versions

### Import Organization
```typescript
// 1. React and external libraries
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Internal hooks and utilities
import { useForm } from '../hooks/useForm';
import { validateForm } from '../utils/formValidation';

// 3. UI components
import { Button, Input, Card } from '../components/ui';

// 4. Constants and types
import { SUBJECT_OPTIONS } from '../constants';
import type { FormData } from '../types/forms';
```

### TypeScript Best Practices
- **Strong Typing**: Use explicit types, avoid `any`
- **Interface Definitions**: Define clear contracts for all data structures
- **Generic Types**: Use generics for reusable component patterns
- **Const Assertions**: Prefer `const` assertions for type safety
- **Type Imports**: Use `import type` for type-only imports
- **Readonly Arrays**: Use `ReadonlyArray` for immutable data

### React Best Practices
- **Functional Components**: Use functional components with hooks exclusively
- **Custom Hooks**: Extract complex logic into reusable custom hooks
- **Component Composition**: Build complex UI through component composition
- **Props Validation**: Use TypeScript interfaces for prop validation
- **State Management**: Use custom hooks for complex state, context for global state
- **UI Components**: Always use the established UI component library
- **Layout Components**: Use common layout patterns for consistency

### Component Architecture Patterns
```typescript
// Standard Component Structure
interface ComponentProps {
  // Clear prop interface with proper typing
}

const Component: React.FC<ComponentProps> = ({ ...props }) => {
  // 1. Custom hooks for state and logic
  const { formData, handleChange } = useForm({...});
  const { isLoading } = useLoading();
  
  // 2. Event handlers and effects
  useEffect(() => { /* side effects */ }, []);
  
  // 3. Render with UI components
  return (
    <Card>
      <Input {...inputProps} />
      <Button loading={isLoading}>Submit</Button>
    </Card>
  );
};

export default Component;
```

### Custom Hook Patterns
```typescript
// Hook for complex state logic
const useFeatureState = (initialState) => {
  const [state, setState] = useState(initialState);
  
  // Complex logic encapsulated in hook
  const updateState = useCallback((newData) => {
    // State update logic
  }, []);
  
  return { state, updateState };
};

// Hook for API interactions
const useApiData = () => {
  const { executeAsync, isLoading } = useLoading();
  
  const fetchData = useCallback(async () => {
    return executeAsync(() => api.getData());
  }, [executeAsync]);
  
  return { fetchData, isLoading };
};
```

## UI Component System

### Available Components
The project includes a comprehensive UI component library. Always use these components instead of creating custom styled elements:

#### Form Components
- `<Button>` - Primary, secondary, outline, and ghost variants
- `<Input>` - Text inputs with label, error, and helper text support
- `<Select>` - Dropdown selects with option arrays
- `<Textarea>` - Multi-line text inputs
- `<CheckboxGroup>` - Multi-select checkbox groups
- `<RadioGroup>` - Single-select radio button groups

#### Layout Components
- `<Card>` - Content containers with consistent styling
- `<PageHeader>` - Page titles with optional back buttons
- `<Modal>` - Overlay dialogs with size variants
- `<AuthLayout>` - Layout for authentication pages
- `<DashboardLayout>` - Layout for dashboard pages
- `<PageLayout>` - General page container with responsive widths

#### Feedback Components
- `<LoadingSpinner>` - Loading indicators in multiple sizes
- `<Notification>` - Toast notifications for success/error/warning/info
- `<FeatureCard>` - Feature showcase cards with icons and links

### Usage Guidelines
```typescript
// Correct: Use UI components with proper props
<Button variant="primary" size="lg" loading={isSubmitting}>
  Submit Form
</Button>

<Input 
  label="Email Address" 
  type="email" 
  error={errors.email}
  helperText="We'll never share your email"
/>

<CheckboxGroup
  label="Select subjects"
  options={SUBJECT_OPTIONS}
  value={selectedSubjects}
  onChange={setSelectedSubjects}
  columns={3}
/>

// Incorrect: Custom styling for common elements
<button className="bg-primary-accent text-primary-bg px-8 py-4...">
  Submit
</button>
```

### Constants Usage
Always use centralized constants for options and static data:

```typescript
import {
  SUBJECT_OPTIONS,
  GRADE_OPTIONS,
  LEARNING_GOAL_OPTIONS,
  DAILY_STUDY_TIME_OPTIONS,
  EXPLANATION_STYLE_OPTIONS
} from '../constants';

// Use in components
<Select options={GRADE_OPTIONS} />
<CheckboxGroup options={SUBJECT_OPTIONS} />
```

### Error Handling Standards
- **Try-Catch Blocks**: Wrap all async operations
- **Error Boundaries**: Implement React error boundaries for component-level errors
- **User-Friendly Messages**: Provide meaningful error messages to users
- **Logging**: Log errors appropriately for debugging
- **Graceful Degradation**: Handle errors without breaking the user experience

### Performance Optimization
- **React.memo**: Memoize components to prevent unnecessary re-renders
- **useMemo/useCallback**: Optimize expensive calculations and function references
- **Lazy Loading**: Implement code splitting for route-based loading
- **Bundle Optimization**: Minimize bundle sizes and optimize loading times

## Form System Guidelines

### Form Architecture
- Each user type (Student, Instructor, University) has dedicated form components
- Consistent validation patterns across all forms
- Real-time validation with user-friendly error messages
- Loading states and success/error handling

### Form State Management
```typescript
interface FormData {
  // Strongly typed form fields
}

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Validation logic
  // Submit handling
  // Error management
};
```

## API Integration Standards

### Service Layer Implementation
- Dedicated service classes for different API domains
- Consistent error handling across all API calls
- Type-safe request/response handling
- Environment-based configuration

### HTTP Client Standards
```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

class APIClient {
  private async request<T>(
    endpoint: string, 
    options: RequestInit
  ): Promise<APIResponse<T>> {
    // Implementation with error handling
  }
}
```

## Testing Standards

### Unit Testing
- Test individual component functionality
- Mock external dependencies
- Use React Testing Library for component testing
- Achieve high code coverage

### Integration Testing
- Test component interactions
- Test API service integration
- Test routing and navigation flows

### E2E Testing
- Test complete user workflows
- Test form submissions and validations
- Test responsive design across devices

## Accessibility Standards

### WCAG Compliance
- Implement proper semantic HTML structure
- Provide alt text for images
- Ensure keyboard navigation support
- Maintain proper color contrast ratios

### ARIA Implementation
- Use ARIA attributes where necessary
- Implement focus management
- Provide screen reader support
- Test with accessibility tools

## Code Quality Standards

### Linting and Formatting
- Use ESLint with TypeScript rules
- Implement Prettier for code formatting
- Enforce consistent code style across the project
- Use pre-commit hooks for quality assurance

### Documentation Standards
- Document complex logic with inline comments
- Maintain up-to-date README files
- Document API interfaces and contracts
- Provide usage examples for reusable components

### Version Control Best Practices
- Use meaningful commit messages
- Implement branching strategies for feature development
- Code review requirements for all changes
- Maintain clean commit history

## Security Best Practices

### Data Validation
- Validate all user inputs on both client and server
- Sanitize data before processing
- Implement proper error handling without exposing sensitive information

### Authentication & Authorization
- Implement secure authentication flows
- Protect sensitive routes and components
- Handle user sessions securely

### Environment Configuration
- Use environment variables for configuration
- Never commit sensitive data to version control
- Implement proper secrets management

## Deployment Standards

### Build Optimization
- Minimize bundle sizes
- Optimize assets for production
- Implement proper caching strategies
- Use CDN for static assets

### Performance Monitoring
- Implement performance tracking
- Monitor bundle sizes and loading times
- Track user experience metrics
- Set up error monitoring and alerting

Remember: Always prioritize code readability, maintainability, and performance. Write code that is easy to understand, test, and extend. Follow the principle of "make it work, make it right, make it fast" in that order.

## Waitlist System Guidelines
- Each user type (Student, Instructor, University) has its own dedicated form component
- Use TypeScript interfaces for form data structures
- Implement real-time validation with user-friendly error messages
- Provide loading states during form submission
- Show personalized success messages based on user type
- Prepare API calls for backend integration but log data to console for now
- Maintain consistent styling and UX patterns across all forms

## Doubt Clearing System Guidelines
- Real-time chat interface with AI tutor
- Persistent chat history across sessions
- Follow-up question suggestions
- Auto-hiding header for immersive experience
- Responsive design optimized for all devices
- TypeScript interfaces for all chat-related data structures
- Service layer for API communication
- Error handling and retry mechanisms

When working on this project, maintain consistency with the existing design system and component patterns. Always follow SOLID principles and OOP concepts to ensure maintainable, scalable, and clean code architecture.
- Each user type (Student, Instructor, University) has its own dedicated form component
- Use TypeScript interfaces for form data structures
- Implement real-time validation with user-friendly error messages
- Provide loading states during form submission
- Show personalized success messages based on user type
- Prepare API calls for backend integration but log data to console for now
- Maintain consistent styling and UX patterns across all forms

When working on this project, maintain consistency with the existing design system and component patterns.
