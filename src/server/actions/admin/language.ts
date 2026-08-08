"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { languages as languagesTable } from "@/db/schema";
import { requireAdmin } from "@/lib/supabase/auth";

export async function upsertLanguage(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const countryId = formData.get("country_id") as string;
  const name = formData.get("name") as string;
  const type = formData.get("type") as "official" | "regional";
  const displayOrder = formData.get("display_order") ? Number(formData.get("display_order")) : 0;

  if (id) {
    await db
      .update(languagesTable)
      .set({ name, type, displayOrder, updatedAt: new Date() })
      .where(eq(languagesTable.id, id));
  } else {
    await db.insert(languagesTable).values({ countryId, name, type, displayOrder });
  }

  revalidatePath(`/admin/countries/${formData.get("slug")}`);
  revalidatePath("/admin");
}

export async function deleteLanguage(id: string) {
  await requireAdmin();
  await db.delete(languagesTable).where(eq(languagesTable.id, id));
  revalidatePath("/admin");
}
