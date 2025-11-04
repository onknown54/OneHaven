import supabase from "../config/supabase.js";

const supabaseAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    
    if (!authHeader.startsWith("Bearer "))
      return res
        .status(401)
        .json({ message: "Missing or invalid Authorization header" });

    const token = authHeader.split(" ")[1];
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data?.user)
      return res.status(401).json({ message: "Invalid or expired token" });

    req.user = data.user;
    next();
  } catch (err) {
    next(err);
  }
};

export default supabaseAuth;
