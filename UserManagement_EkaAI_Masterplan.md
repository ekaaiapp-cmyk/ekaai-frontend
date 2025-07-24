This document provides a detailed masterplan for the Core User Management functionalities within the EkaAI application, focusing on the development aspects of user authentication, profile creation, and management. This plan ensures a secure, intuitive, and robust user entry point into the EkaAI ecosystem, incorporating the latest refinements.

### **Overall User Management Philosophy**

Core User Management in EkaAI will prioritize security, ease of use, and a seamless onboarding experience. The system will initially support **"Sign in with Google" only** for simplified authentication, leveraging **Supabase** for user management and **Firestore** for storing detailed user profile data. All UI elements will adhere to the EkaAI design system (dark background, accent colors, Poppins/Inter fonts, rounded corners, responsive layouts).

### **1\. Welcome Screen**

* **Purpose:** The initial entry point for new and returning users, presenting the core value proposition and guiding them towards login.  
* **Key Components/Sections:**  
  * **EkaAI Logo:** Centered, prominent, high-resolution SVG.  
  * **Tagline:** "Your Personalized AI Tutor for Mastery" (using font-headline).  
  * **Brief Value Proposition:** 1-2 concise sentences explaining EkaAI's core benefit (using font-body).  
  * **Primary Call to Action:**  
    * "Get Started" Button: Large, accent-colored button (bg-primary-accent, text-primary-bg, rounded-full, shadow-lg). Leads directly to the Login Screen (which now handles Google Sign-in).  
* **User Interactions:**  
  * Clicking "Get Started" button.  
* **Data Flow/Logic:** None on this screen; purely navigational.  
* **Navigation/Transitions:**  
  * "Get Started" \-\> Login Screen.  
* **Design Considerations:**  
  * Minimalist, inviting layout.  
  * Strong visual hierarchy to guide user action.  
  * Full-screen responsive design.

### **2\. Login Screen (Google Sign-in Only)**

* **Purpose:** To allow users to securely access their EkaAI account exclusively via Google. This also serves as the initial onboarding step for new users.  
* **Key Components/Sections:**  
  * **Header:**  
    * EkaAI Logo (centered).  
  * **Login Prompt:**  
    * Heading: "Sign in to EkaAI"  
    * Instructional Text: "Continue with Google to personalize your learning journey."  
  * **Primary Call to Action:**  
    * "Sign in with Google" Button: https://supabase.com/docs/guides/auth/social-login/auth-google#google-pre-built  
  * **Loading Indicator:** A spinner or "Signing in..." message displayed during the Google OAuth process.  
* **User Interactions:**  
  * Clicking "Sign in with Google" button.  
* **Data Flow/Logic:**  
  * **Supabase Authentication:**  
    * On "Sign in with Google" button click, initiate Supabase OAuth flow using supabase.auth.signInWithOAuth({ provider: 'google' }).  
    * This will redirect the user to Google for authentication and then back to the application.  
    * **Initial Auth Token:** The application should still check for \_\_initial\_auth\_token on startup. If present, use signInWithCustomToken(auth, \_\_initial\_auth\_token) with Firebase (if Firebase is *only* used for Firestore, and Supabase handles auth). **However, given the explicit switch to Supabase for auth, the \_\_initial\_auth\_token mechanism for *Firebase Auth* will not be used here. Supabase will manage the session.**  
  * **User Creation/Profile Check:**  
    * Upon successful Google sign-in, Supabase will provide a user object. The user.id from Supabase will be the unique userId.  
    * Check Firestore (/artifacts/{appId}/users/{userId}/profile) to see if a profile document already exists for this userId.  
    * If no profile exists (new user), proceed to the streamlined Onboarding Form.  
    * If a profile exists (returning user), proceed directly to the Student Dashboard.  
* **Navigation/Transitions:**  
  * Successful Google Sign-in (new user) \-\> Streamlined Onboarding Form (Section 3).  
  * Successful Google Sign-in (returning user) \-\> Student Dashboard.  
  * Loading overlay/spinner during authentication.  
* **Design Considerations:**  
  * Clean, focused layout.  
  * Clear indication of the Google sign-in method.  
  * Responsive layout.

### **3\. Streamlined Onboarding Form (Post Google Sign-in)**

