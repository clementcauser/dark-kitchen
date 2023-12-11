import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/shadcn-ui";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type Common = {
  isExpanded: boolean;
  label: string;
  icon: LucideIcon;
};

type ActionItem = Common & {
  type: "action";
  onClick: () => void;
};

type LinkItem = Common & {
  type: "link";
  href: string;
};

type SidebarNavItemProps = ActionItem | LinkItem;

const SidebarNavItem = (props: SidebarNavItemProps) => {
  const IconComponent = props.icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size={props.isExpanded ? "default" : "icon"}
            className=""
            asChild={props.type === "link"}
            onClick={
              props.type === "action" ? () => props.onClick() : undefined
            }
          >
            {props.type === "link" ? (
              <Link href={props.href}>
                <IconComponent className="text-muted-foreground" />
                <span
                  className={cn(
                    "transition-all",
                    props.isExpanded ? "block ml-2" : "hidden"
                  )}
                >
                  {props.label}
                </span>
              </Link>
            ) : (
              <>
                <IconComponent className="text-muted-foreground" />
                <span
                  className={cn(
                    "transition-all",
                    props.isExpanded ? "block ml-2" : "hidden"
                  )}
                >
                  {props.label}
                </span>
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{props.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SidebarNavItem;
