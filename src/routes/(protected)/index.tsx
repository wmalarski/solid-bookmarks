import { createAsync, type RouteDefinition } from "@solidjs/router";
import { css } from "@tokenami/css";
import { RpcShow } from "~/modules/common/components/rpc-show";
import { selectTagsQuery } from "~/modules/tags/client";
import { TagsList } from "~/modules/tags/components/tags-list";

export const route = {
  load: async () => {
    await selectTagsQuery({ offset: 0 });
  },
} satisfies RouteDefinition;

export default function HomePage() {
  const tags = createAsync(() => selectTagsQuery({ offset: 0 }));

  return (
    <>
      <h1>A App</h1>
      <div style={css({ "--margin-top": 0, "--margin-bottom": 5 })}>
        <RpcShow result={tags()}>
          {(tags) => <TagsList tags={tags().data} />}
        </RpcShow>
      </div>
    </>
  );
}
