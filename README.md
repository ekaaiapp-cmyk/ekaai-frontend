# EkaAI Frontend

A modern React TypeScript application for EkaAI - an adaptive AI tutor platform with complete user management, authentication, and personalized learning experiences. This comprehensive platform includes landing page, user authentication, onboarding, dashboard, and AI-powered doubt clearing system.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup database (first time only)
npm run setup:db

# Start development server
npm run dev
```

The app will be available at http://localhost:5173

## 🔧 Environment Setup

### 1. Create Environment File
Copy `.env.example` to `.env.local` and configure:

```bash
# Your Supabase Project URL (from Settings > API)
VITE_SUPABASE_URL=https://your-project-id.supabase.co

# Your Supabase anon/public key (from Settings > API)
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Backend API (optional)
VITE_API_BASE_URL=http://localhost:8000
```

### 2. Database Setup
Run the automated setup script:

```bash
npm run setup:db
```

Or manually copy `database-setup.sql` to your Supabase SQL Editor.

### 3. Google OAuth Configuration
1. Create Google Cloud Console project
2. Configure OAuth consent screen  
3. Add authorized redirect URIs to Supabase
4. Enable Google provider in Supabase Auth

For detailed setup instructions, see [DATABASE_SETUP.md](./DATABASE_SETUP.md) and [USER_MANAGEMENT_SETUP.md](./USER_MANAGEMENT_SETUP.md).

## 🎯 Features Overview

### 🔐 Complete User Management System
- **Google OAuth Authentication** - Secure sign-in with Google accounts
- **User Onboarding** - Comprehensive profile setup for AI personalization
- **Student Dashboard** - Personalized learning interface
- **Profile Management** - Complete settings and account control
- **Protected Routes** - Secure navigation with authentication guards

### 🎨 Modern Design System
- **Dark Theme** - Charcoal background (#1A1A1A) with yellow accents (#FFD700)
- **Responsive Layout** - Mobile-first design for all devices
- **Typography** - Poppins for headlines, Inter for body text
- **Interactive Components** - Smooth animations and hover effects

### 🤖 AI-Powered Features
- **Doubt Clearing System** - Real-time chat with AI tutor
- **Personalized Learning** - AI-driven content recommendations
- **Learning Analytics** - Progress tracking and insights
- **Adaptive Interface** - Smart UI that learns user preferences

### 📊 Data & Security
- **Supabase Integration** - Secure database with Row Level Security
- **TypeScript Safety** - Full type checking and error prevention
- **SOLID Architecture** - Enterprise-grade code organization
- **Performance Optimized** - Fast loading with modern build tools

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript for type safety
- **React Router DOM 7** for client-side routing  
- **Tailwind CSS 4** with custom design system
- **Vite 7** for fast development and building

### Backend & Database
- **Supabase** for authentication and database
- **PostgreSQL** with Row Level Security
- **Google OAuth** for secure authentication
- **Real-time subscriptions** for live updates

### Development Tools
- **ESLint** with TypeScript rules
- **PostCSS** with Autoprefixer
- **VS Code** optimized development environment

## 💻 Development

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Supabase account for database and auth

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Setup & Utilities
npm run setup:db     # Setup Supabase database schema
npm run setup:help   # Show available setup commands
```

### Application Routes

#### Public Routes
- `/` - Landing page with hero, features, and CTA
- `/waitlist` - Multi-role waitlist registration
- `/doubt-clearing` - AI-powered doubt clearing chat
- `/welcome` - Welcome screen for new users
- `/login` - Google OAuth authentication

#### Protected Routes (Require Authentication)
- `/onboarding` - User profile setup and personalization
- `/dashboard` - Student dashboard with personalized content
- `/settings` - Profile management and account settings

## 📁 Project Architecture

```
src/
├── components/               # React components
│   ├── WelcomeScreen.tsx    # Landing page for new users
│   ├── LoginScreen.tsx      # Google OAuth interface
│   ├── OnboardingForm.tsx   # User data collection
│   ├── StudentDashboard.tsx # Main authenticated interface
│   ├── SettingsPage.tsx     # Profile and account management
│   ├── ProtectedRoute.tsx   # Route authentication guard
│   ├── Header.tsx           # Navigation with auth awareness
│   ├── HeroSection.tsx      # Landing page hero
│   ├── StudentSection.tsx   # Student features showcase
│   ├── EducatorSection.tsx  # Educator features showcase
│   ├── FinalCTA.tsx         # Call-to-action sections
│   ├── WaitlistPage.tsx     # Waitlist registration hub
│   ├── DoubtClearingPage.tsx # AI chat interface
│   └── forms/               # Registration forms
│       ├── StudentForm.tsx     
│       ├── InstructorForm.tsx  
│       └── UniversityForm.tsx  
├── contexts/                # React contexts
│   └── AuthContext.tsx      # Global authentication state
├── services/                # API services
│   ├── supabase.ts         # Supabase client configuration
│   ├── waitlistAPI.ts      # Waitlist API calls
│   └── doubtClearingAPI.ts # Chat API calls
├── types/                   # TypeScript definitions
│   ├── auth.ts             # Authentication types
│   └── supabase.ts         # Database types
├── App.tsx                 # Main app with routing
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## � Authentication & User Management

### Authentication Flow
1. **Welcome Screen** → User lands and clicks "Get Started"
2. **Google Login** → Secure OAuth with Supabase
3. **Onboarding** → Profile setup for AI personalization  
4. **Dashboard** → Personalized learning interface

### User Profile System
```typescript
interface UserProfile {
  // Personal Information
  fullName: string;
  email: string;
  preferredLanguage: 'english' | 'hindi' | 'other';
  
