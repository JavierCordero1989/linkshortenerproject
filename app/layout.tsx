import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="border-b">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">Link Shortener</h1>
              <div className="flex gap-4 items-center">
                <SignedOut>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost">Sign In</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <SignIn />
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Sign Up</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <SignUp />
                    </DialogContent>
                  </Dialog>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </nav>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
