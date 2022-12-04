import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
// import styles from './page.module.css'

// Import your Client Component
import Link from "next/link";
import { History } from "../../types";
import { getMovieHistories } from "../../api/getMovieHistories";
import { AnimatedRuntime } from "./AnimatedRuntime";

export default async function Page() {
  const movieHistory = await getMovieHistories();
  return (
    <div className="mt-8 flex flex-col">
      <AnimatedRuntime movies={movieHistory} />
    </div>
  );
}
