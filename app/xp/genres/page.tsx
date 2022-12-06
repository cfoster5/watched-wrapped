import { AnimatedGenres } from "./AnimatedGenres";
import { getMovieHistories } from "../../api/getMovieHistories";

export default async function Page() {
  const movieHistory = await getMovieHistories();

  return (
    <div className="mx-8 flex flex-col">
      <AnimatedGenres movies={movieHistory} />
    </div>
  );
}
