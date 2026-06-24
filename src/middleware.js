import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req) {
    const path = req.nextUrl.pathname;

    const publicRoutes = [
        "/",
        "/login",
        "/signup",
    ];

    const protectedRoutes = [
        "/dashboard",
        "/library",
        "/settings",
        "/collections",
        "/rediscovery",
    ];

    const response = NextResponse.next();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        req.cookies.set(name, value);
                        response.cookies.set(name, value, options);
                    });
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser();

    // User is trying to access a protected page without logging in
    if (protectedRoutes.includes(path) && !user) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Logged-in user tries to visit login/signup again
    if ((path === "/login" || path === "/signup") && user) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Allow the request to continue
    return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/library/:path*",
    "/settings/:path*",
    "/collections/:path*",
    "/rediscovery/:path*",
    "/login",
    "/signup",
  ],
};