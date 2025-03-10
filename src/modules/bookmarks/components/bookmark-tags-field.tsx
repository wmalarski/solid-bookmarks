import { createAsync } from "@solidjs/router";
import { type Component, For, Suspense, createMemo } from "solid-js";
import { RpcShow } from "~/modules/common/components/rpc-show";
import { selectTagsQuery } from "~/modules/tags/client";
import { Checkbox } from "~/ui/checkbox/checkbox";
import { FieldsetLabel } from "~/ui/fieldset/fieldset";

export const BOOKMARK_TAGS_FIELD_PREFIX = "tags.";

type BookmarkTagsFieldProps = {
  initialTags?: number[];
  disabled?: boolean;
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
                  <FieldsetLabel>
                    <Checkbox
                      type="checkbox"
                      value={tag.id}
                      checked={initialTagIds().has(tag.id)}
                      name="tags[]"
                      disabled={props.disabled}
                    />
                    {tag.name}
                  </FieldsetLabel>
                </li>
              )}
            </For>
          </ul>
        )}
      </RpcShow>
    </Suspense>
  );
};
