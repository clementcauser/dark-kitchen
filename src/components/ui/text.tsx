import { cn } from "@/lib/utils/shadcn-ui";

type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "p"
  | "blockquote"
  | "list"
  | "inline-code"
  | "lead"
  | "large"
  | "small"
  | "muted";

const MAP_VARIANTS_TO_STYLE: Record<TextVariant, string> = {
  "inline-code":
    "rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  blockquote: "mt-6 border-l-2 pl-6 italic",
  h1: "text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "text-3xl font-semibold tracking-tight first:mt-0",
  h3: "text-2xl font-semibold tracking-tight",
  h4: "text-xl font-semibold tracking-tight",
  large: "text-lg font-semibold",
  lead: "text-xl text-muted-foreground",
  list: "[&>li]:mt-2",
  muted: "text-sm text-muted-foreground",
  p: "leading-7",
  small: "text-sm font-medium leading-none",
};

export function getTextStyle(
  variant: TextVariant,
  additionalClassName?: string
) {
  return cn(MAP_VARIANTS_TO_STYLE[variant], additionalClassName);
}

export default getTextStyle;
