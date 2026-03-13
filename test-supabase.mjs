
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kxyjowrhmjllxyxyxyxy.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."; // Need to find the actual key if any, or use the one from .env.local

console.log("Testing Supabase connection...");
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    const { data, error } = await supabase.from("vinhos").select("*").limit(1);
    if (error) {
      console.error("Supabase Error:", error.message);
    } else {
      console.log("Supabase Connection Successful! Data:", data);
    }
  } catch (err) {
    console.error("Fetch Error:", err);
  }
}

testConnection();
