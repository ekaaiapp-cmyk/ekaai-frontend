<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# EkaAI Frontend Project Instructions

This is a React TypeScript project built with Vite for the EkaAI platform. The project follows enterprise-grade coding standards and architectural principles.

## Design System
- **Color Palette**: Dark theme with charcoal background (#1A1A1A), yellow accent (#FFD700), and off-white text (#F5F5F5)
- **Typography**: Poppins for headlines, Inter for body text
- **Component Architecture**: Modular React components with TypeScript
- **Styling**: Tailwind CSS v4+ with custom color configuration

## Project Structure
- `/src/components/` - Reusable React components and page components
- `/src/components/forms/` - Waitlist registration forms for different user types
- `/src/services/` - API service layer for backend integration
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

### TypeScript Best Practices
- **Strong Typing**: Use explicit types, avoid `any`
- **Interface Definitions**: Define clear contracts for all data structures
- **Generic Types**: Use generics for reusable component patterns
- **Const Assertions**: Prefer `const` assertions for type safety
- **Strict Mode**: Enable all TypeScript strict mode features

### React Best Practices
- **Functional Components**: Use functional components with hooks exclusively
- **Custom Hooks**: Extract complex logic into reusable custom hooks
- **Component Composition**: Build complex UI through component composition
- **Props Validation**: Use TypeScript interfaces for prop validation
- **State Management**: Use React hooks for local state, context for shared state

### Component Architecture
```typescript
// Example component structure
interface ComponentProps {
  // Clear prop interface
}

const Component: React.FC<ComponentProps> = ({ ...props }) => {
  // State management
  // Effects and lifecycle
  // Event handlers
  // Render logic
};

export default Component;
```

### Service Layer Pattern
```typescript
// Example service class
class APIService {
  private baseURL: string;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  
  async methodName<T>(data: InputType): Promise<ResponseType<T>> {
    // Implementation
  }
}
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
