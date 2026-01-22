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
import { shadcn } from "@clerk/themes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoadingModal } from "@/components/LoadingModal";
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
    <ClerkProvider
      appearance={{
        theme: shadcn,
      }}
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    >
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="border-b border-zinc-800">
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
              <h1 className="text-xl font-bold">Gaver App</h1>
              <div className="flex gap-4 items-center">
                <SignedOut>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost">Sign In</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle className="sr-only">Sign In</DialogTitle>
                      <SignIn routing="virtual" />
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Sign Up</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogTitle className="sr-only">Sign Up</DialogTitle>
                      <SignUp routing="virtual" />
                    </DialogContent>
                  </Dialog>
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </nav>
          </header>
          <LoadingModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
