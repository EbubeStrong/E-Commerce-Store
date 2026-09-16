import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layouts/Header/header";
import Footer from "@/components/Layouts/footer";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Shopcart online store",
    default: "Shopcart online store",
  },
  description: "Shopcart online store, Your one-stop destination for all your shopping needs. Discover a wide range of products, from electronics to fashion, and enjoy a seamless shopping experience with fast shipping and excellent customer service.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={"h-full antialiased " + geistSans.variable + " " + geistMono.variable + " font-mono " + jetbrainsMono.variable}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
        <Footer />
        </body>
    </html>
  );
}
