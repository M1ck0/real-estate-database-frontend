import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "http://supabasekong-b48wcgwwoc0ww048g8gckcwk.49.13.65.98.sslip.io";
const supabaseKey = import.meta.env.VITE_SUPABASEANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
