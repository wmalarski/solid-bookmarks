import type { Component } from "solid-js";
import type { TagModel } from "../server";
import { InsertTagDialog } from "./insert-tag-dialog";
import { TagsListItem } from "./tag-list-item";

type TagsListProps = {
  tags: TagModel[];
};

export const TagsList: Component<TagsListProps> = (props) => {
  return (
    <div>
      <InsertTagDialog />
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
