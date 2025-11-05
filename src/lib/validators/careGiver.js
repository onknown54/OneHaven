import Joi from "joi";

export const caregiverSignupSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  passkey: Joi.string().min(6).required(),
});

export const caregiverLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  passkey: Joi.string().required(),
});
