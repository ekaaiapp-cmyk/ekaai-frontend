import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SettingsPage: React.FC = () => {
  const { user, profile, updateProfile, signOut, deleteAccount, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'account' | 'profile'>('account');
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profile?.fullName || '');
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSaveName = async () => {
    if (!editedName.trim() || !profile) return;
    
    try {
      setIsSaving(true);
      await updateProfile({ fullName: editedName.trim() });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating name:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await deleteAccount();
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading || !user || !profile) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary-text">Loading settings...</p>
        </div>
      </div>
    );
  }

  const isProfileIncomplete = !profile.subjects.length || !profile.learningGoals.length;

  return (
    <div className="min-h-screen bg-primary-bg">
      {/* Header */}
      <header className="bg-gray-900/50 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center space-x-4">
          <Link
            to="/dashboard"
            className="flex items-center text-primary-text hover:text-primary-accent transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
          <div className="w-px h-6 bg-gray-600"></div>
          <h1 className="text-xl font-headline font-semibold text-primary-text-bright">
            My Account
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Completion Banner */}
        {isProfileIncomplete && (
          <div className="mb-8 p-6 bg-gradient-to-r from-primary-accent/20 to-primary-accent/5 border border-primary-accent/30 rounded-xl">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-accent/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-primary-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-primary-text-bright mb-2">
                  Unlock full personalization!
                </h3>
                <p className="text-primary-text mb-4">
                  Complete your detailed profile to get the most personalized learning experience.
                </p>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="bg-primary-accent text-primary-bg px-6 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-200"
                >
                  Complete Your Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-900/50 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('account')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                activeTab === 'account'
                  ? 'bg-primary-accent text-primary-bg'
                  : 'text-primary-text hover:text-primary-text-bright'
              }`}
            >
              My Account
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                activeTab === 'profile'
                  ? 'bg-primary-accent text-primary-bg'
                  : 'text-primary-text hover:text-primary-text-bright'
              }`}
            >
              Learning Profile
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8">
          {activeTab === 'account' ? (
            <div className="space-y-6">
              <h2 className="text-xl font-headline font-semibold text-primary-text-bright mb-6">
                Account Information
              </h2>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Full Name
                </label>
                <div className="flex items-center space-x-3">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-primary-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-accent/20 focus:border-primary-accent"
                      />
                      <button
                        onClick={handleSaveName}
                        disabled={isSaving || !editedName.trim() || editedName === profile.fullName}
                        className="bg-primary-accent text-primary-bg px-4 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSaving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setEditedName(profile.fullName);
                        }}
                        className="bg-gray-700 text-primary-text px-4 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-primary-text">
                        {profile.fullName}
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-gray-700 text-primary-text px-4 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-primary-text mb-2">
                  Email Address
                </label>
                <div className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-primary-text">
                  {user.email}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Signed in with Google. To change your email, please update it in your Google account.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-gray-700 space-y-4">
                <button
                  onClick={handleSignOut}
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
                >
                  Log Out
                </button>
                
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full text-red-400 hover:text-red-300 transition-colors duration-200 text-sm"
                >
                  Delete Account
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-headline font-semibold text-primary-text-bright mb-6">
                Learning Profile
              </h2>

              {/* Current Profile Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary-text mb-2">
                    Preferred Language
                  </label>
                  <div className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-primary-text capitalize">
                    {profile.preferredLanguage}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-text mb-2">
                    Current Grade
                  </label>
                  <div className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-primary-text">
                    {profile.currentGrade}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary-text mb-2">
                    Subjects of Interest
                  </label>
                  <div className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-primary-text">
                    {profile.subjects.length > 0 ? profile.subjects.join(', ') : 'None selected'}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary-text mb-2">
                    Learning Goals
                  </label>
                  <div className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-primary-text">
                    {profile.learningGoals.length > 0 ? profile.learningGoals.join(', ') : 'None selected'}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-text mb-2">
                    Daily Study Time
                  </label>
                  <div className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-primary-text capitalize">
                    {profile.dailyStudyTime.replace('-', ' to ')} hours
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-text mb-2">
                    Explanation Style
                  </label>
                  <div className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-primary-text capitalize">
                    {profile.preferredExplanationStyle.replace('-', ' ')}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-primary-text mb-2">
                    Learning Challenge
                  </label>
                  <div className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-primary-text">
                    {profile.learningChallenge}
                  </div>
                </div>

                {profile.examName && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-primary-text mb-2">
                      Preparing for Exam
                    </label>
                    <div className="px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-primary-text">
                      {profile.examName}
                    </div>
                  </div>
                )}
              </div>

              {/* Update Profile Button */}
              <div className="pt-6 border-t border-gray-700">
                <Link
                  to="/onboarding"
                  className="inline-block bg-primary-accent text-primary-bg px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-200"
                >
                  Update Learning Profile
                </Link>
                <p className="text-sm text-gray-400 mt-2">
                  Edit your learning preferences and goals
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-text-bright mb-2">
                Delete Account
              </h3>
              <p className="text-primary-text">
                Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed.
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="flex-1 bg-gray-700 text-primary-text px-4 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
