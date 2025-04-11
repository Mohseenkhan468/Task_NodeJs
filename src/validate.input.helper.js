import Joi from "joi";
const emailPasswordValidationObj = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});
export const signupValidation = async (body) => {
  return await emailPasswordValidationObj.validate(body, { abortEarly: false });
};
export const loginValidation = async (body) => {
  return await emailPasswordValidationObj.validate(body, { abortEarly: false });
};
