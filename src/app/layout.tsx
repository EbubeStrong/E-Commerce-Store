import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Layouts/Header/header";
import Footer from "@/components/Layouts/Footer/footer";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata: Metadata = {
  title: {
    template: "%s - Shopcart online store",
    default: "Shopcart online store",
  },
  description: "Shopcart online store, Your one-stop destination for all your shopping needs. Discover a wide range of products, from electronics to fashion, and enjoy a seamless shopping experience with fast shipping and excellent customer service.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-poppins antialiased flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
