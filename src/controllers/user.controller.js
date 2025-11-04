import catchError from "../lib/catchError.js";
import supabase from "../config/supabase.js";

export const createUser = catchError(async (req, res) => {
  const payload = {
    // if client provides an id (auth user id), use it; otherwise let Postgres generate one
    id: req.body.id || undefined,
    email: req.body.email,
    name: req.body.name || null,
    age: req.body.age || null,
    tags: req.body.tags || null,
    active: req.body.active !== undefined ? req.body.active : true,
  };

  const { data, error } = await supabase.from("profiles").insert([payload]).select().single();
  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
});

export const getUsers = catchError(async (req, res) => {
  const { active, limit = 10, skip = 0, sortBy = "created_at" } = req.query;

  let query = supabase.from("profiles").select("*");
  if (active !== undefined) query = query.eq("active", active === "true");
  // order and range
  query = query.order(sortBy, { ascending: true }).range(parseInt(skip), parseInt(skip) + parseInt(limit) - 1);

  const { data, error } = await query;
  if (error) return res.status(400).json({ message: error.message });
  res.json(data);
});

export const getUserById = catchError(async (req, res) => {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", req.params.id).single();
  if (error) return res.status(404).json({ message: "User not found" });
  res.json(data);
});

export const updateUser = catchError(async (req, res) => {
  const { data, error } = await supabase
    .from("profiles")
    .update({ ...req.body })
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) return res.status(404).json({ message: "User not found" });
  res.json(data);
});

export const deleteUser = catchError(async (req, res) => {
  const { data, error } = await supabase.from("profiles").delete().eq("id", req.params.id).select().single();
  if (error) return res.status(404).json({ message: "User not found" });
  res.json({ message: "User deleted", user: data });
});
