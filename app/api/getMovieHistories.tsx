import { History } from "../../types";

export async function getMovieHistories(): Promise<History[]> {
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
