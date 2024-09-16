import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@propeldata/ui-kit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Propel Next.js starter app",
  description: "Propel is a Next.js starter app that includes a sample dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          accentColor="violet"
          grayColor="slate"
          panelBackground="solid"
          scaling="100%"
          radius="none"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
