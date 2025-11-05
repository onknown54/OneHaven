import jwt from "jsonwebtoken";
import supabase from "../config/supabase.js";
import catchError from "../lib/catchError.js";

const authenticateToken = catchError(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ status: "error", message: "Access token required" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { data: caregiver, error } = await supabase
    .from("caregivers")
    .select("*")
    .eq("id", decoded.caregiverId)
    .single();

  if (error || !caregiver)
    return res.status(401).json({ error: "Invalid token" });

  req.caregiver = caregiver;
  next();
});

export default authenticateToken;
