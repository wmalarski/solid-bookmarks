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
    title: "Bookmarks",
    loadMore: "Load More",
    share: "Share",
    complete: {
      complete: "Complete",
      done: "Done",
      rate: "Rate",
      note: "Note",
    },
    form: {
      title: "Title",
      text: "Text",
      url: "URL",
      delete: "Delete",
    },
    item: {
      title: "Title:",
      text: "Text:",
      url: "Url:",
      createdAt: "Created:",
      done: "Done:",
      doneAt: "Completed:",
      rate: "Rate:",
      note: "Note:",
      preview: "{{preview}} preview",
    },
    filters: {
      random: "Random",
      tags: "Tags",
      completed: "Completed",
      uncompleted: "Uncompleted",
      all: "All",
      filters: "Filters",
    },
  },
  tags: {
    heading: "Tags",
    form: {
      add: "Add tag",
      name: "Name",
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
  pwa: {
    reload: "Reload",
    readyOffline: "App ready to work offline",
    update: "New content available, click on reload button to update.",
  },
  common: {
    closeDialog: "Close",
    save: "Save",
    update: "Update",
    delete: "Delete",
    nextSlide: "Next slide",
    previousSlide: "Previous slide",
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
