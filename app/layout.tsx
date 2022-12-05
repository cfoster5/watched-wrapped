import Link from "next/link";
import "./globals.css";
import { Inter } from "@next/font/google";

const inter = Inter({
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`m-8 bg-slate-900 text-slate-50 ${inter.variable}`}
    >
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-xl">Watch Wrapped</h1>
          <Link href="/">Experience</Link>
          {/* <div className="grid grid-cols-3 justify-center">
            <h1 className="col-start-2 text-4xl">Watch Wrapped</h1>
            <Link href="/xp" className="my-auto ml-auto">
              Experience
            </Link>
          </div> */}
        </div>
      </body>
    </html>
  );
}
