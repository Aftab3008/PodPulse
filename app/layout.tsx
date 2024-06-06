import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "./_providers/ConvexClerkProvider";
import AudioProvider from "./_providers/AudioProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PodPulse",
  description:
    "PodPulse is a daily dose of engaging podcasts where every episode brings a new story to life.",
  icons: "/icons/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <AudioProvider>
          <body className={manrope.className}>{children}</body>
        </AudioProvider>
      </html>
    </ConvexClerkProvider>
  );
}
