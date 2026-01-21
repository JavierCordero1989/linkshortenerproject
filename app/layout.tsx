import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import "./globals.css";

export const metadata: Metadata = {
  title: "Link Shortener - Clerk Auth",
  description: "Next.js link shortener with Clerk authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased font-sans">
        <header className="border-b border-zinc-800">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Link Shortener</h1>
            <div className="flex gap-4 items-center">
              <Button variant="ghost">Sign In</Button>
              <Button>Sign Up</Button>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
