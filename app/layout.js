import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "@/app/_utils/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pet Care",
  description: "Pet Adoption Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={inter.className}>{children}</body> */}
      <AuthContextProvider>{children}</AuthContextProvider>
    </html>
  );
}
