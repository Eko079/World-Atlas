"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { foods as foodsTable } from "@/db/schema";
import { requireAdmin } from "@/lib/supabase/auth";

export async function upsertFood(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const countryId = formData.get("country_id") as string;
  const slug = formData.get("slug") as string;
  const name = formData.get("name") as string;
  const region = formData.get("region") as string;
  const description = formData.get("description") as string;
  const imagePath = formData.get("image_path") as string || null;
  const displayOrder = formData.get("display_order") ? Number(formData.get("display_order")) : 0;

  if (id) {
    await db
      .update(foodsTable)
      .set({ name, region, description, imagePath, displayOrder, updatedAt: new Date() })
      .where(eq(foodsTable.id, id));
  } else {
    await db.insert(foodsTable).values({ countryId, slug, name, region, description, imagePath, displayOrder });
  }

  revalidatePath(`/admin/countries/${formData.get("slug")}`);
  revalidatePath("/admin");
}

export async function deleteFood(id: string) {
  await requireAdmin();
  await db.delete(foodsTable).where(eq(foodsTable.id, id));
  revalidatePath("/admin");
}
