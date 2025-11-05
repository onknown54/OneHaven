import jwt from "jsonwebtoken";
import supabase from "../config/supabase.js";
import catchError from "../lib/catchError.js";
import bcrypt from "bcryptjs";
import {
  caregiverLoginSchema,
  caregiverSignupSchema,
} from "../lib/validators/careGiver.js";
import Response from "../lib/response.js";

export const createCareGiver = catchError(async (req, res) => {
  const response = new Response(res);
  const { error, value } = caregiverSignupSchema.validate(req.body);
  if (error) return response.badRequest(error.details[0].message);

  const { name, email, passkey } = value;
  const { data: existingCaregiver } = await supabase
    .from("caregivers")
    .select("id")
    .eq("email", email)
    .single();

  if (existingCaregiver)
    return response.conflict("Caregiver with this email already exists");

  const hashedPasskey = await bcrypt.hash(passkey, 12);
  const { data: caregiver, error: insertError } = await supabase
    .from("caregivers")
    .insert([
      {
        name,
        email,
        passkey: hashedPasskey,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (insertError) throw insertError;
  const token = jwt.sign(
    { caregiverId: caregiver.id, email: caregiver.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  const caregiverData = {
    id: caregiver.id,
    name: caregiver.name,
    email: caregiver.email,
    createdAt: caregiver.created_at,
  };

  return response.created({ caregiver: caregiverData, token });
});

export const loginCareGiver = catchError(async (req, res) => {
  const response = new Response(res);
  const { error, value } = caregiverLoginSchema.validate(req.body);
  if (error) return response.badRequest(error.details[0].message);

  const { email, passkey } = value;
  const { data: caregiver, error: fetchError } = await supabase
    .from("caregivers")
    .select("*")
    .eq("email", email)
    .single();

  if (fetchError || !caregiver)
    return response.unauthorized("Invalid credentials");

  const isValidPasskey = await bcrypt.compare(passkey, caregiver.passkey);

  if (!isValidPasskey) return response.unauthorized("Invalid credentials");

  const token = jwt.sign(
    { caregiverId: caregiver.id, email: caregiver.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  const caregiverData = {
    id: caregiver.id,
    name: caregiver.name,
    email: caregiver.email,
    createdAt: caregiver.created_at,
  };

  return response.success(
    { caregiver: caregiverData, token },
    "Login successful"
  );
});

export const getProfile = catchError(async (req, res) => {
  const response = new Response(res);
  const caregiverData = {
    id: req.caregiver.id,
    name: req.caregiver.name,
    email: req.caregiver.email,
    createdAt: req.caregiver.created_at,
  };
  return response.success({ caregiver: caregiverData });
});
