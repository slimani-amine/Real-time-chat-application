import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ippirrorddyhggsvkabs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwcGlycm9yZGR5aGdnc3ZrYWJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQxODk4OTQsImV4cCI6MjAxOTc2NTg5NH0.EXafvjMpJ6FZ_M7TDd47c7kKjcrZ_4Dkpplvq0VG7k4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
