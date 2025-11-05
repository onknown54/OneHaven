import supabase from "../config/supabase.js";
import eventEmitter from "../services/eventEmitter.service.js";
import { protectedMemberSchema } from "../lib/validators/protectedMember.js";
import { protectedMemberUpdateSchema } from "../lib/validators/protectedMemberUpdate.js";
import catchError from "../lib/catchError.js";

export const crateProtectedMember = catchError(async (req, res) => {
  const { error, value } = protectedMemberSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { data: member, error: insertError } = await supabase
    .from("protected_members")
    .insert([
      {
        caregiver_id: req.caregiver.id,
        ...value,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (insertError) throw insertError;

  eventEmitter.emit("member_added", {
    caregiverId: req.caregiver.id,
    memberId: member.id,
  });

  res.status(201).json({
    status: "success",
    message: "Protected member created successfully",
    member,
  });
});

export const getProtectedMembers = catchError(async (req, res) => {
  const { data: members, error } = await supabase
    .from("protected_members")
    .select("*")
    .eq("caregiver_id", req.caregiver.id);

  if (error) throw error;

  res.json({
    status: "success",
    message: "Protected members retrieved successfully",
    members,
  });
});

export const updateProtectedMember = catchError(async (req, res) => {
  const { error, value } = protectedMemberUpdateSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { data: existingMember } = await supabase
    .from("protected_members")
    .select("id")
    .eq("id", req.params.id)
    .eq("caregiver_id", req.caregiver.id)
    .single();

  if (!existingMember)
    return res.status(404).json({ error: "Protected member not found" });

  const { data: member, error: updateError } = await supabase
    .from("protected_members")
    .update(value)
    .eq("id", req.params.id)
    .select()
    .single();

  if (updateError) throw updateError;

  eventEmitter.emit("member_updated", {
    caregiverId: req.caregiver.id,
    memberId: member.id,
  });

  res.json({
    message: "Protected member updated successfully",
    member,
  });
});

export const deleteProtectedMember = catchError(async (req, res) => {
  const { data: existingMember } = await supabase
    .from("protected_members")
    .select("id")
    .eq("id", req.params.id)
    .eq("caregiver_id", req.caregiver.id)
    .single();

  if (!existingMember)
    return res
      .status(404)
      .json({ status: "error", message: "Protected member not found" });

  const { error } = await supabase
    .from("protected_members")
    .delete()
    .eq("id", req.params.id);

  if (error) throw error;

  eventEmitter.emit("member_deleted", {
    caregiverId: req.caregiver.id,
    memberId: req.params.id,
  });

  res.json({
    status: "success",
    message: "Protected member deleted successfully",
  });
});
