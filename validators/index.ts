import { z } from "zod";

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

export { signUpFormValidator, signInFormValidator };
