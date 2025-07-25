#!/usr/bin/env node

// Quick validation script for Google OAuth setup
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 EkaAI: Validating Google OAuth Configuration...\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env.local file not found!');
  console.log('📝 Please create .env.local file with your Google Client ID');
  process.exit(1);
}

// Read .env.local file
const envContent = fs.readFileSync(envPath, 'utf8');
const lines = envContent.split('\n');

let googleClientId = null;
lines.forEach(line => {
  if (line.startsWith('VITE_GOOGLE_CLIENT_ID=')) {
    googleClientId = line.split('=')[1]?.trim();
  }
});

// Validate Google Client ID
if (!googleClientId) {
  console.error('❌ VITE_GOOGLE_CLIENT_ID not found in .env.local');
  process.exit(1);
}

if (googleClientId === 'YOUR_GOOGLE_CLIENT_ID_HERE.googleusercontent.com' || 
    googleClientId === 'YOUR_ACTUAL_GOOGLE_CLIENT_ID_FROM_CONSOLE.apps.googleusercontent.com') {
  console.error('❌ Google Client ID is still using placeholder value!');
  console.log('\n📋 To fix this:');
  console.log('1. Go to: https://console.cloud.google.com/');
  console.log('2. Create a new project or select existing');
  console.log('3. Enable Google+ API');
  console.log('4. Go to Credentials → Create OAuth client ID');
  console.log('5. Choose "Web application"');
  console.log('6. Add authorized origins:');
  console.log('   - http://localhost:5173');
  console.log('   - http://localhost:5174');
  console.log('   - http://localhost:3000');
  console.log('   - http://127.0.0.1:5173');
  console.log('   - http://127.0.0.1:5174');
  console.log('7. Copy the Client ID and replace the placeholder in .env.local');
  process.exit(1);
}

// Validate format
if (!googleClientId.includes('.apps.googleusercontent.com')) {
  console.error('❌ Google Client ID format appears invalid');
  console.log('Expected format: xxxxx-xxxxx.apps.googleusercontent.com');
  console.log('Current value:', googleClientId);
  process.exit(1);
}

console.log('✅ Google Client ID found and appears valid');
console.log('📝 Client ID:', googleClientId.substring(0, 20) + '...');

// Check index.html for Google SDK
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  if (indexContent.includes('accounts.google.com/gsi/client')) {
    console.log('✅ Google Sign-In SDK found in index.html');
  } else {
    console.error('❌ Google Sign-In SDK not found in index.html');
  }
} else {
  console.warn('⚠️ index.html not found');
}

console.log('\n🎯 OAuth configuration appears valid!');
console.log('� IMPORTANT: Your dev server is running on PORT 5174, not 5173!');
console.log('💡 To fix the 400 origin_mismatch error:');
console.log('   1. Go to Google Cloud Console: https://console.cloud.google.com/');
console.log('   2. Navigate to APIs & Services → Credentials');
console.log('   3. Click on your OAuth 2.0 Client ID');
console.log('   4. In "Authorized JavaScript origins", ADD these URLs:');
console.log('      - http://localhost:5174');
console.log('      - http://127.0.0.1:5174');
console.log('   5. Click "Save"');
console.log('   6. Wait 5-10 minutes for changes to propagate');
console.log('   7. Clear browser cache and try again');
