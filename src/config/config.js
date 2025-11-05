import dotenv from "dotenv";

dotenv.config("../.env");

const CONFIG = {
  PORT: process.env.PORT || 3000,
  ENVIROMENT: process.env.NODE_ENV || "development",

  MONGO_URI: process.env.MONGO_URI,
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY: process.env.SUPABASE_KEY,

  BASE_URL:
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_URL
      : process.env.LIVE_URL,
};

export default CONFIG;
