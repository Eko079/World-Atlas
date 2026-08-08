"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { countryStatistics as statsTable } from "@/db/schema";
import { requireAdmin } from "@/lib/supabase/auth";

export async function upsertStatistic(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const countryId = formData.get("country_id") as string;
  const category = formData.get("category") as string;
  const key = formData.get("key") as string;
  const numericValue = formData.get("numeric_value") ? Number(formData.get("numeric_value")) : null;
  const textValue = formData.get("text_value") as string || null;
  const unit = formData.get("unit") as string || null;
  const referenceYear = formData.get("reference_year") ? Number(formData.get("reference_year")) : null;
  const displayOrder = formData.get("display_order") ? Number(formData.get("display_order")) : 0;

  if (id) {
    await db
      .update(statsTable)
      .set({
        category, key, numericValue, textValue, unit, referenceYear, displayOrder, updatedAt: new Date()
      })
      .where(eq(statsTable.id, id));
  } else {
    await db.insert(statsTable).values({
      countryId, category, key, numericValue, textValue, unit, referenceYear, displayOrder
    });
  }

  revalidatePath(`/admin/countries/${formData.get("slug")}`);
  revalidatePath("/admin");
}

export async function deleteStatistic(id: string) {
  await requireAdmin();
  await db.delete(statsTable).where(eq(statsTable.id, id));
  revalidatePath("/admin");
}
