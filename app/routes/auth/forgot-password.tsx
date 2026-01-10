import { useState } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

import type { Route } from "./+types/forgot-password";
import { forgotPasswordFormValidator } from "@/validators";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/services/auth";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Resumind | Forgot Password" }];
}

const ForgotPassword = () => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof forgotPasswordFormValidator>>({
    resolver: zodResolver(forgotPasswordFormValidator),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordFormValidator>) => {
    setIsLoading(true);
    setIsButtonDisabled(true);

    const { email } = values;

    try {
      await resetPassword(email);
      toast.success(
        "Reset password email sent! Please check your inbox/spam and sign in again."
      );
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("This email is not registered.");
          form.setError("email", {
            message: "This email is not registered.",
          });
          break;
        default:
          toast.error("An unexpected error occurred. Please try again.");
          break;
      }
    } finally {
      setIsLoading(false);
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-36px-24px)] px-4">
      <div className="w-full max-w-lg space-y-8 border shadow-md p-8 rounded-md">
        <h1 className="text-2xl font-bold text-center">Forgot Password</h1>
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
                  <span>Sending email...</span>
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
