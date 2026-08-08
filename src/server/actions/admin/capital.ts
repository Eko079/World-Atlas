"use server";

import { revalidatePath } from "next/cache";
import { eq, asc } from "drizzle-orm";
import { db } from "@/db";
import { capitals as capitalsTable } from "@/db/schema";
import { requireAdmin } from "@/lib/supabase/auth";

export async function upsertCapital(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const countryId = formData.get("country_id") as string;
  const primaryDisplay = formData.get("primary_display") as string;
  const status = formData.get("status") as string;
  const currentAdministrativeCenter = formData.get("current_administrative_center") as string || null;
  const designatedCapital = formData.get("designated_capital") as string || null;
  const futureCapital = formData.get("future_capital") as string || null;
  const transitionStatus = formData.get("transition_status") as string || null;
  const transitionTargetYear = formData.get("transition_target_year") ? Number(formData.get("transition_target_year")) : null;
  const notes = formData.get("notes") as string || null;
  const latitude = formData.get("latitude") ? Number(formData.get("latitude")) : null;
  const longitude = formData.get("longitude") ? Number(formData.get("longitude")) : null;
  const population = formData.get("population") ? Number(formData.get("population")) : null;
  const province = formData.get("province") as string || null;
  const timezone = formData.get("timezone") as string || null;
  const description = formData.get("description") as string || null;
  const imagePath = formData.get("image_path") as string || null;
  const displayOrder = formData.get("display_order") ? Number(formData.get("display_order")) : 0;

  if (id) {
    await db
      .update(capitalsTable)
      .set({
        primaryDisplay, status, currentAdministrativeCenter, designatedCapital,
        futureCapital, transitionStatus, transitionTargetYear, notes,
        latitude, longitude, population, province, timezone, description,
        imagePath, displayOrder, updatedAt: new Date()
      })
      .where(eq(capitalsTable.id, id));
  } else {
    await db.insert(capitalsTable).values({
      countryId, primaryDisplay, status, currentAdministrativeCenter, designatedCapital,
      futureCapital, transitionStatus, transitionTargetYear, notes,
      latitude, longitude, population, province, timezone, description,
      imagePath, displayOrder
    });
  }

  revalidatePath(`/admin/countries/${formData.get("slug")}`);
  revalidatePath("/admin");
}

export async function deleteCapital(id: string) {
  await requireAdmin();
  await db.delete(capitalsTable).where(eq(capitalsTable.id, id));
  revalidatePath("/admin");
}
