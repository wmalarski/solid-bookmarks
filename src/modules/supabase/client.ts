import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export type SupabaseTypedClient = SupabaseClient<Database>;
