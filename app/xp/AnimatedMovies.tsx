"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const cardVariants = {
  initial: {
    opacity: 0,
    rotate: -10,
  },
  final: (custom) => {
    const delay = custom * 0.35;
    return {
      opacity: 1,
      x: 900 - 100 * custom,
      // x: `calc(100% - 100px * ${custom})`,
      // x: `calc(100%)`,
      rotate: 0,
      transition: {
        x: { delay, type: "spring", bounce: 0.4, duration: 0.8 },
        rotate: { delay, type: "spring", bounce: 0.4, duration: 0.8 },
        opacity: { delay, type: "spring", bounce: 0.4, duration: 0.8 },
      },
    };
  },
};

const AnimatedPoster = ({ movie, position }) => (
  <motion.img
    className="absolute"
    initial="initial"
    animate="final"
    custom={position}
    variants={cardVariants}
    src={`https://image.tmdb.org/t/p/w500${movie.tmdb.poster_path}`}
  />
);

export const AnimatedMovies = ({ movies }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 3500);
  }, []);

  const unique = [...new Set(movies.map((item) => item.movie.ids.trakt))];

  return (
    <AnimatePresence mode="wait">
      {!isVisible ? (
        <motion.p
          key="first"
          className="mb-2 flex-1 self-center text-center text-2xl text-[#F9F871]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          This year, you watched {unique.length} movies
        </motion.p>
      ) : (
        <>
          <motion.p
            key="second"
            className="mb-2 flex-1 self-center text-2xl text-[#F9F871]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Your movies
          </motion.p>
          {/* <div className="w-full flex-1 bg-yellow-400"></div> */}
          <div className="flex-1">
            <div className="relative flex">
              {[...movies].reverse().map((movie, i) => (
                <AnimatedPoster key={movie.id} movie={movie} position={i} />
              ))}
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
