// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";
// import { Header } from "@/components/header";
import Sidebar from "@/components/sidebar";
// import { Toaster } from "@/components/ui/toaster";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex mx-4 mt-6'>
      <Sidebar />
      {children}
    </div>

  );
}
