# 🚀 EkaAI Database Setup Guide

This guide will help you set up the complete database schema for the EkaAI user management system.

## 📋 Prerequisites

Before setting up the database, ensure you have:

1. **Supabase Project**: Created at [supabase.com](https://supabase.com)
2. **Google OAuth**: Configured in Google Cloud Console
3. **Environment Variables**: Set up in `.env.local`

## 🎯 Quick Setup

### Option 1: Automated Setup (Recommended)

Run our setup script:

```bash
npm run setup:db
```

This will guide you through either manual or CLI-based setup.

### Option 2: Manual Setup

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Copy the contents of `database-setup.sql`
4. Paste and execute the SQL

### Option 3: CLI Setup

If you have Supabase CLI installed:

```bash
# Login to Supabase CLI
supabase login

# Run the setup script and choose option 2
npm run setup:db
```

## 📊 What Gets Created

The schema creates:

### Tables
- **`profiles`**: User profile data with comprehensive fields
- **Indexes**: Optimized for email, username, and timestamp queries
- **Constraints**: Data validation and referential integrity

### Security
- **Row Level Security (RLS)**: Users can only access their own data
- **Policies**: Secure read/write access patterns
- **Triggers**: Automatic timestamp updates

### Functions
- **`get_user_stats()`**: Analytics and user statistics
- **Helper functions**: Profile management utilities

## 🔧 Database Schema Details

### Profiles Table Structure

```sql
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  
  -- Profile completion
  is_profile_complete BOOLEAN DEFAULT FALSE,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  
  -- Academic information
  education_level TEXT CHECK (education_level IN (
    'high_school', 'undergraduate', 'graduate', 'postgraduate', 'professional'
  )),
  institution TEXT,
  subjects TEXT[], -- Array of subjects
  
  -- Learning preferences
  learning_goals TEXT[],
  study_schedule JSONB,
  preferred_language TEXT DEFAULT 'english',
  
  -- AI personalization
  ai_tutor_personality TEXT CHECK (ai_tutor_personality IN (
    'friendly', 'professional', 'encouraging', 'direct'
  )) DEFAULT 'friendly',
  difficulty_preference TEXT CHECK (difficulty_preference IN (
    'beginner', 'intermediate', 'advanced', 'adaptive'
  )) DEFAULT 'adaptive',
  
  -- Activity tracking
  last_active TIMESTAMPTZ DEFAULT NOW(),
  study_streak INTEGER DEFAULT 0,
  total_questions_asked INTEGER DEFAULT 0,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Security Policies

```sql
-- Users can read their own profile
CREATE POLICY "Users can read own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);
```

## ✅ Verification

After running the setup, verify your schema:

```sql
-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'profiles'
);

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'profiles';

-- Check policies exist
SELECT policyname, tablename 
FROM pg_policies 
WHERE tablename = 'profiles';
```

## 🚨 Troubleshooting

### Common Issues

1. **Permission Denied**
   - Ensure you're running SQL as the project owner
   - Check if RLS policies are correctly configured

2. **Foreign Key Constraint Error**
   - Make sure `auth.users` table exists
   - Verify Supabase Auth is enabled

3. **Function Creation Fails**
   - Check if you have `CREATE FUNCTION` permissions
   - Ensure all dependencies exist

### Error Messages

| Error | Solution |
|-------|----------|
| `relation "auth.users" does not exist` | Enable Supabase Auth in your project |
| `permission denied for schema public` | Run SQL as project owner |
| `column "subjects" is of type text[] but expression is of type text` | Ensure array syntax: `ARRAY['subject1', 'subject2']` |

## 🔄 Schema Updates

If you need to modify the schema later:

1. **Add new columns**: Use `ALTER TABLE` statements
2. **Update policies**: Drop and recreate as needed
3. **Backup first**: Always backup before major changes

```sql
-- Example: Add new column
ALTER TABLE public.profiles 
ADD COLUMN new_field TEXT;

-- Update RLS policy if needed
DROP POLICY "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);
```

## 📱 Testing the Setup

After database setup, test your frontend:

1. **Start development server**:
   ```bash
   npm run dev
   ```

2. **Test authentication flow**:
   - Visit the welcome screen
   - Click "Get Started"
   - Complete Google OAuth
   - Fill out onboarding form
   - Check dashboard loads

3. **Verify database entries**:
   ```sql
   SELECT id, email, full_name, is_profile_complete 
   FROM public.profiles 
   ORDER BY created_at DESC;
   ```

## 🎉 Next Steps

With your database set up:

1. **Configure Google OAuth** in Supabase dashboard
2. **Test user registration** and profile creation
3. **Verify RLS policies** are working correctly
4. **Deploy to production** when ready

## 📞 Support

If you encounter issues:

1. Check the console for error messages
2. Verify environment variables in `.env.local`
3. Test database connection in Supabase dashboard
4. Review the complete setup in `USER_MANAGEMENT_SETUP.md`

---

**Happy coding! 🎯**
