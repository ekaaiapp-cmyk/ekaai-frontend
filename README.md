# EkaAI Frontend

A modern React TypeScript application for EkaAI - an adaptive AI tutor that revolutionizes education through personalized learning experiences. This comprehensive platform includes a landing page, doubt clearing system, and multi-role waitlist registration.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

The app will be available at http://localhost:5173

## 🔧 Environment Variables

Create a `.env.local` file:

```bash
VITE_API_BASE_URL=http://localhost:8000
```

For production, update with your deployed backend URL:

```bash
VITE_API_BASE_URL=https://your-backend-domain.com
```

## 🎯 Overview

EkaAI is designed to revolutionize education by providing personalized learning experiences for students and powerful insights for educators. This landing page showcases the platform's features and allows visitors to join the waitlist.

## 🚀 Features

- **Modern Design**: Dark theme with yellow accents following the masterplan specifications
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Components**: Smooth scrolling, hover effects, and form handling
- **Doubt Clearing System**: Real-time AI-powered chat interface for instant doubt resolution
- **Waitlist System**: Multi-role registration for students, instructors, and universities
- **Route-based Navigation**: Clean React Router DOM implementation with smooth transitions
- **Accessibility**: Proper semantic HTML, focus states, and ARIA compliance
- **Performance Optimized**: Built with Vite for fast development and production builds
- **TypeScript Integration**: Full type safety with comprehensive interface definitions
- **API-Ready Architecture**: Service layer prepared for backend integration

## 🛠️ Tech Stack

- **React 18** with TypeScript for type safety
- **React Router DOM** for client-side routing
- **Vite** for fast development and building
- **Tailwind CSS** for styling with custom design system
- **Google Fonts** (Poppins & Inter) for typography

## 💻 Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:5173 in your browser

### Routes

- `/` - Main landing page
- `/waitlist` - Waitlist registration with user type selection
- `/doubt-clearing` - AI-powered doubt clearing chat interface

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors
- **Background**: `#1A1A1A` (primary-bg)
- **Accent**: `#FFD700` (primary-accent) 
- **Text**: `#F5F5F5` (primary-text)
- **Bright Text**: `#FFFFFF` (primary-text-bright)

