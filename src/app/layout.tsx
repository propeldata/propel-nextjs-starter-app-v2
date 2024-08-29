import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from "@propeldata/ui-kit";
import '@radix-ui/themes/styles.css';

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
        <Theme
          accentColor="violet"
          grayColor="slate"
          panelBackground="solid"
          scaling="100%"
          radius="medium"
        >
          <ThemeProvider
            accentColor="violet"
            grayColor="slate"
            panelBackground="solid"
            scaling="100%"
            radius="small"
          >
            {children}
          </ThemeProvider>
        </Theme>
      </body>
    </html>
  );
}
