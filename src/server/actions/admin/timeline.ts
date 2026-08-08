"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { timelineEvents as timelineTable } from "@/db/schema";
import { requireAdmin } from "@/lib/supabase/auth";

export async function upsertTimeline(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const countryId = formData.get("country_id") as string;
  const yearLabel = formData.get("year_label") as string;
  const sortYear = formData.get("sort_year") ? Number(formData.get("sort_year")) : null;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const displayOrder = formData.get("display_order") ? Number(formData.get("display_order")) : 0;

  if (id) {
    await db
      .update(timelineTable)
      .set({ yearLabel, sortYear, title, description, displayOrder, updatedAt: new Date() })
      .where(eq(timelineTable.id, id));
  } else {
    await db.insert(timelineTable).values({ countryId, yearLabel, sortYear, title, description, displayOrder });
  }

  revalidatePath(`/admin/countries/${formData.get("slug")}`);
  revalidatePath("/admin");
}

export async function deleteTimeline(id: string) {
  await requireAdmin();
  await db.delete(timelineTable).where(eq(timelineTable.id, id));
  revalidatePath("/admin");
}
