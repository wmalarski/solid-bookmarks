import { VisitedBookmarks } from "~/modules/bookmarks/components/visited-bookmarks";
import { useI18n } from "~/modules/common/contexts/i18n";

export default function HistoryPage() {
  const { t } = useI18n();

  return (
    <div class="w-full max-w-xl flex flex-col gap-4 py-4 px-2">
      <div class="flex justify-between gap-2 items-center">
        <h2 class="text-xl">{t("bookmarks.history")}</h2>
      </div>
      <VisitedBookmarks />
    </div>
  );
}
