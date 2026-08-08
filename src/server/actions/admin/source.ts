import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { sources, leaders } from "@/db/schema";
import { requireAdmin } from "@/lib/supabase/auth";

export async function upsertSource(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const organization = formData.get("organization") as string;
  const publication = formData.get("publication") as string || null;
  const url = formData.get("url") as string || null;
  const accessedAt = formData.get("accessed_at") as string || null;

  if (id) {
    await db
      .update(sources)
      .set({
        organization,
        publication,
        url,
        accessedAt: accessedAt ? new Date(accessedAt) : null,
        updatedAt: new Date()
      })
      .where(eq(sources.id, id));
  } else {
    await db.insert(sources).values({
      organization,
      publication,
      url,
      accessedAt: accessedAt ? new Date(accessedAt) : null
    });
  }

  revalidatePath("/admin/sources");
}

export async function deleteSource(id: string) {
  await requireAdmin();

  const [ref] = await db
    .select({ id: leaders.id })
    .from(leaders)
    .where(eq(leaders.sourceId, id))
    .limit(1);

  if (ref) {
    throw new Error("SOURCE_IN_USE");
  }

  await db.delete(sources).where(eq(sources.id, id));
  revalidatePath("/admin/sources");
}
