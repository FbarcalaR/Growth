import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";

export const metadata: Metadata = {
  title: "Growth",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body flex items-center flex-col h-screen bg-main-back-color text-main-text">
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
