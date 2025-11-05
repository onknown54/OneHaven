import Joi from "joi";

export const protectedMemberUpdateSchema = Joi.object({
  first_name: Joi.string().min(1).max(100),
  last_name: Joi.string().min(1).max(100),
  relationship: Joi.string()
    .valid("Son", "Daughter", "Parent", "Spouse", "Other"),
  birth_year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear()),
  status: Joi.string().valid("active", "inactive"),
});
