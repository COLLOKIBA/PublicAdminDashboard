import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from "./dashboard/sidenav"; // Ensure this path is correct

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} layout`}>
        <div className="container">
          <aside className="sidebar">
            <SideNav />
          </aside>
          <main className="main-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
