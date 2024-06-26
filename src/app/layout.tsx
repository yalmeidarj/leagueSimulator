import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { ReactNode } from "react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "League Simulator",
  description: "Simulate your favorite league",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  
  // ${inter.className}
  return (
    <html lang=" " className=''>
      <body className={`flex flex-col justify-around `}>
        <NavBar />
        
        <div className='container '>
        {children}
        </div>      
        <div className='h-full items-end flex justify-end w-full '>

          <Footer />
        </div>
      </body>      
    </html>
  );
}

