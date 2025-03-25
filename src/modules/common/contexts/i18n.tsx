import { flatten, resolveTemplate, translator } from "@solid-primitives/i18n";
import {
  type Accessor,
  type Component,
  createContext,
  createMemo,
  createSignal,
  type ParentProps,
  useContext,
} from "solid-js";

const enDict = {
  auth: {
    email: "Email",
    password: "Password",
    signIn: "Sign In",
    signOut: "Sign Out",
    signUp: "Sign Up",
    signUpSuccess: {
      description:
        "Congratulations! your account has been successfully created",
      title: "Sign Up Success",
    },
    success: "Success",
  },
  bookmarks: {
    complete: {
      complete: "Complete",
      done: "Done",
      note: "Note",
      rate: "Rate",
    },
    filters: {
      all: "All",
      completed: "Completed",
      filters: "Filters",
      query: "Query",
      random: "Random",
      tags: "Tags",
      uncompleted: "Uncompleted",
    },
    form: {
      check: "OG Check",
      delete: "Delete",
      preview: "Preview",
      text: "Text",
      title: "Title",
      url: "URL",
    },
    history: "History",
    item: {
      createdAt: "Created:",
      details: "Details",
      done: "Done:",
      doneAt: "Completed:",
      google: "Google",
      note: "Note:",
      preview: "{{preview}} preview",
      rate: "Rate:",
      spotify: "Spotify",
      text: "Text:",
      title: "Title:",
      url: "Url:",
      youtube: "Youtube",
    },
    loadMore: "Load More",
    share: "Share",
    title: "Bookmarks",
  },
  common: {
    closeDialog: "Close",
    delete: "Delete",
    nextSlide: "Next slide",
    previousSlide: "Previous slide",
    save: "Save",
    update: "Update",
  },
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
  pwa: {
    readyOffline: "App ready to work offline",
    reload: "Reload",
    update: "New content available, click on reload button to update.",
  },
  seo: {
    description:
      "Solid Bookmarks app is a non-trivial local first demo application built using Solid Start.",
    title: "Solid Bookmarks",
  },
  tags: {
    form: {
      add: "Add tag",
      name: "Name",
    },
    heading: "Tags",
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
