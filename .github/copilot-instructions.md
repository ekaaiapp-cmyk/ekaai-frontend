<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# EkaAI Frontend Project Instructions

This is a React TypeScript project built with Vite for the EkaAI landing page. The project follows these key principles:

## Design System
- **Color Palette**: Dark theme with charcoal background (#1A1A1A), yellow accent (#FFD700), and off-white text (#F5F5F5)
- **Typography**: Poppins for headlines, Inter for body text
- **Component Architecture**: Modular React components with TypeScript
- **Styling**: Tailwind CSS with custom color configuration

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
- Multi-role waitlist registration system (Students, Instructors, Universities)
- Route-based navigation with React Router DOM
- Comprehensive form validation and error handling
- API-ready service layer for backend integration
- Responsive navigation with smooth routing transitions
- Modern card-based layouts with hover effects
- Accessibility considerations (proper semantic HTML, focus states)

## Code Style
- Use functional components with TypeScript
- Prefer const assertions and proper typing
- Follow React best practices (hooks, component composition)
- Use semantic HTML elements
- Implement proper error handling and loading states
- Use React Router for navigation instead of direct DOM manipulation
- Maintain consistent form validation patterns across components
- Follow the established API service pattern for data operations

## Waitlist System Guidelines
- Each user type (Student, Instructor, University) has its own dedicated form component
- Use TypeScript interfaces for form data structures
- Implement real-time validation with user-friendly error messages
- Provide loading states during form submission
- Show personalized success messages based on user type
- Prepare API calls for backend integration but log data to console for now
- Maintain consistent styling and UX patterns across all forms

When working on this project, maintain consistency with the existing design system and component patterns.
