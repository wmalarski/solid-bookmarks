import { action, cache } from "@solidjs/router";
import { getUser as gU, logout as l, loginOrRegister as lOr } from "./server";

export const getUser = cache(gU, "user");
export const loginOrRegister = action(lOr, "loginOrRegister");
export const logout = action(l, "logout");
