// API service for handling waitlist registrations
// This file will be updated when the backend is ready

export interface StudentRegistration {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  grade: string;
  school: string;
  subjects: string[];
  learningGoals?: string;
  previousAIExperience?: string;
  referralSource?: string;
}

export interface InstructorRegistration {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title: string;
  institution: string;
  department?: string;
  teachingExperience: string;
  subjects: string[];
  currentTools: string[];
  studentCount?: string;
  aiExperience?: string;
  teachingChallenges?: string;
  ekaaiInterest?: string;
  referralSource?: string;
}

export interface UniversityRegistration {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title: string;
  universityName: string;
  department?: string;
  universityType: string;
  studentPopulation: string;
  location?: string;
  website?: string;
  currentLMS: string[];
  techInfrastructure?: string;
  aiInitiatives?: string;
  implementationGoals?: string;
  budget?: string;
  timeline?: string;
  decisionMakers?: string;
  challenges?: string;
  expectations?: string;
  referralSource?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class WaitlistAPI {
  async registerStudent(data: StudentRegistration): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/waitlist/student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          date_of_birth: data.dateOfBirth,
          grade_level: data.grade,
          school: data.school,
          subjects: data.subjects,
          goals: data.learningGoals,
          ai_experience: data.previousAIExperience,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Student registration failed:', error);
      return {
        success: false,
        message: 'Registration failed. Please try again later.'
      };
    }
  }

  async registerInstructor(data: InstructorRegistration): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/waitlist/instructor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          title: data.title,
          institution: data.institution,
          department: data.department,
          teaching_years: parseInt(data.teachingExperience) || 0,
          student_count: parseInt(data.studentCount || '0') || 0,
          current_tools: data.currentTools.join(', '),
          ai_experience: data.aiExperience,
          subjects_taught: data.subjects,
          platform_usage: data.ekaaiInterest,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Instructor registration failed:', error);
      return {
        success: false,
        message: 'Registration failed. Please try again later.'
      };
    }
  }

  async registerUniversity(data: UniversityRegistration): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/waitlist/university`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact_name: `${data.firstName} ${data.lastName}`,
          contact_email: data.email,
          contact_phone: data.phone,
          institution_type: data.universityType,
          institution_size: data.studentPopulation,
          location: data.location,
          website: data.website,
          lms: data.currentLMS.join(', '),
          tech_readiness: data.techInfrastructure,
          implementation_goals: data.implementationGoals,
          budget: data.budget,
          timeline: data.timeline,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('University registration failed:', error);
      return {
        success: false,
        message: 'Registration failed. Please try again later.'
      };
    }
  }
}

export const waitlistAPI = new WaitlistAPI();
