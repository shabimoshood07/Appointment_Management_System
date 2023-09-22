import Navbar from "@/components/Navbar";
import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Session } from "next-auth";
import Provider from "@/components/SessionProvider";
import { Toaster } from "@/components/ui/toaster";
const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Appointment Management System",
  description: "Manage your appointments",
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
      <body
        className={`${rubik.className} bg-gradient-to-br from-green-950 to-green-800 min-h-screen`}
      >
        <Provider session={session}>
          <Navbar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
