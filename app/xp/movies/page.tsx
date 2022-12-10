import { getMovieHistories } from "@/api/getMovieHistories";
import { History } from "@/types";
import { AnimatedMovies } from "./AnimatedMovies";

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
    <div className="mx-8 flex flex-col">
      <AnimatedMovies movies={movies} />
    </div>
  );
}
