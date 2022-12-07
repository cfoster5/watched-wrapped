import Link from "next/link";
import AuthContext from "./AuthContext";
import "./globals.css";
import { Inter } from "@next/font/google";
import Image from "next/image";
import trakt from "../public/trakt-wide-white.svg";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // See https://stackoverflow.com/a/24979148/5648619 for method to have the center div fill remaining height
    <html
      lang="en"
      className={`m-0 h-full bg-slate-900 text-slate-50 ${inter.variable}`}
    >
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="m-0 h-full">
        <div className="flex h-full flex-col justify-between">
          <header className="m-8 mt-4 flex-initial flex-shrink-0">
            <h1 className="text-xl">Watch Wrapped</h1>
            {/* <Link href="/">Experience</Link> */}
          </header>
          {/* Use flex: 0 0 auto to fill remaining height */}
          {/* Shifting up slightly from center */}
          <div className="relative top-[-5%] flex-initial flex-shrink-0">
            <AuthContext>{children}</AuthContext>
          </div>
          {/* Use flex: 1 0 auto to size to content */}
          <footer className="m-8 mb-4 flex-initial text-white opacity-25">
            {/* <div className="flex items-center">
              Powered by
              <Image
                src={trakt}
                alt="Trakt logo"
                width={288 / 4}
                height={98 / 4}
                className="ml-2"
              />
            </div> */}
            Attributions
          </footer>
        </div>
      </body>
    </html>
  );
}
