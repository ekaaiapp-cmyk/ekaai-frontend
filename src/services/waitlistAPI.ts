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

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class WaitlistAPI {
  // TODO: Replace these with actual API calls when backend is ready
  
  async registerStudent(data: StudentRegistration): Promise<{ success: boolean; message: string }> {
    // Simulate API call
    console.log('Student registration data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success response
    return {
      success: true,
      message: 'Student registration successful'
    };
  }

  async registerInstructor(data: InstructorRegistration): Promise<{ success: boolean; message: string }> {
    // Simulate API call
    console.log('Instructor registration data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success response
    return {
      success: true,
      message: 'Instructor registration successful'
    };
  }

  async registerUniversity(data: UniversityRegistration): Promise<{ success: boolean; message: string }> {
    // Simulate API call
    console.log('University registration data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate success response
    return {
      success: true,
      message: 'University registration successful'
    };
  }

  // When backend is ready, replace the above methods with actual API calls like:
  /*
  async registerStudent(data: StudentRegistration): Promise<{ success: boolean; message: string }> {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
      const response = await fetch(`${API_BASE_URL}/waitlist/student`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
  */
}

export const waitlistAPI = new WaitlistAPI();
