"use client";
import useMeasure from "@/hooks/useMeasure";
import { History } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const marqueeVariants = {
  animate: {
    x: [0, -1035],
    transition: {
      x: {
        repeat: Infinity,
        // repeatType: "loop",
        duration: 5,
        ease: "linear",
      },
    },
  },
};

const marquee = {
  initial: { top: 0 },
  animate: {
    top: -2000,
    transition: {
      top: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 120,
        ease: "linear",
      },
    },
  },
};

export const AnimatedRuntime = ({ movies }: { movies: History[] }) => {
  const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 3500);
    // setTimeout(() => router.push("/"), 10000);
  }, []);

  const colors = [
    "bg-[#845EC2]",
    "bg-[#D65DB1]",
    "bg-[#FF6F91]",
    "bg-[#FF9671]",
    "bg-[#FFC75F]",
  ];

  const runtime = movies.reduce((sum, movie) => sum + movie.movie.runtime, 0);

  return (
    <AnimatePresence mode="wait">
      {!isVisible ? (
        <motion.p
          key="first"
          className="flex-1 self-center text-center text-2xl text-[#F9F871]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          All that watching added up
        </motion.p>
      ) : (
        <>
          <motion.p
            key="second"
            className="mb-2 flex-1 self-center text-center text-2xl text-[#F9F871]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Your total watchtime was {runtime} minutes
          </motion.p>
          <div className="flex-1">
            {/* <motion.div className="aspect-square w-full bg-slate-500">
              <div className="h-1/5">{runtime}</div>
            </motion.div> */}
            <motion.div
              ref={ref}
              className="aspect-square w-full overflow-hidden rounded-lg text-center leading-none"
              style={{ fontSize: `${height / 5}px` }}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: {
                  scale: { type: "spring", duration: 1, bounce: 0.3 },
                },
              }}
              exit={{ opacity: 0 }}
            >
              {[...Array(30)].map((e, i) => (
                <motion.div
                  key={i}
                  className={`relative h-1/5 ${colors[i % 5]}`}
                  initial="initial"
                  animate="animate"
                  variants={marquee}
                >
                  {runtime}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
