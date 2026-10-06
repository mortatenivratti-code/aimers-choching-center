import { createClient } from '@supabase/supabase-js';

const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};

export const SUPABASE_PROJECT_NAME = "mortatenivratti-code's Project";
export const SUPABASE_PROJECT_ID =
  env.VITE_SUPABASE_PROJECT_ID || 'opptrstfkanjmekocggh';
export const SUPABASE_URL =
  env.VITE_SUPABASE_URL || 'https://opptrstfkanjmekocggh.supabase.co';
export const SUPABASE_REST_URL = `${SUPABASE_URL}/rest/v1/`;
export const SUPABASE_ANON_KEY =
  env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_dr2el_96NytCRsqaKd3ciw_ResTVMHn';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


