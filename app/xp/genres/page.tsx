import { getMovieHistories } from "@/api/getMovieHistories";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { AnimatedGenres } from "./AnimatedGenres";

export default async function Page() {
  const session = await unstable_getServerSession(authOptions);
  const movieHistory = await getMovieHistories();

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  } else {
    return (
      <div className="mx-8 flex flex-col">
        <AnimatedGenres movies={movieHistory} />
      </div>
    );
  }
}
