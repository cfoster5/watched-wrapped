import { AnimatedComponent } from "./AnimatedComponent";
import { getMovieHistories } from "./api/getMovieHistories";

export default async function Page() {
  const movieHistory = await getMovieHistories();

  return (
    <div className="mt-8 flex flex-col">
      <AnimatedComponent movies={movieHistory} />
    </div>
  );
}
