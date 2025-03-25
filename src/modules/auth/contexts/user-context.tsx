import type { User } from "@supabase/supabase-js";
import {
  type Accessor,
  type Component,
  createContext,
  createMemo,
  type ParentProps,
  useContext,
} from "solid-js";

const UserContext = createContext<Accessor<null | User | undefined>>(() => {
  throw new Error("SessionContext not defined");
});

type UserProviderProps = ParentProps<{
  user?: null | User;
}>;

export const UserProvider: Component<UserProviderProps> = (props) => {
  const value = createMemo(() => props.user);

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};

export const useAuthorizedUserContext = () => {
  const value = useUserContext();

  return createMemo(() => {
    const unpack = value();

    if (!unpack) {
      throw new Error("User is not defined");
    }

    return unpack;
  });
};
