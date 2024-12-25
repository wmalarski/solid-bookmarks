import { createAsync, type RouteDefinition } from "@solidjs/router";
import { RpcShow } from "~/modules/common/components/rpc-show";
import { useI18n } from "~/modules/common/contexts/i18n";
import { selectTagsQuery } from "~/modules/tags/client";
import { TagsList } from "~/modules/tags/components/tags-list";

export const route = {
  load: async () => {
    await selectTagsQuery({});
  },
} satisfies RouteDefinition;

export default function TagsPage() {
  const { t } = useI18n();

  const tags = createAsync(() => selectTagsQuery({}));

  return (
    <div>
      <h2>{t("tags.heading")}</h2>
      <RpcShow result={tags()}>
        {(tags) => <TagsList tags={tags().data} />}
      </RpcShow>
    </div>
  );
}
