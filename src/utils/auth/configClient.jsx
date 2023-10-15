import { createClient } from "@supabase/supabase-js";

const { VITE_SUPABES_URL, VITE_SUPABES_ANON_KEY } = import.meta.env;

export const supabase = createClient(VITE_SUPABES_URL, VITE_SUPABES_ANON_KEY);

export default supabase;
