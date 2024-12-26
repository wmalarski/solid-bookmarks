import type { Component } from "solid-js";
import type { TagModel } from "../server";
import { TagsListItem } from "./tag-list-item";

type TagsListProps = {
  tags: TagModel[];
};

export const TagsList: Component<TagsListProps> = (props) => {
  return (
    <ul class="flex flex-col gap-2">
      {props.tags.map((tag) => (
        <li>
          <TagsListItem tag={tag} />
        </li>
      ))}
    </ul>
  );
};
