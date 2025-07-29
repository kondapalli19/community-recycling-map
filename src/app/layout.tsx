import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import LandingSection from "./components/LandingSection";
import Awareness from "./components/Awareness";
import Footer from "./components/Footer";

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
          src={`https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`}
          async
          defer
        ></script>
      </head>
      <body className="antialiased bg-gray-50">
        <Navbar />
        <LandingSection />
        <main className="min-h-screen">{children}</main>
        <Awareness />
        <Footer />
      </body>
    </html>
  );
}
