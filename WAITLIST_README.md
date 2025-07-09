# EkaAI Waitlist System

This document describes the waitlist registration system for the EkaAI platform.

## Features

- **Multi-Role Registration**: Support for three user types:
  - Students
  - Instructors
  - Universities

- **Customized Forms**: Each user type has a tailored registration form with relevant fields

- **Modern UI**: Responsive design with smooth animations and hover effects

- **Form Validation**: Client-side validation with error handling

- **API Ready**: Prepared for backend integration with REST API endpoints

## User Types

### 1. Students
- Personal information (name, email, phone)
- Academic information (grade, school, subjects)
- Learning goals and AI experience
- Multi-select subject interests

### 2. Instructors
- Personal and professional information
- Teaching experience and current tools
- Student count and AI experience in education
- Multi-select subjects and tools

### 3. Universities
- Contact person information
- Institution details (type, size, location)
- Technology infrastructure assessment
- Implementation goals and budget planning

## Technical Implementation

### Components Structure
```
src/components/
├── WaitlistPage.tsx          # Main waitlist page with user type selection
└── forms/
    ├── StudentForm.tsx       # Student registration form
    ├── InstructorForm.tsx    # Instructor registration form
    └── UniversityForm.tsx    # University registration form
```

### API Service
```
src/services/
└── waitlistAPI.ts           # API service for form submissions
```

### Routing
- `/waitlist` - Main waitlist page with user type selection
- Form components are rendered within the same page based on user selection

## Backend Integration

The frontend is prepared for backend integration with the following API endpoints:

### Endpoints (to be implemented)
- `POST /api/waitlist/student` - Student registration
- `POST /api/waitlist/instructor` - Instructor registration
- `POST /api/waitlist/university` - University registration

### Data Format
Each endpoint expects JSON data according to the interfaces defined in `waitlistAPI.ts`:
- `StudentRegistration`
- `InstructorRegistration`
- `UniversityRegistration`

### Environment Variables
When backend is ready, configure:
```env
VITE_API_BASE_URL=your_api_base_url
```

## Form Fields

### Student Form
**Required:**
- First Name, Last Name, Email
- Grade Level, School, Subjects (at least one)

**Optional:**
- Phone, Date of Birth
- Learning Goals, Previous AI Experience, Referral Source

### Instructor Form
**Required:**
- First Name, Last Name, Email
- Title, Institution, Teaching Experience

**Optional:**
- Phone, Department
- Subjects, Current Tools
- Student Count, AI Experience, Teaching Challenges
- EkaAI Interest, Referral Source

### University Form
**Required:**
- First Name, Last Name, Email
- Title, University Name, University Type, Student Population

**Optional:**
- Phone, Department, Location, Website
- Current LMS, Technology Infrastructure
- AI Initiatives, Implementation Goals
- Budget, Timeline, Decision Makers
- Challenges, Expectations, Referral Source

## Validation Rules

### Email Validation
- Must contain '@' symbol
- Required for all user types

### Multi-select Fields
- Students: At least one subject must be selected
- Instructors: Subjects and tools are optional
- Universities: LMS selection is optional

### Text Fields
- Name fields: Trim whitespace, minimum 1 character
- Optional fields: No validation beyond max length

## Success Flow

After successful submission:
1. Form is replaced with success message
2. Personalized message based on user type
3. Next steps information displayed
4. No automatic redirect (user stays on success page)

## Error Handling

- Client-side validation with real-time error messages
- Form submission errors display user-friendly messages
- Loading states prevent duplicate submissions
- Graceful handling of network errors

## Styling

- Consistent with EkaAI design system
- Dark theme with yellow accents (#FFD700)
- Responsive design (mobile-first)
- Smooth animations and hover effects
- Accessible form controls with proper focus states

## Future Enhancements

1. **Email Verification**: Add email confirmation step
2. **Progress Saving**: Save form progress for partial completions
3. **Analytics**: Track conversion rates by user type
4. **A/B Testing**: Test different form layouts
5. **Social Login**: Add Google/LinkedIn authentication
6. **File Uploads**: Allow document attachments for universities
7. **Multi-language**: Support for multiple languages
8. **Advanced Validation**: Server-side validation
9. **Notifications**: Email confirmations and follow-ups
10. **Admin Dashboard**: View and manage registrations
