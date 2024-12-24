import type { Component } from "solid-js";
import type { TagModel } from "~/modules/supabase/models";
import { InsertTagForm } from "./insert-tag-form";
import { TagsListItem } from "./tag-list-item";

type TagsListProps = {
  tags: TagModel[];
};

export const TagsList: Component<TagsListProps> = (props) => {
  return (
    <div>
      <InsertTagForm />
      <ul>
        {props.tags.map((tag) => (
          <li>
            <TagsListItem tag={tag} />
          </li>
        ))}
      </ul>
    </div>
  );
};
