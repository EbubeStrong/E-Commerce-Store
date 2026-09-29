import { Toaster } from "react-hot-toast";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
        <body className="font-poppins antialiased flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}

export default RootLayout;