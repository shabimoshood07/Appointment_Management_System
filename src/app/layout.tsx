import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Session } from "next-auth";
import Provider from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-green-950 to-green-800 min-h-screen border border-yellow-400`}>
        <Provider session={session}>
          <Navbar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
