import supabase from "../config/supabase.js";
import eventEmitter from "../services/eventEmitter.service.js";
import { protectedMemberSchema } from "../lib/validators/protectedMember.js";
import { protectedMemberUpdateSchema } from "../lib/validators/protectedMemberUpdate.js";
import catchError from "../lib/catchError.js";
import Response from "../lib/response.js";

export const crateProtectedMember = catchError(async (req, res) => {
  const response = new Response(res);
  const { error, value } = protectedMemberSchema.validate(req.body);
  if (error) return response.badRequest(error.details[0].message);

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

  return response.created(member, "Protected member created successfully");
});

export const getProtectedMembers = catchError(async (req, res) => {
  const response = new Response(res);
  const { data: members, error } = await supabase
    .from("protected_members")
    .select("*")
    .eq("caregiver_id", req.caregiver.id);

  if (error) throw error;
  return response.success(members, "Protected members retrieved successfully");
});

export const updateProtectedMember = catchError(async (req, res) => {
  const response = new Response(res);
  const { error, value } = protectedMemberUpdateSchema.validate(req.body);
  if (error) return response.badRequest(error.details[0].message);

  const { data: existingMember } = await supabase
    .from("protected_members")
    .select("id")
    .eq("id", req.params.id)
    .eq("caregiver_id", req.caregiver.id)
    .single();

  if (!existingMember) return response.notFound("Protected member not found");

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

  return response.success(member, "Protected member updated successfully");
});

export const deleteProtectedMember = catchError(async (req, res) => {
  const response = new Response(res);
  const { data: existingMember } = await supabase
    .from("protected_members")
    .select("id")
    .eq("id", req.params.id)
    .eq("caregiver_id", req.caregiver.id)
    .single();

  if (!existingMember) return response.notFound("Protected member not found");

  const { error } = await supabase
    .from("protected_members")
    .delete()
    .eq("id", req.params.id);

  if (error) throw error;

  eventEmitter.emit("member_deleted", {
    caregiverId: req.caregiver.id,
    memberId: req.params.id,
  });

  return response.success({}, "Protected member deleted successfully");
});
