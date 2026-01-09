import { createClient } from "@supabase/supabase-js";

// if (
//   !process.env.NEXT_PUBLIC_SUPABASE_URL ||
//   !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// ) {
//   throw new Error("Supabase environment variables are missing");
// }

// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// );



    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  throw new Error("Supabase environment variables are missing");
} 

export const supabase = createClient(
process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);