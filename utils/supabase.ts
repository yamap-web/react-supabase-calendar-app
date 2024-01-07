import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  'https://bejcujkzypljtonizcgz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlamN1amt6eXBsanRvbml6Y2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ0NTYzMjEsImV4cCI6MjAyMDAzMjMyMX0.rEc2LlsCJYdeDaeK_4ikippMcnJBCK3EZEmdEnKzxrc'
);
