import { createMiddleware } from "@solidjs/start/middleware";
import { serverEnvMiddleware } from "./modules/common/server/env";
import { supabaseMiddleware } from "./modules/supabase/middleware";

export default createMiddleware({
  onRequest: [serverEnvMiddleware, supabaseMiddleware],
});
