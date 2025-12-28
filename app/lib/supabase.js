import { createClient } from "@supabase/supabase-js";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("Supabase environment variables are missing");
}

export const supabase = createClient(
  // process.env.NEXT_PUBLIC_SUPABASE_URL,
  // process.env.NEXT_PUBLIC_SUPABASE_KEY
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);
