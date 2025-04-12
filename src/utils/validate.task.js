import Joi from "joi";

const createTaskValidationObj = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Title is required.",
    "string.empty": "Title is required.",
  }),
  description: Joi.string().optional(),
  status: Joi.string()
    .valid("pending", "in_progress", "completed")
    .required()
    .messages({
      "any.only": "Status must be one of pending, in_progress, or completed.",
      "any.required": "Status is required.",
      "string.empty": "Status is required.",
    }),
  dueDate: Joi.date().required().messages({
    "date.base": "Due date must be a valid date.",
    "any.required": "Due date is required.",
    "string.empty": "Due date is required.",
  }),
});

const updateTaskValidationObj = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string()
      .valid("pending", "in_progress", "completed")
      .optional()
      .messages({
        "any.only": "Status must be one of: pending, in_progress, or completed.",
      }),
    dueDate: Joi.date().optional().messages({
      "date.base": "Due date must be a valid date.",
    }),
  });
  

export const createTaskValidation = async (body) => {
  return await createTaskValidationObj.validate(body, { abortEarly: false });
};

export const updateTaskValidation = async (body) => {
  return await updateTaskValidationObj.validate(body, { abortEarly: false });
};
