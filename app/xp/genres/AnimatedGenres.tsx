"use client";
import { History } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const draw = {
  hidden: { width: 0, opacity: 0 },
  visible: ({ position, width }) => {
    const delay = 1 + position * 0.5;
    return {
      width: `${width * 100}%`,
      opacity: 1,
      transition: {
        width: { delay, type: "spring", duration: 1, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

const Bar = ({ color, position, width, text }) => (
  <motion.div
    className={`flex h-1/5 items-center whitespace-nowrap rounded-r-lg ${color}`}
    variants={draw}
    initial="hidden"
    animate="visible"
    custom={{ position, width }}
  >
    <p className="ml-2 capitalize text-white">{text}</p>
  </motion.div>
);

const composeArray = (map) =>
  [...map].map(([name, value]) => ({ name, value }));

export const AnimatedGenres = ({ movies }: { movies: History[] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 3500);
    setTimeout(() => router.push("/xp/runtime"), 10000);
  }, []);

  const genres = movies.map((movie) => movie.movie.genres).flat();

  const uniqueGenres = [...new Set(genres)];

  // https://stackoverflow.com/a/57028486/5648619
  const genreMap = genres.reduce(
    (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
    new Map()
  );

  const genreDict = composeArray(genreMap);
  const sortedGenreDict = genreDict.sort((a, b) => b.value - a.value);

  const colors = [
    "bg-[#845EC2]",
    "bg-[#D65DB1]",
    "bg-[#FF6F91]",
    "bg-[#FF9671]",
    "bg-[#FFC75F]",
  ];

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
          In 2022, you explored {uniqueGenres.length} different genres
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
            Your top genres
          </motion.p>
          <div className="aspect-square flex-1">
            {sortedGenreDict.slice(0, 5).map((genre, i) => (
              <Bar
                key={i}
                color={colors[i]}
                position={i}
                width={genre.value / sortedGenreDict[0].value}
                text={genre.name}
              />
            ))}
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
