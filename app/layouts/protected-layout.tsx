import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "@/store/use-auth-store";

export default function ProtectedLayout() {
  const { user, isLoading } = useAuthStore();

  // Show nothing or a spinner while Firebase initializes
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-60px)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user exists, render the child routes
  return <Outlet />;
}
