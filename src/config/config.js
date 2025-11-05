import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "../../.env") });

const CONFIG = {
  PORT: process.env.PORT || 3000,
  ENVIRONMENT: process.env.NODE_ENV || "development",

  MONGO_URI: process.env.MONGO_URI,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  SUPABASE_ANON_KEY: process.env.SUPABASE_KEY,

  JWT_SECRET: process.env.JWT_SECRET,

  BASE_URL:
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_URL
      : process.env.LIVE_URL,
};

const requiredEnvVars = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "JWT_SECRET",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.warn(`Warning: ${envVar} is not set in environment variables`);
  }
}

export default CONFIG;
