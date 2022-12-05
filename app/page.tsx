import Image from "next/image";
import { AnimatedComponent } from "./AnimatedComponent";
import { getMovieHistories } from "./api/getMovieHistories";

export default async function Page() {
  const movieHistory = await getMovieHistories();

  return (
    // {/* <div className="mt-8 flex flex-wrap justify-center gap-4">
    //     {movies.map((movie) => (
    //       <Image
    //         className="rounded-lg border-2 border-slate-800"
    //         key={movie.tmdb.poster_path}
    //         src={`https://image.tmdb.org/t/p/w500${movie.tmdb.poster_path}`}
    //         width={342}
    //         height={342 / 1.78}
    //         alt=""
    //       />
    //       // <p>{JSON.stringify(movie.tmdb.credits.cast)}</p>
    //     ))}
    //   </div> */}

    // {/* <p className="mt-8 flex justify-center">{JSON.stringify(movies)}</p> */}

    <div className="mt-8 flex flex-col">
      <AnimatedComponent movies={movieHistory} />
    </div>
  );
}
