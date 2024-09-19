import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "http://supabasekong-vc80cw0s0sg0wsckscocok84.167.235.22.31.sslip.io";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
