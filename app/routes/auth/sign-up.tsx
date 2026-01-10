import { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

import type { Route } from "./+types/sign-up";
import { signUpFormValidator } from "@/validators";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUp } from "@/services/auth";
import GoogleButton from "@/components/google-button";
import AuthFormDivider from "@/components/auth-form-divider";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Resumind | Sign Up Your Account" }];
}

export default function SignUp() {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof signUpFormValidator>>({
    resolver: zodResolver(signUpFormValidator),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpFormValidator>) => {
    setIsLoading(true);
    setIsButtonDisabled(true);

    const { name, email, password } = values;

    try {
      await signUp(name, email, password);
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already registered.");
          form.setError("email", {
            message: "This email is already registered.",
          });
          break;

        case "auth/invalid-email":
          toast.error("The email address is not valid.");
          form.setError("email", {
            message: "Please enter a valid email address.",
          });
          break;

        case "auth/weak-password":
          toast.error("The password is too weak.");
          form.setError("password", {
            message: "Password should be at least 6 characters.",
          });
          break;

        default:
          toast.error("An unexpected error occurred. Please try again.");
          form.setError("root", {
            message: "Server error. Please try again later.",
          });
          break;
      }
    } finally {
      // This runs regardless of success or failure
      setIsLoading(false);
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-36px-24px)] px-4">
      <div className="w-full max-w-lg space-y-8 border shadow-md p-8 rounded-md">
        <div>
          <h1 className="text-2xl font-bold text-center mb-2">
            Sign Up New Account
          </h1>
          <p className="text-base">
            Let's get you started on your job application journey
          </p>
        </div>
        <GoogleButton text="Continue with Google" />
        <AuthFormDivider />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-stretch gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="h-10"
                      type="text"
                      placeholder="Your name..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="h-10"
                      type="email"
                      placeholder="Your email..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="h-10 pr-10"
                        type={showPassword ? "text" : "password"} // Controlled by single state
                        placeholder="Your password..."
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        className="h-10 pr-10"
                        type={showPassword ? "text" : "password"} // Uses same state as primary password
                        placeholder="Confirm your password..."
                        {...field}
                      />
                      {/* Optional: You can remove this icon if you want only one toggle to control both */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="show-password"
                className="size-4 cursor-pointer"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)} // Syncs with state
              />
              <label
                htmlFor="show-password"
                className="text-sm cursor-pointer select-none"
              >
                Show password
              </label>
            </div>
            <Button
              size={"lg"}
              type="submit"
              className={twMerge(
                "bg-blue-600 hover:bg-blue-700 cursor-pointer",
                isLoading && "flex items-center gap-2"
              )}
              disabled={isButtonDisabled}
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Signing Up...</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <p className="text-center">
              Already have an account?{" "}
              <Link className="link-primary" to="/login">
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