### Typography
- **Headlines**: Poppins (font-headline)
- **Body Text**: Inter (font-body)

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx           # Navigation header with routing
│   ├── HeroSection.tsx      # Main hero section
│   ├── StudentSection.tsx   # Student features
│   ├── EducatorSection.tsx  # Educator features
│   ├── FinalCTA.tsx         # Waitlist CTA with routing
│   ├── WaitlistPage.tsx     # Main waitlist page
│   ├── DoubtClearingPage.tsx # AI-powered doubt clearing chat
│   └── forms/
│       ├── StudentForm.tsx     # Student registration form
│       ├── InstructorForm.tsx  # Instructor registration form
│       └── UniversityForm.tsx  # University registration form
├── services/
│   ├── waitlistAPI.ts       # API service for form submissions
│   └── doubtClearingAPI.ts  # API service for chat functionality
├── App.tsx                  # Main app with routing
├── main.tsx                # App entry point
└── index.css               # Global styles with custom properties
```

## 📝 Components

### Landing Page Components

#### Header
- Fixed navigation with logo and waitlist CTA
- React Router Link navigation to waitlist page
- Doubt clearing link for instant AI support

#### HeroSection
- Main headline and value proposition
- Call-to-action button for doubt clearing
- Feature highlights with icons

#### StudentSection
- Student-focused features and benefits
- Interactive cards with hover effects
- Personalization emphasis
- Link to doubt clearing functionality

#### EducatorSection
- Educator-focused features
- Performance metrics display
- Teaching efficiency benefits

#### FinalCTA
- Primary call-to-action linking to waitlist
- Trust indicators and benefits
- Streamlined user journey

### Doubt Clearing System

#### DoubtClearingPage
- Real-time AI chat interface
- Persistent chat history
- Follow-up question suggestions
- Auto-hiding header for immersive experience
- Responsive design for all devices

### Waitlist System Components

#### WaitlistPage
- User type selection interface
- Role-based form routing
- Consistent design with landing page

#### StudentForm
- Comprehensive student registration
- Academic information collection
- Learning goals and preferences

#### InstructorForm
- Professional teaching information
- Technology usage assessment
- Course and student management details

#### UniversityForm
- Institutional information gathering
- Infrastructure assessment
- Implementation planning and budgeting

## 📝 Doubt Clearing System

The application features a comprehensive AI-powered doubt clearing system:

### Architecture
- **Real-time Chat Interface**: Interactive chat experience with AI tutor
- **Message Persistence**: Chat history maintained across sessions
- **Context Awareness**: AI remembers previous conversations for better responses
- **Follow-up Questions**: Smart suggestions based on conversation context
- **Responsive Design**: Optimized for all devices with touch-friendly interface

### Technical Features
- **TypeScript Integration**: Strongly typed message and response interfaces
- **Service Layer**: Dedicated API service for chat functionality
- **State Management**: React hooks for efficient chat state handling
- **Auto-scroll**: Automatic scrolling to latest messages
- **Loading States**: Visual feedback during AI response generation
- **Error Handling**: Comprehensive error management with retry mechanisms

### Backend Integration
The frontend is prepared for REST API integration with endpoints:
- `POST /api/doubt-clearing/submit` - Send message to AI
- `POST /api/doubt-clearing/save-chat` - Save chat history
- `GET /api/doubt-clearing/history` - Retrieve chat history

Environment variable support: `VITE_API_BASE_URL`

## 📝 Waitlist System

The application features a comprehensive multi-role waitlist registration system:

### Architecture
- **Route-based**: Dedicated `/waitlist` page for registration
- **Role Selection**: Users choose between Student, Instructor, or University
- **Dynamic Forms**: Each role has a customized registration form
- **Validation**: Real-time client-side validation with error feedback
- **Success Flows**: Personalized success messages based on user type

### User Registration Types

#### Students
- **Personal Info**: Name, email, phone, date of birth
- **Academic Details**: Grade level, school/institution
- **Subjects**: Multi-select interest areas
- **Goals**: Learning objectives and AI experience

#### Instructors
- **Professional Info**: Title, institution, department
- **Experience**: Teaching years and student count
- **Technology**: Current tools and AI experience
- **Interests**: Subjects taught and platform usage

#### Universities
- **Contact Person**: Administrator/decision maker details
- **Institution**: Type, size, location, website
- **Infrastructure**: Current LMS and technology readiness
- **Planning**: Implementation goals, budget, timeline

### Technical Features
- **TypeScript Interfaces**: Strongly typed data structures
- **API Ready**: Service layer prepared for backend integration
- **Form State Management**: React hooks for form handling
- **Error Handling**: Comprehensive validation and error states
- **Loading States**: Visual feedback during submission
- **Responsive Design**: Mobile-optimized forms

### Backend Integration
The frontend is prepared for REST API integration with endpoints:
- `POST /api/waitlist/student`
- `POST /api/waitlist/instructor` 
- `POST /api/waitlist/university`

Environment variable support: `VITE_API_BASE_URL`

For detailed technical documentation, see [WAITLIST_README.md](./WAITLIST_README.md).

## 🔧 Configuration

### Tailwind CSS
Custom configuration in `tailwind.config.js` with:
- Custom color palette
- Font family definitions
- Extended theme settings

### PostCSS
Configured with Tailwind CSS and Autoprefixer for vendor prefix support.

## 🏗️ Architecture & Design Patterns

### Component Architecture
- **Functional Components**: All components use React functional components with hooks
- **TypeScript Integration**: Strong typing throughout with interfaces and type definitions
- **Separation of Concerns**: Clear separation between UI components and business logic
- **Reusable Components**: Modular design with reusable form and UI components

### State Management
- **React Hooks**: useState, useEffect, useRef for local component state
- **Context-Aware Design**: Props drilling avoided through component composition
- **Service Layer Pattern**: API calls abstracted into dedicated service modules

### Code Organization
- **SOLID Principles**: Single responsibility, open/closed, dependency inversion
- **Clean Architecture**: Separation of concerns with clear boundaries
- **Component Composition**: Favoring composition over inheritance
- **TypeScript Best Practices**: Strong typing, interfaces, and type safety

### Performance Optimization
- **Lazy Loading**: Route-based code splitting with React Router
- **Memoization**: Strategic use of React optimization techniques
- **Asset Optimization**: Vite for fast builds and hot reloading
- **Bundle Analysis**: Optimized bundle sizes for production

## 🚀 Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📄 License

This project is part of the EkaAI platform development.
