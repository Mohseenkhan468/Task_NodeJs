import Joi from "joi";
const emailPasswordValidationObj = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.empty": "Email is required.",
    "string.email": "Please enter a valid email.",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Password is required.",
    "string.empty": "Password is required.",
    "string.min": "Password must be at least 8 characters long.",
  }),
});
export const signupValidation = async (body) => {
  return await emailPasswordValidationObj.validate(body, { abortEarly: false });
};
export const loginValidation = async (body) => {
  return await emailPasswordValidationObj.validate(body, { abortEarly: false });
};
