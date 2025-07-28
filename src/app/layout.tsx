import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Awareness from "./components/Awareness";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoTrack | DWCC Locator",
  description: "Get details about your local Dry Waste Collection Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 <html lang="en">
      <head>
        <script
          src={`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY=places`}
          async
          defer
        ></script>
      </head>
      <body className="antialiased bg-gray-50">
        <Navbar />
        <Home />
        <main className="min-h-screen">{children}</main>
        <Awareness />
        <Footer />
      </body>
    </html>
  );
}
