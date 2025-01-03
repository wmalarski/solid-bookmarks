import { VisitedBookmarks } from "~/modules/bookmarks/components/visited-bookmarks";
import { useI18n } from "~/modules/common/contexts/i18n";

export default function HistoryPage() {
  const { t } = useI18n();

  return (
    <div class="flex w-full max-w-xl flex-col gap-4 px-2 py-4">
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-xl">{t("bookmarks.history")}</h2>
      </div>
      <VisitedBookmarks />
    </div>
  );
}
