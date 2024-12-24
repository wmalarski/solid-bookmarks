import { action, query } from "@solidjs/router";

import { USER_QUERY_KEY } from "./const";
import {
  getUserServerLoader,
  signInServerAction,
  signOutServerAction,
  signUpServerAction,
} from "./server";

export const getUserQuery = query(getUserServerLoader, USER_QUERY_KEY);

export const signUpAction = action(signUpServerAction);

export const signInAction = action(signInServerAction);

export const signOutAction = action(signOutServerAction);
