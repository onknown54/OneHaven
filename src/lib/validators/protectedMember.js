import Joi from "joi";

export const protectedMemberSchema = Joi.object({
  first_name: Joi.string().min(1).max(100).required(),
  last_name: Joi.string().min(1).max(100).required(),
  relationship: Joi.string()
    .valid("Son", "Daughter", "Parent", "Spouse", "Other")
    .required(),
  birth_year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
  status: Joi.string().valid("active", "inactive").default("active"),
});
