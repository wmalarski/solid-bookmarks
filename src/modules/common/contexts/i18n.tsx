import { flatten, resolveTemplate, translator } from "@solid-primitives/i18n";
import {
  type Accessor,
  type Component,
  type ParentProps,
  createContext,
  createMemo,
  createSignal,
  useContext,
} from "solid-js";

const enDict = {
  error: {
    description: "Something went wrong: {{message}}",
    home: "Home",
    reload: "Reload",
    title: "Error",
  },
  info: {
    madeBy: "Made by wmalarski",
    title: "Solid Bookmarks",
  },
  notFound: {
    title: "Not Found",
  },
  seo: {
    description:
      "Solid Bookmarks app is a non-trivial local first demo application built using Solid Start.",
    title: "Solid Bookmarks",
  },
  bookmarks: {
    loadMore: "Load More",
    form: {
      title: "Title",
      text: "Text",
      url: "URL",
      delete: "Delete",
    },
  },
  tags: {
    heading: "Tags",
    form: {
      add: "Add tag",
      update: "Update",
      name: "Name",
      delete: "Delete",
    },
  },
  auth: {
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    signOut: "Sign Out",
    signUp: "Sign Up",
    success: "Success",
    signUpSuccess: {
      description:
        "Congratulations! your account has been successfully created",
      title: "Sign Up Success",
    },
  },
  common: {
    closeDialog: "Close",
    save: "Save",
    delete: "Delete",
  },
};

export type Locale = "en";

const dictionaries = { en: enDict };

type Accessed<T> = T extends Accessor<infer A> ? A : never;

export const createI18nValue = () => {
  const [locale, setLocale] = createSignal<Locale>("en");

  const translate = createMemo(() => {
    const dict = flatten(dictionaries[locale()]);
    return translator(() => dict, resolveTemplate);
  });

  const t: Accessed<typeof translate> = (path, ...args) => {
    return translate()(path, ...args);
  };

  return { locale, setLocale, t };
};

type I18nContextValue = ReturnType<typeof createI18nValue>;

export const I18nContext = createContext<I18nContextValue>({
  locale: () => "en" as const,
  setLocale: () => void 0,
  t: () => {
    throw new Error("Not implemented");
  },
});

export const I18nContextProvider: Component<ParentProps> = (props) => {
  const value = createI18nValue();

  return (
    <I18nContext.Provider value={value}>{props.children}</I18nContext.Provider>
  );
};

export const useI18n = () => {
  return useContext(I18nContext);
};
