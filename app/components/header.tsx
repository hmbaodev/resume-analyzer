import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/use-auth-store";
import { logout } from "@/services/auth";
import { toast } from "sonner";

const Header = () => {
  const { user, isLoading } = useAuthStore();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); //
      toast.success("Signed out successfully"); //
      navigate("/login");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className="py-3 border-b sticky top-0 bg-background z-50">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          {isLoading ? (
            <div className="h-8 w-8 animate-pulse bg-muted rounded-full" />
          ) : user ? (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="cursor-pointer rounded-lg"
                asChild
              >
                <Link to="/upload">Upload your resume</Link>
              </Button>
              <DropdownMenu open={open} onOpenChange={setOpen}>
                {/* Handles both click and hover (via onMouseEnter) */}
                <DropdownMenuTrigger asChild onMouseEnter={() => setOpen(true)}>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full cursor-pointer"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.photoURL || ""}
                        alt={user.displayName || ""}
                      />
                      <AvatarFallback>
                        <img
                          src="/avatar-fallback.png"
                          alt={user.displayName || ""}
                        />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-56"
                  align="end"
                  forceMount
                  onMouseLeave={() => setOpen(false)}
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.displayName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button className="cursor-pointer" asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