  // Academic Details
  currentGrade: string;
  subjects: string[];
  isPreparingForExam: boolean;
  examName?: string;
  
  // Learning Preferences
  learningGoals: string[];
  dailyStudyTime: 'less-than-1' | '1-2' | 'more-than-2';
  preferredExplanationStyle: string;
  learningChallenge: string;
  
  // AI Personalization
  startingTopic?: string;
  youtubeLink?: string;
}
```

### Security Features
- **Row Level Security** - Database-level access control
- **Protected Routes** - Client-side route protection
- **Session Management** - Persistent authentication state
- **Secure Profile Updates** - Controlled data modification
- **Account Deletion** - Safe account removal with confirmation

## 🎨 Design System

### Color Palette
```css
--primary-bg: #1A1A1A          /* Charcoal background */
--primary-accent: #FFD700      /* Yellow accent */
--primary-text: #F5F5F5        /* Off-white text */
--primary-text-bright: #FFFFFF /* Pure white for emphasis */
```

### Typography
```css
--font-headline: 'Poppins', sans-serif  /* Headlines and branding */
--font-body: 'Inter', sans-serif        /* Body text and UI */
```

### Component Patterns
- **Card-based layouts** with subtle shadows and hover effects
- **Responsive grids** that adapt to screen size
- **Loading states** with skeleton placeholders
- **Form validation** with real-time feedback
- **Interactive buttons** with smooth transitions

## 🗄️ Database Schema

### Profiles Table
Complete user profile storage with:
- **Personal Information** - Name, email, contact details
- **Academic Data** - Grade, subjects, exam preparation
- **Learning Preferences** - Goals, study time, explanation style
- **AI Personalization** - Learning challenges, topics, resources
- **Activity Tracking** - Login times, study streaks, usage stats
- **Security** - Row Level Security policies for data protection

### Key Features
- **Automatic Timestamps** - Created/updated tracking
- **Data Validation** - Database-level constraints
- **Performance Indexes** - Optimized query performance
- **Analytics Functions** - Built-in user statistics
- **Backup Ready** - Complete schema documentation

## 🤖 AI Integration

### Doubt Clearing System
- **Real-time Chat** - Instant AI responses to student questions
- **Context Awareness** - AI remembers conversation history
- **Subject Expertise** - Specialized knowledge across topics
- **Adaptive Responses** - Matches user's learning style
- **Follow-up Questions** - Smart suggestions for deeper learning

### Personalization Engine
- **Learning Style Detection** - Adapts to user preferences
- **Progress Tracking** - Monitors learning journey
- **Content Recommendations** - Suggests relevant materials
- **Difficulty Adjustment** - Scales to user capability

## 🛡️ Security & Performance

### Security Measures
- **OAuth 2.0** - Industry-standard authentication
- **Row Level Security** - Database access control
- **Input Validation** - Client and server-side checking
- **Error Handling** - Secure error messaging
- **Session Protection** - Secure token management

### Performance Optimization
- **Code Splitting** - Route-based lazy loading
- **Bundle Optimization** - Minimal production builds
- **Caching Strategy** - Smart asset caching
- **Database Indexing** - Fast query performance
- **CDN Ready** - Optimized for content delivery

## 📚 Documentation

### Setup Guides
- [DATABASE_SETUP.md](./DATABASE_SETUP.md) - Complete database configuration
- [USER_MANAGEMENT_SETUP.md](./USER_MANAGEMENT_SETUP.md) - Auth system setup
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Full feature overview
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues and solutions

### Development Resources
- [.github/copilot-instructions.md](./.github/copilot-instructions.md) - Coding standards
- Environment configuration examples
- TypeScript interface documentation
- Component usage examples

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables for Production
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-key
VITE_API_BASE_URL=https://your-api-domain.com
```

### Hosting Recommendations
- **Vercel** - Optimized for React applications
- **Netlify** - Simple deployment with form handling
- **Cloudflare Pages** - Global CDN with edge computing
- **AWS S3 + CloudFront** - Enterprise-grade hosting

## 🧪 Testing

### Manual Testing Checklist
- [ ] Authentication flow (Google OAuth)
- [ ] Onboarding form completion
- [ ] Dashboard navigation and functionality
- [ ] Settings page profile updates
- [ ] Sign out and session management
- [ ] Responsive design across devices
- [ ] Error handling and recovery

### Automated Testing
```bash
# Future implementation
npm run test        # Unit tests
npm run test:e2e    # End-to-end tests
npm run test:a11y   # Accessibility tests
```

## 🤝 Contributing

### Code Standards
- Follow SOLID principles
- Use TypeScript for all new code
- Implement responsive design
- Add proper error handling
- Include loading states
- Write semantic HTML
- Follow accessibility guidelines

### Development Workflow
1. Create feature branch
2. Implement with tests
3. Ensure responsive design
4. Add documentation
5. Submit pull request

## 📄 License

This project is part of the EkaAI platform development.

---

## 🎉 Get Started Today!

Ready to experience the future of AI-powered education? 

1. **Clone the repository**
2. **Run `npm run setup:help`** for guided setup
3. **Follow the setup guides** in the documentation
4. **Start building amazing educational experiences!**

For support or questions, check the troubleshooting guide or refer to the comprehensive documentation.

**Built with ❤️ for the future of education** 🎓
