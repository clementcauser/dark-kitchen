import { AdminRoutes } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/shadcn-ui";
import {
  ScrollText,
  SidebarClose,
  SidebarOpen,
  SlidersHorizontal,
} from "lucide-react";
import Image from "next/image";
import SidebarNavItem from "./sidebar-navitem";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar = ({ isOpen, toggle }: SidebarProps) => {
  return (
    <nav
      className={cn(
        "hidden lg:flex fixed z-10 left-0 flex-col border-r bg-card h-screen transition-all",
        isOpen ? "w-52" : "w-16"
      )}
    >
      <div className={cn("h-16 flex items-center pl-3")}>
        <Link href={AdminRoutes.HOME}>
          <Image
            src="/logo.svg"
            alt="Aller à l'accueil"
            height={32}
            width={32}
          />
          <span className="sr-only">Aller à l'accueil</span>
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-between p-3">
        <ul>
          <li>
            <SidebarNavItem
              type="link"
              href={AdminRoutes.RECIPES}
              icon={ScrollText}
              isExpanded={isOpen}
              label="Mes recettes"
            />
          </li>
          <li>Nav 2</li>
          <li>Nav 3</li>
          <li>Nav 4</li>
        </ul>

        <ul>
          <li>
            <SidebarNavItem
              type="link"
              href={AdminRoutes.SETTINGS}
              isExpanded={isOpen}
              label="Mes réglages"
              icon={SlidersHorizontal}
            />
          </li>
          <li>
            <SidebarNavItem
              type="action"
              onClick={toggle}
              isExpanded={isOpen}
              label="Fermer le menu"
              icon={isOpen ? SidebarClose : SidebarOpen}
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