* **Purpose:** To collect minimal, essential user information for initial AI personalization *after* Google authentication. This is the "quick form" to reduce friction.  
* **Key Components/Sections:**  
  * **Header:**  
    * EkaAI Logo (top-left).  
    * "Welcome to EkaAI\!" / "Just a few more details..."  
  * **Form Content Area:**  
    * Heading: "Let's personalize your learning\!"  
    * Input Field: Full Name (Type: Text, Placeholder: "John Doe", pre-filled if available from Google profile, editable)  
    * Dropdown: Preferred Learning Language (Options: English, Hindi, Other)  
    * Input Field: Current Grade / Year Level (Type: Text, Placeholder: "e.g., 10th Grade, Freshman")  
    * Multi-select Checkboxes: Subjects you are currently studying or need help with (Options: Mathematics, Physics, Chemistry, Biology, English, History, Other)  
    * Radio Buttons: Are you preparing for a competitive exam? (Options: Yes, No)  
    * Conditional Input Field (if "Yes"): Specify Exam (Type: Text, Placeholder: "e.g., JEE, NEET")  
    * Multi-select Checkboxes: Your main goals with EkaAI right now? (Options: Improve grades, Prepare for specific exam, Understand difficult concepts better, Get instant help with doubts, Other)  
    * Radio Buttons: How much time can you commit to studying per day? (Options: Less than 1 hour, 1-2 hours, More than 2 hours)  
    * Radio Buttons: How do you prefer the AI to explain things? (Options: Step-by-step detailed, Quick summaries, Using real-life examples, With interactive questions)  
    * Dropdown/Text Input: What's one challenge you face in learning? (Options: I find it hard to focus, I hesitate to ask questions, I forget concepts easily, Topics feel boring, Other)  
    * Input Field (Optional): Which chapter or topic would you like to start with first?  
    * Text Area (Optional): Optional: Paste a link to a YouTube video you want notes from OR briefly tell us a topic.  
  * **Navigation Button:**  
    * "Start Learning\!" Button (Primary, bg-primary-accent, text-primary-bg, rounded-full, disabled until required fields are valid).  
* **User Interactions:**  
  * Typing in text fields, selecting from dropdowns, checking checkboxes, selecting radio buttons.  
  * Clicking "Start Learning\!" button.  
  * Real-time form validation feedback.  
* **Data Flow/Logic:**  
  * **Client-Side State:** Form inputs stored in local React state.  
  * **Firestore Database:**  
    * Upon "Start Learning\!" click, store the collected profile data in a new document in Firestore: /artifacts/{appId}/users/{userId}/profile.  
    * The userId will be the user.id obtained from Supabase after Google sign-in.  
    * Utilize setDoc() to create the profile document.  
  * **Backend AI Seeding (API Call):**  
    * After Firestore profile creation, make an API call to the EkaAI backend (e.g., /api/onboarding-data) to send the collected personalization data for AI model initialization.  
    * Include \_\_app\_id and userId in the API request.  
* **Navigation/Transitions:**  
  * "Start Learning\!" triggers data storage and AI seeding, then navigates to the Student Dashboard.  
  * Loading overlay/spinner during API calls.  
* **Design Considerations:**  
  * Clean, spacious layout.  
  * Clear, concise instructions.  
  * Visual feedback for validation.  
  * Responsive form elements.  
  * Use lucide-react for icons.

### **4\. Settings & Profile Management (My Account Section)**

