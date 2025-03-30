import { createAsync } from "@solidjs/router";
import { RpcShow } from "~/modules/common/components/rpc-show";
import { useI18n } from "~/modules/common/contexts/i18n";
import { selectTagsQuery } from "~/modules/tags/client";
import { InsertTagDialog } from "~/modules/tags/components/insert-tag-dialog";
import { TagsList } from "~/modules/tags/components/tags-list";

// export const route = {
//   load: async () => {
//     await selectTagsQuery({});
//   },
// } satisfies RouteDefinition;

export default function TagsPage() {
  const { t } = useI18n();

  const tags = createAsync(() => selectTagsQuery({}));

  return (
    <div class="flex w-full max-w-xl flex-col gap-4 px-2 py-4">
      <div class="flex items-center justify-between gap-2">
        <h2 class="text-xl">{t("tags.heading")}</h2>
        <InsertTagDialog />
      </div>
      <RpcShow result={tags()}>
        {(tags) => <TagsList tags={tags().data} />}
      </RpcShow>
    </div>
  );
}
