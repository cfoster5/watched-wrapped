// import styles from './page.module.css'
import { getMovieHistories } from "@/api/getMovieHistories";
import { AnimatedRuntime } from "./AnimatedRuntime";

export default async function Page() {
  const movieHistory = await getMovieHistories();
  return (
    <div className="mx-8 flex flex-col">
      <AnimatedRuntime movies={movieHistory} />
    </div>
  );
}
