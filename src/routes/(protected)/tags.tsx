import { createAsync, type RouteDefinition } from "@solidjs/router";
import { RpcShow } from "~/modules/common/components/rpc-show";
import { useI18n } from "~/modules/common/contexts/i18n";
import { InsertTagDialog } from "~/modules/tags/components/insert-tag-dialog";
import { TagsList } from "~/modules/tags/components/tags-list";
import { selectTagsServerQuery } from "~/modules/tags/server";

export const route = {
  load: async () => {
    await selectTagsServerQuery({});
  },
} satisfies RouteDefinition;

export default function TagsPage() {
  const { t } = useI18n();

  const tags = createAsync(() => selectTagsServerQuery({}));

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
