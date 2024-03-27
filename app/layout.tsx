"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/shared/SideBar";
import MobileSideBar from "@/components/shared/MobileSideBar";
import MobileSideLinks from "@/components/shared/MobileSideLinks";
import { usePathname } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {!pathname.startsWith("/sign") && (
            <div>
              <div className="flex bg-black max-w-[2000px] h-screen text-white text-base max-sm:hidden ">
                <div className="w-1/4">
                  <SideBar />
                </div>
                <div className="w-3/4 sticky overflow-y-scroll ">
                  {children}
                </div>
              </div>
              <div className="flex flex-col  justify-between h-screen text-base text-white bg-black sm:hidden">
                <div>
                  <MobileSideBar />
                </div>
                <div className="sticky overflow-y-scroll">{children}</div>
                <div>
                  <MobileSideLinks />
                </div>
              </div>
              <Toaster position="top-right" />
            </div>
          )}
          {pathname.startsWith("/sign") && (
            <div className="bg-black text-white h-screen">{children}</div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
