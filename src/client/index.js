import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://apibaza.cityproperties.me";
const supabaseKey = import.meta.env.VITE_SUPABASEANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
