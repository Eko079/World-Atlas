"use server";

import { revalidatePath } from "next/cache";
import { eq, asc } from "drizzle-orm";
import { db } from "@/db";
import { countries, countries as countriesTable } from "@/db/schema";
import { requireAdmin } from "@/lib/supabase/auth";

export async function updateCountryIdentity(formData: FormData) {
  await requireAdmin();
  const slug = formData.get("slug") as string;
  const officialName = formData.get("official_name") as string;
  const localName = formData.get("local_name") as string;
  const motto = formData.get("motto") as string || null;
  const anthem = formData.get("anthem") as string || null;
  const independence = formData.get("independence") as string || null;
  const demonym = formData.get("demonym") as string || null;
  const continent = formData.get("continent") as string;
  const region = formData.get("region") as string;
  const subregion = formData.get("subregion") as string || null;
  const summary = formData.get("summary") as string || null;

  await db
    .update(countriesTable)
    .set({
      officialName,
      localName,
      motto,
      anthem,
      independence,
      demonym,
      continent,
      region,
      subregion,
      summary,
      updatedAt: new Date()
    })
    .where(eq(countriesTable.slug, slug));

  revalidatePath(`/country/${slug}`);
  revalidatePath("/admin");
}
