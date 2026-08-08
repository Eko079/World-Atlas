"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { cultureItems as cultureTable } from "@/db/schema";
import { requireAdmin } from "@/lib/supabase/auth";

export async function upsertCulture(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const countryId = formData.get("country_id") as string;
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const imagePath = formData.get("image_path") as string || null;
  const displayOrder = formData.get("display_order") ? Number(formData.get("display_order")) : 0;

  if (id) {
    await db
      .update(cultureTable)
      .set({ title, category, description, imagePath, displayOrder, updatedAt: new Date() })
      .where(eq(cultureTable.id, id));
  } else {
    await db.insert(cultureTable).values({ countryId, slug, title, category, description, imagePath, displayOrder });
  }

  revalidatePath(`/admin/countries/${formData.get("slug")}`);
  revalidatePath("/admin");
}

export async function deleteCulture(id: string) {
  await requireAdmin();
  await db.delete(cultureTable).where(eq(cultureTable.id, id));
  revalidatePath("/admin");
}
