"use server";

import { revalidatePath } from "next/cache";
import { eq, asc } from "drizzle-orm";
import { db } from "@/db";
import { leaders as leadersTable } from "@/db/schema";
import { requireAdmin } from "@/lib/supabase/auth";

export async function upsertLeader(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string | null;
  const countryId = formData.get("country_id") as string;
  const slug = formData.get("slug") as string;
  const name = formData.get("name") as string;
  const position = formData.get("position") as string;
  const roles = formData.get("roles") as string || null;
  const termStart = formData.get("term_start") as string;
  const termEnd = formData.get("term_end") as string || null;
  const isCurrent = formData.get("is_current") === "on";
  const imagePath = formData.get("image_path") as string || null;
  const displayOrder = formData.get("display_order") ? Number(formData.get("display_order")) : 0;

  const rolesArray = roles ? roles.split(",").map((r) => r.trim()) : null;

  if (id) {
    await db
      .update(leadersTable)
      .set({
        name, position, roles: rolesArray,
        termStart: new Date(termStart),
        termEnd: termEnd ? new Date(termEnd) : null,
        isCurrent, imagePath, displayOrder, updatedAt: new Date()
      })
      .where(eq(leadersTable.id, id));
  } else {
    await db.insert(leadersTable).values({
      countryId, slug, name, position, roles: rolesArray,
      termStart: new Date(termStart),
      termEnd: termEnd ? new Date(termEnd) : null,
      isCurrent, imagePath, displayOrder
    });
  }

  revalidatePath(`/admin/countries/${formData.get("slug")}`);
  revalidatePath("/admin");
}

export async function deleteLeader(id: string) {
  await requireAdmin();
  await db.delete(leadersTable).where(eq(leadersTable.id, id));
  revalidatePath("/admin");
}
