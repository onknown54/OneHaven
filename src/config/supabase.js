import { createClient } from "@supabase/supabase-js";
import CONFIG from "./config.js";

if (!CONFIG.SUPABASE_URL || !CONFIG.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn(
    "Warning: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not set. Supabase client may not work as expected."
  );
}

const supabase = createClient(
  CONFIG.SUPABASE_URL,
  CONFIG.SUPABASE_SERVICE_ROLE_KEY
);

export default supabase;
