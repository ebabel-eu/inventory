import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory",
  description: "EverQuest Project 1999 Inventory web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <h1>EverQuest Inventory</h1>
        <p>Upload your output inventory files generated in EverQuest Project 1999 to make them searchable.</p>
        {children}
      </body>
    </html>
  );
}
