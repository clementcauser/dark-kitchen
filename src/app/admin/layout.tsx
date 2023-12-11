"use client";

import { PropsWithChildren, useState } from "react";
import Sidebar from "./sidebar";
import { cn } from "@/lib/utils/shadcn-ui";
import Navbar from "./navbar";

export default function Layout({ children }: PropsWithChildren<{}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={cn("transition-all", isSidebarOpen ? "lg:ml-52" : "ml-0")}>
      <Sidebar
        isOpen={isSidebarOpen}
        toggle={() => setIsSidebarOpen((prev) => !prev)}
      />
      <Navbar
        toggleMenu={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
      />
      <main className="transition-all min-h-screen max-w-7xl m-auto p-2">
        {children}
      </main>
    </div>
  );
}
