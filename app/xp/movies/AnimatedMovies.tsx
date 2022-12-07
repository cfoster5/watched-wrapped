"use client";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import useMeasure from "../runtime/useMeasure";

const posterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: ({ position }) => {
    const delay = 1 + position * 0.5;
    return {
      opacity: 1,
      transition: {
        // width: { delay, type: "spring", duration: 1, bounce: 0 },
        opacity: { delay, type: "spring", duration: 1 },
      },
    };
  },
};

export const AnimatedMovies = ({ movies }) => {
  const [ref, { x, y, width, height, top, right, bottom, left }] = useMeasure();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 3500);
  }, []);

  // https://stackoverflow.com/a/58429784/5648619
  const unique = [
    ...new Map(movies.map((movie) => [movie.movie.ids.trakt, movie])).values(),
  ];

  // https://stackoverflow.com/a/70213457/5648619
  const outputObj = movies.reduce((finalObj, movie) => {
    if (!finalObj[movie.movie.ids.trakt])
      finalObj[movie.movie.ids.trakt] = movie.movie.runtime;
    //<--- adding new user if do not exist in the object
    else finalObj[movie.movie.ids.trakt] += movie.movie.runtime; // <---- if already present, the add the sum
    return finalObj;
  }, {});

  const sortedRuntimes = Object.entries(outputObj)
    .map((obj) => ({
      traktId: obj[0], //<--- key of object as traktId
      runtime: obj[1], //<--- value of object as runtime
    }))
    .sort((a, b) => b.runtime - a.runtime);

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
          You watched {unique.length} movies, but these kept you in your seat
          the longest
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
            Your top runtimes
          </motion.p>
          {/* <div className="w-full flex-1 bg-yellow-400"></div> */}
          <div className="flex-1" ref={ref}>
            {/* <div ref={ref} className="flex h-1/5 flex-wrap justify-center">
              {[...movies].reverse().map((movie, i) => (
                <motion.img
                  key={i}
                  src={`https://image.tmdb.org/t/p/w500${movie.tmdb.poster_path}`}
                  alt={movie.movie.title}
                  width={width / 3}
                  height={(width / 3) * 1.78}
                  initial="hidden"
                  animate="visible"
                  variants={posterVariants}
                  custom={{ position: i }}
                />
              ))}
            </div> */}
            {sortedRuntimes.slice(0, 5).map((runtime, i) => (
              <div
                key={runtime.traktId}
                className="mb-4 flex items-center last:mb-0"
              >
                <motion.img
                  src={`https://image.tmdb.org/t/p/w500${
                    unique.find(
                      (uniqueMovie) =>
                        uniqueMovie.movie.ids.trakt == runtime.traktId
                    ).tmdb.backdrop_path
                  }`}
                  width={width / 2.5}
                  height={width / 2.5 / 1.78}
                  alt=""
                  className="mr-2 rounded-lg"
                />
                {
                  unique.find(
                    (uniqueMovie) =>
                      uniqueMovie.movie.ids.trakt == runtime.traktId
                  ).movie.title
                }
              </div>
            ))}
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
