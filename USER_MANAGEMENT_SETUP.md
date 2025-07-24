# EkaAI User Management Setup Guide

## Overview
This implementation includes a complete user management system for EkaAI with Google OAuth authentication via Supabase. The system follows the masterplan specifications and includes:

- Welcome Screen
- Google-only authentication (Login Screen)
- Streamlined Onboarding Form
- Student Dashboard
- Settings & Profile Management
- Protected routes with authentication

## Prerequisites

1. **Supabase Project**: You need a Supabase project with Google OAuth configured
2. **Google OAuth App**: Set up in Google Cloud Console

## Setup Instructions

### 1. Supabase Setup

1. **Create a Supabase Project**:
   - Go to [https://supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Create the Profiles Table**:
   Run this SQL in your Supabase SQL editor:

   ```sql
   -- Create profiles table
   CREATE TABLE profiles (
     id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
     full_name TEXT NOT NULL,
     email TEXT NOT NULL,
     preferred_language TEXT NOT NULL CHECK (preferred_language IN ('english', 'hindi', 'other')),
     current_grade TEXT NOT NULL,
     subjects TEXT[] NOT NULL DEFAULT '{}',
     is_preparing_for_exam BOOLEAN NOT NULL DEFAULT false,
     exam_name TEXT,
     learning_goals TEXT[] NOT NULL DEFAULT '{}',
     daily_study_time TEXT NOT NULL CHECK (daily_study_time IN ('less-than-1', '1-2', 'more-than-2')),
     preferred_explanation_style TEXT NOT NULL CHECK (preferred_explanation_style IN ('step-by-step', 'quick-summaries', 'real-life-examples', 'interactive-questions')),
     learning_challenge TEXT NOT NULL,
     starting_topic TEXT,
     youtube_link TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
   );

   -- Create updated_at trigger
   CREATE OR REPLACE FUNCTION handle_updated_at()
   RETURNS TRIGGER AS $$
   BEGIN
     NEW.updated_at = NOW();
     RETURN NEW;
   END;
   $$ language 'plpgsql';

   CREATE TRIGGER update_profiles_updated_at
     BEFORE UPDATE ON profiles
     FOR EACH ROW
     EXECUTE PROCEDURE handle_updated_at();

   -- Set up Row Level Security (RLS)
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Users can view their own profile" ON profiles
     FOR SELECT USING (auth.uid() = id);

   CREATE POLICY "Users can update their own profile" ON profiles
     FOR UPDATE USING (auth.uid() = id);

   CREATE POLICY "Users can insert their own profile" ON profiles
     FOR INSERT WITH CHECK (auth.uid() = id);

   CREATE POLICY "Users can delete their own profile" ON profiles
     FOR DELETE USING (auth.uid() = id);
   ```

3. **Configure Google OAuth**:
   - In Supabase Dashboard, go to Authentication > Providers
   - Enable Google provider
   - Add your Google OAuth credentials (Client ID and Secret)
   - Set redirect URL to: `https://your-project.supabase.co/auth/v1/callback`

### 2. Google Cloud Console Setup

1. **Create OAuth 2.0 Credentials**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create or select a project
   - Enable Google+ API
   - Create OAuth 2.0 Client ID credentials
   - Add authorized redirect URIs:
     - `https://your-project.supabase.co/auth/v1/callback`
     - `http://localhost:5173` (for development)

### 3. Environment Configuration

1. **Create Environment File**:
   ```bash
   cp .env.example .env.local
   ```

2. **Update Environment Variables**:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### 4. Development Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

## User Flow

### New User Journey:
1. **Welcome Screen** (`/welcome`) - Landing page with value proposition
2. **Login Screen** (`/login`) - Google OAuth authentication
3. **Onboarding Form** (`/onboarding`) - Collect personalization data
4. **Student Dashboard** (`/dashboard`) - Main application interface

### Returning User Journey:
1. **Login Screen** (`/login`) - Google OAuth authentication
2. **Student Dashboard** (`/dashboard`) - Direct access to main interface

## Key Features

### Authentication
- **Google-only OAuth** via Supabase
- **Automatic session management**
- **Protected routes** with authentication checks

### User Profile Management
- **Streamlined onboarding** with essential data collection
- **Profile completion tracking** with banner notifications
- **Settings page** for profile management
- **Account deletion** with confirmation

### Navigation & UX
- **Responsive design** following EkaAI design system
- **Loading states** for all async operations
- **Error handling** with user-friendly messages
- **Seamless routing** between authenticated and public areas

## Design System Compliance

The implementation follows the EkaAI design system:
- **Colors**: Dark theme (#1A1A1A), yellow accent (#FFD700), off-white text (#F5F5F5)
- **Typography**: Poppins for headlines, Inter for body text
- **Components**: Consistent styling with existing components
- **Responsive**: Mobile-first design principles

## Security Considerations

- **Row Level Security (RLS)** enabled on all database tables
- **Environment variables** for sensitive configuration
- **HTTPS-only** for production deployments
- **Client-side validation** with server-side enforcement

## API Integration Ready

The profile data structure is designed to integrate with AI backends:
- **Structured data collection** for personalization
- **Console logging** of onboarding data for AI seeding
- **Extensible profile schema** for future enhancements

## Troubleshooting

### Common Issues:

1. **Supabase Connection Error**:
   - Verify VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
   - Check network connectivity

2. **Google OAuth Not Working**:
   - Verify Google OAuth credentials in Supabase
   - Check redirect URLs are correct
   - Ensure Google+ API is enabled

3. **Profile Creation Fails**:
   - Check Supabase RLS policies
   - Verify profiles table schema

4. **Routing Issues**:
   - Check protected route logic
   - Verify authentication state

## Next Steps

After basic setup, consider:
1. **Email templates** for authentication flows
2. **Advanced profile fields** for enhanced personalization
3. **Backend API integration** for AI model seeding
4. **Analytics tracking** for user behavior
5. **Error monitoring** and logging

## Support

For issues or questions:
1. Check Supabase documentation: [https://supabase.com/docs](https://supabase.com/docs)
2. Review React Router documentation for routing issues
3. Check browser console for error messages
