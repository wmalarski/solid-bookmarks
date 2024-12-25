import { createAsync } from "@solidjs/router";
import { createMemo, For, Suspense, type Component } from "solid-js";
import { RpcShow } from "~/modules/common/components/rpc-show";
import { selectTagsQuery } from "~/modules/tags/client";

export const BOOKMARK_TAGS_FIELD_PREFIX = "tags.";

type BookmarkTagsFieldProps = {
  initialTags?: number[];
};

export const BookmarkTagsField: Component<BookmarkTagsFieldProps> = (props) => {
  const tags = createAsync(() => selectTagsQuery({}));

  const initialTagIds = createMemo(() => {
    return new Set(props.initialTags);
  });

  return (
    <Suspense>
      <RpcShow result={tags()}>
        {(tags) => (
          <ul>
            <For each={tags().data}>
              {(tag) => (
                <li>
                  <label>
                    <input
                      type="checkbox"
                      value={tag.id}
                      checked={initialTagIds().has(tag.id)}
                      name={`${BOOKMARK_TAGS_FIELD_PREFIX}${tag.id}`}
                    />
                    {tag.name}
                  </label>
                </li>
              )}
            </For>
          </ul>
        )}
      </RpcShow>
    </Suspense>
  );
};
