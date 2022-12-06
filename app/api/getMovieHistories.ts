import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { History } from "../../types";
import { decode } from "next-auth/jwt";

export async function getMovieHistories(): Promise<History[]> {
  const params = await unstable_getServerSession(authOptions);
  console.log("session", params);
  const res = await fetch(
    "https://api.trakt.tv/users/cfoster5/history/movies?start_at=2022-01-01T00:00:00.000Z&extended=full&limit=100",
    {
      headers: {
        "trakt-api-key": `${process.env.TRAKT_ID}`,
      },
    }
  );
  const history = await res.json();
  return history;
}
