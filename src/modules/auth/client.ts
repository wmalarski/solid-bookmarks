import { action, query } from "@solidjs/router";

import { USER_CACHE_KEY } from "./const";
import {
  getUserServerLoader,
  signInServerAction,
  signOutServerAction,
  signUpServerAction,
  updateUserServerAction,
} from "./server";

export const getUserQuery = query(getUserServerLoader, USER_CACHE_KEY);

export const signUpAction = action(signUpServerAction);

export const signInAction = action(signInServerAction);

export const signOutAction = action(signOutServerAction);

export const updateUserAction = action(updateUserServerAction);
