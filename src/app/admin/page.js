import { connection } from "next/server";
import { getNewsItems, getSiteContent } from "../../lib/site-content";
import { requireAdmin } from "../../lib/admin";
import AdminDashboard from "./dashboard";

export const instant = false;
export const metadata = { title: "Dashboard Admin | SMA Negeri 9 Semarang" };

export default async function AdminPage() {
  await connection();
  await requireAdmin();
  const [content, news] = await Promise.all([
    getSiteContent(),
    getNewsItems({ includeUnpublished: true }),
  ]);

  return <AdminDashboard initialContent={content} initialNews={news} />;
}
