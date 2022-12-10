"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
// import styles from './page.module.css'

import { signIn, signOut } from "next-auth/react";

import Link from "next/link";

export default function Page() {
  return (
    <div className="mx-8 flex flex-col items-center gap-2">
      <Link
        href="/xp/genres"
        // className="aspect-video w-full bg-gradient-to-tr from-[#845EC2] via-[#D65DB1] to-[#FF6F91]"
        className="w-full rounded-lg bg-[#F9F871] p-2 text-center text-xl text-black"
      >
        Experience
      </Link>
    </div>
  );
}
