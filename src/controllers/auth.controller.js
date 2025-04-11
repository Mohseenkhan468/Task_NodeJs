import { signupValidation } from "../validate.input.helper.js";

export const signUp = async (req, res) => {
  try {
    console.log(Object.keys(req.Object).length)
    const { error } = await signupValidation(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.details[0].message,
      });
    }
    return res.status(201).json({
        success:true,
        message:'User created successfully.'
    })
  } catch (err) {
    return res.status(500).json({
        success:false,
        message:err.message
    })
  }
};