* **Purpose:** To allow authenticated students to view and update their core account information, and to complete their exhaustive profile for enhanced personalization.  
* **Key Components/Sections:**  
  * **Header:**  
    * "Back to Dashboard" Button/Icon.  
    * "My Account" Title.  
  * **Profile Display/Edit Form:**  
    * **Full Name:** Editable Text Input (Pre-filled with current name, "Save" button appears on change).  
    * **Email Address:** Display Only (Non-editable, e.g., "Signed in with Google: \[user's email\]"). The "Change Email" functionality is handled by Google directly and is **disabled** within EkaAI.  
    * **Password:** Not applicable for Google OAuth users. This section will be **removed**.  
  * **Action Buttons:**  
    * "Save Changes" Button (for name, enabled only when changes are made).  
    * "Log Out" Button (Prominent, bg-red-500, text-white, rounded-full).  
    * "Delete Account" Button (Discreet, text-red-500, requires confirmation dialog and re-authentication via Google).  
  * **Complete Profile Section (Conditional Display):**  
    * **Reminder/Prompt:** If the exhaustive profile data is incomplete (checked against Firestore profile document), display a prominent card/banner: "Unlock full personalization\! Complete your detailed profile."  
    * **"Complete Your Profile" Button:** Leads to the **Exhaustive Onboarding Form** (a dedicated multi-step form within settings). This form will pre-fill any existing data and allow the user to fill in the remaining details.  
    * **Previously Filled Data Display:** All fields from the initial streamlined onboarding (and any previously filled exhaustive fields) will be displayed in editable boxes. If a field is changed, a "Save Changes" button for that section (or a general "Save All Changes" button) will be enabled.  
* **User Interactions:**  
  * Typing in editable fields.  
  * Clicking "Save Changes."  
  * Clicking "Complete Your Profile" button.  
  * Clicking "Log Out."  
  * Clicking "Delete Account" and confirming.  
* **Data Flow/Logic:**  
  * **Firestore:**  
    * Fetches current user profile data from /artifacts/{appId}/users/{userId}/profile on screen load.  
    * Updates the name field (and other editable fields from the exhaustive form) in Firestore using updateDoc() when "Save Changes" is clicked.  
  * **Supabase Authentication:**  
    * supabase.auth.signOut() for logging out.  
    * supabase.auth.admin.deleteUser() (if using admin context) or a backend function triggered by the client for account deletion. This would require re-authentication with Google.  
* **Navigation/Transitions:**  
  * "Back to Dashboard."  
  * "Complete Your Profile" \-\> Exhaustive Onboarding Form (within settings).  
  * "Log Out" \-\> Login Screen.  
  * "Delete Account" \-\> Confirmation dialog, then Login Screen on success.  
* **Design Considerations:**  
  * Clear separation of editable and non-editable fields.  
  * Prominent reminder for incomplete profiles.  
  * Strong emphasis on security for sensitive actions (account deletion).  
  * Confirmation modals for destructive actions.  
  * Responsive form layout.

### **5\. Exhaustive Onboarding Form (Accessed via Settings)**

* **Purpose:** To allow users to provide a more detailed profile for enhanced AI personalization, accessible from the Settings screen. This is the "exhaustive form."  
* **Key Components/Sections:**  
  * **Header:**  
    * "Back to My Account" Button/Icon.  
    * "Complete Your Profile" Title.  
  * **Progress Indicator:** Multi-step progress indicator (e.g., Step 1 of X).  
  * **Form Content Area (Dynamic per Step):** This will mirror the structure of the Form\_Exhaustive provided previously, including sections for:  
    * Basic Information (Age, Gender, City/Town, Country, Language Preferences)  
    * Academic Background (School/College, Board/Curriculum, Stream/Course, Detailed Subjects, Competitive Exam details, Current Scores/Grades)  
    * Learning Goals & Schedule (Detailed goals, specific time availability, preferred study times, available days)  
    * Learning Style & Preferences (Detailed learning preferences, preferred explanation style, AI tutor tone preference)  
    * Current Challenges & Doubts (Common challenges, most difficult topics, exam fear, frequency of asking doubts)  
    * Engagement & Emotion Monitoring Consent (Optional consent for webcam/microphone monitoring with privacy notes)  
    * Behavioral Insights (Challenges, distractions, music preference, feedback preference)  
    * Motivation & Mindset (Primary motivators, motivational check-ins)  
    * Content Input & Source Customization (Upload existing notes, paste YouTube links, specific chapters to focus on)  
    * Personalization Mode Activation (Dynamic adjustment toggles based on mood, response style, hobbies)  
    * AI Companion Personality (Re-selection/confirmation)  
  * **Navigation Buttons:** "Back," "Next," "Save Profile" (on final step).  
* **User Interactions:**  
  * Typing, selecting, checking, radio buttons.  
  * Clicking navigation buttons.  
