import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { History } from "@/types";
import { unstable_getServerSession } from "next-auth/next";

export async function getMovieHistories(): Promise<History[]> {
  const session = await unstable_getServerSession(authOptions);
  const res = await fetch(
    `https://api.trakt.tv/users/${session?.user?.name}/history/movies?start_at=2022-01-01T00:00:00.000Z&extended=full&limit=100`,
    { headers: { "trakt-api-key": `${process.env.TRAKT_ID}` } }
  );
  const history = await res.json();
  return history;
}
