import { z } from "zod";

import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from "@/constants";

const signUpFormValidator = z
  .object({
    name: z.string().min(1, "Name cannot be blank"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const signInFormValidator = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const forgotPasswordFormValidator = z.object({
  email: z.email("Invalid email address"),
});

const resumeUploadFromValidator = z.object({
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  jobDescription: z
    .string()
    .min(10, "Please provide a more detailed description"),
  resumeFile: z
    .instanceof(File, { message: "Resume PDF is required" })
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `File size must be less than 20MB.`
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Only .pdf format is supported."
    ),
});

export {
  signUpFormValidator,
  signInFormValidator,
  forgotPasswordFormValidator,
  resumeUploadFromValidator,
};
