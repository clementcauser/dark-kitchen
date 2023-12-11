import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import getTextStyle from "@/components/ui/text";
import { APP_NAME } from "@/lib/constants/app";
import { cn } from "@/lib/utils/shadcn-ui";
import { Menu } from "lucide-react";

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleMenu: () => void;
}

const Navbar = ({ isSidebarOpen, toggleMenu }: NavbarProps) => (
  <nav
    className={cn(
      "flex items-center justify-between w-full h-16 px-3 lg:pr-4",
      isSidebarOpen ? "lg:pl-0" : " lg:pl-16"
    )}
  >
    <h1 className={getTextStyle("h4", "my-auto lg:pl-4")}>{APP_NAME}</h1>
    <div className="flex items-center gap-3">
      <p className="hidden md:block">
        <span className="text-muted-foreground mr-2">Bienvenue</span>
        Clément
      </p>
      <Avatar>
        <AvatarImage src={/** TODO: ADD SRC */ ""} />
        <AvatarFallback>CC</AvatarFallback>
      </Avatar>
      <Button
        className="lg:hidden"
        aria-label="Ouvrir le menu"
        onClick={() => toggleMenu()}
        size="icon"
      >
        <Menu />
        <span className="sr-only">Ouvrir le menu</span>
      </Button>
    </div>
  </nav>
);

export default Navbar;
