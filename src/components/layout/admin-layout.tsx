"use client";

import { Suspense } from "react";
import { Sidebar, MobileHeader } from "./sidebar";
import { motion } from "framer-motion";
import { DemoBanner } from "@/components/demo-banner";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Demo Banner */}
      <Suspense fallback={null}>
        <DemoBanner />
      </Suspense>

      {/* Mobile Header */}
      <MobileHeader />

      {/* Desktop Sidebar */}
      <Sidebar />

      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen p-4 pt-20 lg:ml-[280px] lg:p-6 lg:pt-6 xl:p-8"
      >
        {children}
      </motion.main>
    </div>
  );
}
