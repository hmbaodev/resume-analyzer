import Logo from "./logo";
import { Button } from "./ui/button";
import { Link } from "react-router";

const Header = () => {
  return (
    <header className="py-3 border-b">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <Button variant="outline" className="cursor-pointer" asChild>
            <Link to="/Login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
