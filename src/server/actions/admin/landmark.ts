"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { landmarks as landmarksTable } from "@/db/schema";
import { requireAdmin } from "@/lib/supabase/auth";

export async function upsertLandmark(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const countryId = formData.get("country_id") as string;
  const slug = formData.get("slug") as string;
  const name = formData.get("name") as string;
  const location = formData.get("location") as string;
  const coordinates = formData.get("coordinates") as string || null;
  const description = formData.get("description") as string;
  const imagePath = formData.get("image_path") as string || null;
  const displayOrder = formData.get("display_order") ? Number(formData.get("display_order")) : 0;

  if (id) {
    await db
      .update(landmarksTable)
      .set({ name, location, coordinates, description, imagePath, displayOrder, updatedAt: new Date() })
      .where(eq(landmarksTable.id, id));
  } else {
    await db.insert(landmarksTable).values({ countryId, slug, name, location, coordinates, description, imagePath, displayOrder });
  }

  revalidatePath(`/admin/countries/${formData.get("slug")}`);
  revalidatePath("/admin");
}

export async function deleteLandmark(id: string) {
  await requireAdmin();
  await db.delete(landmarksTable).where(eq(landmarksTable.id, id));
  revalidatePath("/admin");
}
