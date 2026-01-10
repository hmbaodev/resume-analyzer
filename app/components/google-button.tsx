import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { Button } from "./ui/button";
import { loginWithGoogle } from "@/services/auth";

const GoogleButton = ({
  text,
}: {
  text: string;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      await loginWithGoogle();
      toast.success("Successfully signed in with Google!");
      navigate("/");
    } catch (error: any) {
      switch (error.code) {
        case "auth/popup-closed-by-user":
          toast.error("Sign in popup closed before completion.");
          break;
        case "auth/popup-blocked":
          toast.error("Popup blocked! Please allow popups for this site.");
          setError("Popup blocked! Please allow popups for this site.");
          break;
        case "auth/account-exists-with-different-credential":
          toast.error(
            "An account already exists with the same email address but different sign-in credentials."
          );
          setError("Email already in use with another login method.");
          break;
        default:
          toast.error("Failed to sign in with Google. Please try again.");
          setError("Failed to sign in. Please try again.");
          console.error("Auth Error:", error.code);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      <Button
        variant="outline"
        size="lg"
        disabled={loading}
        className="flex items-center justify-center gap-2 w-full cursor-pointer"
        onClick={handleGoogleSignIn}
      >
        <img
          src="/google-icon.svg"
          alt="Google"
          className={`size-4 ${loading ? "animate-pulse" : ""}`}
        />
        <span>{loading ? "Connecting..." : text}</span>
      </Button>

      {error && (
        <p className="text-red-500 text-xs text-center font-medium">{error}</p>
      )}
    </div>
  );
};

export default GoogleButton;
