import { createAsync, type RouteDefinition } from "@solidjs/router";
import { RpcShow } from "~/modules/common/components/rpc-show";
import { selectTagsQuery } from "~/modules/tags/client";
import { TagsList } from "~/modules/tags/components/tags-list";

export const route = {
  load: async () => {
    await selectTagsQuery({});
  },
} satisfies RouteDefinition;

export default function TagsPage() {
  const tags = createAsync(() => selectTagsQuery({}));

  return (
    <div>
      <h2>A App</h2>
      <RpcShow result={tags()}>
        {(tags) => <TagsList tags={tags().data} />}
      </RpcShow>
    </div>
  );
}
