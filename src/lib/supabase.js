"use client";
import { createBrowserClient } from "@supabase/ssr";

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePUBkey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

const supabase = createBrowserClient(supabaseURL, supabasePUBkey);

export default supabase;