#!/usr/bin/env node

// Test script to check if Google OAuth origin is properly configured
import https from 'https';

const CLIENT_ID = '132012266708-jqdgb3f0vtf7be7lm9ssf7n9be6k668f.apps.googleusercontent.com';
const ORIGIN = 'http://localhost:5174';

console.log('🔍 Testing Google OAuth origin configuration...\n');
console.log(`📝 Client ID: ${CLIENT_ID.substring(0, 20)}...`);
console.log(`🌐 Testing Origin: ${ORIGIN}\n`);

// This is a simple test - the real test is trying the actual OAuth flow
console.log('💡 To test if your Google Cloud Console changes worked:');
console.log('1. Go to: http://localhost:5174/login');
console.log('2. Click "Sign in with Google"');
console.log('3. If you see Google sign-in popup = ✅ FIXED!');
console.log('4. If you still get 400 error = ⚠️ Wait longer or check console settings');

console.log('\n🔧 If still getting errors:');
console.log('• Double-check you added http://localhost:5174 to authorized origins');
console.log('• Wait 5-10 minutes for Google changes to propagate');
console.log('• Try incognito/private browsing mode');
console.log('• Clear all browser cache/cookies');

console.log('\n🎯 Your Google Cloud Console URL:');
console.log('https://console.cloud.google.com/apis/credentials');
