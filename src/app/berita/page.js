import { connection } from "next/server";
import { getNewsItems, getSiteContent } from "../../lib/site-content";
import NewsList from "./news-list";

export const instant = false;

export default async function BeritaPage() {
  await connection();
  const [newsItems, { news: pageContent }] = await Promise.all([
    getNewsItems(),
    getSiteContent(),
  ]);

  return <NewsList newsItems={newsItems} pageContent={pageContent} />;
}
