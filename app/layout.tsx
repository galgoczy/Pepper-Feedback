import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pepper House Feedback",
  description: "Pepper House vendégelégedettségi űrlap"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu">
      <body className="min-h-screen bg-gray-100">{children}</body>
    </html>
  );
}
