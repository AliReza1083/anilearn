import type { Metadata } from "next";
import React from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/navbar";
import Theme from "@/components/theme";
import Layout from "@/components/layout";

const inter = Inter({ subsets: ["latin"], variable: "--body-font" });
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--display-font",
});

export const metadata: Metadata = {
  title: "AniLearn",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} bg-background font-body text-foreground`}
      >
        <Layout>
          <Navbar />
          <Theme />
          {children}
        </Layout>
      </body>
    </html>
  );
}
