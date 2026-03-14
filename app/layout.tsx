import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nearu Platform",
  description: "NearuVibe UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bg0 text-t1 antialiased">{children}</body>
    </html>
  );
}
