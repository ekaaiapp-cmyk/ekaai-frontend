// Test Supabase connection
// You can run this in browser console on your app page

import { supabase } from './src/services/supabase';

// Test connection
console.log('Supabase URL:', supabase.supabaseUrl);
console.log('Supabase Key:', supabase.supabaseKey.substring(0, 20) + '...');

// Test auth configuration
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Auth error:', error);
  } else {
    console.log('Auth working, session:', data.session);
  }
});
