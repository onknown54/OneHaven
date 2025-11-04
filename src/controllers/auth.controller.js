import catchError from "../lib/catchError.js";
import supabase from "../config/supabase.js";

export const signUp = catchError(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const data = await supabase.auth.signUp({ email, password });
  const supabaseUser = data.user;
  const profile = await supabase
    .from("profiles")
    .insert([
      {
        id: supabaseUser.id,
        email,
        name: req.body.name || null,
        age: req.body.age || null,
        tags: req.body.tags || null,
        active: true,
      },
    ])
    .select()
    .single();

  if (profileError) {
    console.warn("Failed to create profile:", profileError.message);
  } else {
    profile = profileData;
  }

  res.status(201).json({ message: "Signup successful", supabaseUser, profile });
});

export const signIn = catchError(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ message: error.message });

  // Return session and user. Client should store the access_token (data.session.access_token)
  // Also fetch the related profile (if any) from the `profiles` table.
  let profile = null;
  try {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user?.id)
      .single();
    profile = profileData;
  } catch (e) {
    // ignore — profile may not exist yet
  }

  res.json({ session: data.session, user: data.user, profile });
});
