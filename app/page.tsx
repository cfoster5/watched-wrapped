import Image from "next/image";
// import styles from './page.module.css'

// Import your Client Component
import Link from "next/link";
import { History } from "../types";
import { AnimatedComponent } from "./AnimatedComponent";

async function getMovieHistories(): Promise<History[]> {
  const res = await fetch(
    "https://api.trakt.tv/users/cfoster5/history/movies?start_at=2022-01-01T00:00:00.000Z&extended=full",
    {
      headers: {
        "trakt-api-key": `${process.env.TRAKT_ID}`,
      },
    }
  );
  const history = await res.json();
  return history;
}

async function getMovies(movieHistories: History[]) {
  const movies = await Promise.all(
    movieHistories.map(async (movieHistory) => await getMovie(movieHistory))
  );
  return movies;
}

async function getMovie(movieHistory: History) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieHistory.movie.ids.tmdb}?language=en-US&api_key=${process.env.TMDB_KEY}&append_to_response=credits`
  );
  return { ...movieHistory, tmdb: await res.json() };
}

export default async function Page() {
  const movieHistory = await getMovieHistories();
  const movies = await getMovies(movieHistory);

  return (
    <div>
      <main className="text-slate-50">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl">Watch Wrapped</h1>
          <Link href="/api/auth/signin">Sign In</Link>
        </div>
        {/* <div className="mt-8 flex flex-wrap justify-center gap-4">
          {movies.map((movie) => (
            <Image
              className="rounded-lg border-2 border-slate-800"
              key={movie.tmdb.poster_path}
              src={`https://image.tmdb.org/t/p/w500${movie.tmdb.poster_path}`}
              width={342}
              height={342 / 1.78}
              alt=""
            />
            // <p>{JSON.stringify(movie.tmdb.credits.cast)}</p>
          ))}
        </div> */}
        {/* <p className="mt-8 flex justify-center">{JSON.stringify(movies)}</p> */}
        <div className="mt-8 flex flex-col">
          <AnimatedComponent movies={movies} />
        </div>
      </main>
    </div>
  );
}
