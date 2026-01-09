import { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

import type { Route } from "./+types/login";
import { signInFormValidator } from "validators";
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

export function meta({}: Route.MetaArgs) {
  return [{ title: "Resumind | Sign In to Your Account" }];
}

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
      toast.success("Logged in successfully!")
      navigate("/")
    } catch (error: any) {
      // Handling different Firebase Auth error codes
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No account found with this email.");
          form.setError("email", {
            message: "No account found with this email.",
          });
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password. Please try again.");
          form.setError("password", {
            message: "Incorrect password. Please try again.",
          });
          break;
        default:
          toast.error("An unexpected error occurred. Please try again later.");
          break;
      }
    } finally {
      setIsButtonDisabled(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-36px-24px)] px-4">
      <div className="w-full max-w-lg space-y-8 border shadow-md p-8 rounded-md">
        <h1 className="text-2xl font-bold text-center">
          Sign In to Your Account
        </h1>
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
                    <Input
                      className="h-10"
                      type="password"
                      placeholder="Your password..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="show-password" className="mr-2" />
                <label htmlFor="show-password">Show password</label>
              </div>
              <p>Forgot password?</p>
            </div>
            <Button
              size={"lg"}
              type="submit"
              className="bg-blue-600 hover:bg-blue-600/85 cursor-pointer"
            >
              Sign In
            </Button>
            <p className="text-center">
              Do not have an account yet?{" "}
              <Link
                className="text-blue-600 hover:text-blue-600/85"
                to="/sign-up"
              >
                Sign up
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}
