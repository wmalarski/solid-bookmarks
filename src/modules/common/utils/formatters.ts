import { createMemo } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";

export const createDateFormatter = () => {
  const { locale } = useI18n();

  const formatter = createMemo(
    () =>
      new Intl.DateTimeFormat(locale(), {
        dateStyle: "medium",
        hour12: false,
        timeStyle: "medium",
      }),
  );
  return (date: string) => formatter().format(new Date(date));
};
