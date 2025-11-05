import jwt from "jsonwebtoken";
import supabase from "../config/supabase.js";
import catchError from "../lib/catchError.js";
import Response from "../lib/response.js";

const authenticateToken = catchError(async (req, res, next) => {
  const response = new Response(res);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return response.unauthorized("Access token required");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const { data: caregiver, error } = await supabase
    .from("caregivers")
    .select("*")
    .eq("id", decoded.caregiverId)
    .single();

  if (error || !caregiver) return response.unauthorized("Invalid token");

  req.caregiver = caregiver;
  next();
});

export default authenticateToken;
