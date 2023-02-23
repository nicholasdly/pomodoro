
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';

const supabaseURL = SUPABASE_URL;
const supabaseKey = SUPABASE_KEY;

export const supabase = createClient(supabaseURL, supabaseKey);
