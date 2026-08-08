import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.next();
  }

  let response = NextResponse.next();

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookies) {
        for (const { name, value, options } of cookies) {
          response.cookies.set(name, value, options);
        }
      }
    }
  });

  try {
    await supabase.auth.getSession();
  } catch {
    // Ignore session errors in middleware
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"]
};