* **Data Flow/Logic:**  
  * **Firestore:**  
    * Pre-fills form fields with existing data from /artifacts/{appId}/users/{userId}/profile.  
    * On "Save Profile," updates the existing document in Firestore using updateDoc() with the new and updated exhaustive profile data.  
  * **Backend AI Seeding (API Call):**  
    * Send updated exhaustive data to the EkaAI backend for further AI model refinement.  
* **Navigation/Transitions:**  
  * "Back" to previous step or "My Account" section.  
  * "Next" to subsequent step.  
  * "Save Profile" \-\> Returns to "My Account" section.  
* **Design Considerations:**  
  * Comprehensive, yet manageable multi-step form.  
  * Clear instructions and tooltips.  
  * Responsive layout.  
  * Pre-fill existing data to minimize re-entry.

### **6\. Public Profile Page (Conceptual)**

* **Purpose:** To allow users to share a public representation of their learning journey (e.g., achievements, mastered topics) with others, if they choose.  
* **Key Components/Sections:**  
  * **Unique URL:** ekaai.com/profile/\[autogenerated\_public\_user\_id\]  
  * **Display Elements:**  
    * User's chosen display name (not necessarily full name).  
    * Profile picture/avatar.  
    * Publicly shared achievements (e.g., "Mastered Algebra Basics," "Completed 100 Practice Questions").  
    * Overall progress summary (if opted-in for public sharing).  
    * Optional: Link to connect/follow (if social features are added).  
* **Data Flow/Logic:**  
  * **Firestore:**  
    * A separate document in a public collection: /artifacts/{appId}/public/data/userProfilesPublic/{autogenerated\_public\_user\_id}.  
    * This document would only contain data explicitly marked by the user as public.  
    * The autogenerated\_public\_user\_id could be a shortened, user-friendly version of the Supabase user.id or a completely separate ID generated and stored in the user's private profile.  
* **Security:**  
  * Access to this page **does not require authentication**.  
  * Only publicly shared data is displayed. Personal data remains private.

### **General Technical & Design Considerations for User Management:**

* **Supabase Integration:**  
  * Initialize Supabase client: const supabase \= createClient(SUPABASE\_URL, SUPABASE\_ANON\_KEY);  
  * Utilize supabase.auth for all authentication operations (signInWithOAuth, signOut).  
  * Handle session management via Supabase's client-side library.  
* **Firestore Integration:**  
  * Initialize Firebase app and Firestore: const app \= initializeApp(firebaseConfig); const db \= getFirestore(app);  
  * Use doc, getDoc, setDoc, updateDoc, deleteDoc for profile data persistence.  
  * **Firestore Security Rules:** Crucial to define rules that ensure:  
    * Private profile data (/artifacts/{appId}/users/{userId}/profile) is only readable/writable by request.auth.uid \== userId.  
    * Public profile data (/artifacts/{appId}/public/data/userProfilesPublic/{publicUserId}) is readable by anyone (if true) but only writable by request.auth.uid \== userId (or an admin function).  
* **Error Handling:** Implement robust try-catch blocks for all Supabase and Firestore calls, providing user-friendly error messages (e.g., "Authentication failed," "Network error").  
* **Loading States:** Display loading spinners or skeleton loaders during asynchronous operations (e.g., during Google OAuth redirect, Firestore data fetches/writes).  
* **Input Validation:** Implement both client-side (e.g., email format, password strength) and server-side validation.  
* **Security:**  
  * **Token Verification:** Any access to personal student pages/data (authenticated routes) will be protected by checking the Supabase authentication token. This is handled automatically by Supabase's client-side library when making authenticated requests. Firestore security rules will further enforce this on the backend.  
  * Always use HTTPS.  
  * Consider rate limiting for authentication attempts.  
* **Responsive Design:** All forms and layouts must be fully responsive using Tailwind CSS.  
* **Accessibility:** Ensure forms are accessible (e.g., proper labels, keyboard navigation, ARIA attributes).  
* **State Management:** Use React's useState and useEffect hooks for local component state. For global user state (e.g., currentUser, isProfileComplete), consider useContext or a lightweight state management solution.  
* **UI Components:** Leverage reusable React components for inputs, buttons, modals, and loading indicators to ensure consistency and accelerate development.

This refined masterplan provides a comprehensive and actionable guide for developing the Core User Management features of EkaAI, aligning with the specified requirements for streamlined onboarding, Google-only authentication, and robust profile management.