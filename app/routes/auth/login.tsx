import { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

import type { Route } from "./+types/login";
import { signInFormValidator } from "@/validators";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/services/auth";
import GoogleButton from "@/components/google-button";
import AuthFormDivider from "@/components/auth-form-divider";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Resumind | Sign In to Your Account" }];
}

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof signInFormValidator>>({
    resolver: zodResolver(signInFormValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInFormValidator>) => {
    setIsButtonDisabled(true);
    setIsLoading(true);

    const { email, password } = values;

    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (error: any) {
      // Handling different Firebase Auth error codes
      switch (error.code) {
        case "auth/invalid-credential":
          toast.error("Wrong email or password.");
          form.setError("email", {
            message: "Wrong email or password.",
          });
          break;
        case "auth/wrong-password":
          toast.error("Wrong email or password.");
          form.setError("password", {
            message: "Wrong password. Try again or Sign in with Google",
          });
          break;
        default:
          console.log(error.code);
          toast.error("An unexpected error occurred. Please try again later.");
          break;
      }
    } finally {
      setIsButtonDisabled(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-36px-24px)] px-4 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-center mb-2">
          Sign In to Your Account
        </h1>
        <p className="text-base">
          Login to continue your job application journey
        </p>
      </div>
      <div className="w-full max-w-lg space-y-8 border shadow-md p-8 rounded-md">
        <GoogleButton text="Sign In with Google" />
        <AuthFormDivider />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-stretch gap-4"
          >
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
                        className="h-10 pr-10" // Add padding for the icon
                        type={showPassword ? "text" : "password"} // 2. Toggle type
                        placeholder="Your password..."
                        {...field}
                      />
                      {/* 3. Add toggle button inside the input */}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="show-password"
                  className="size-4 cursor-pointer"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
                <label
                  htmlFor="show-password"
                  className="text-sm cursor-pointer select-none"
                >
                  Show password
                </label>
              </div>
              <Link to="/forgot-password" className="link-primary">
                Forgot password?
              </Link>
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
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <p className="text-center">
              Do not have an account yet?{" "}
              <Link className="link-primary" to="/sign-up">
                Sign up
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
