import type { Component } from "solid-js";
import type { TagModel } from "../server";
import { DeleteTagForm } from "./delete-tag-form";
import { UpdateTagDialog } from "./update-tag-dialog";

type TagsListItemProps = {
  tag: TagModel;
};

export const TagsListItem: Component<TagsListItemProps> = (props) => {
  return (
    <div>
      <pre>{JSON.stringify(props.tag, null, 2)}</pre>
      <UpdateTagDialog tag={props.tag} />
      <DeleteTagForm tag={props.tag} />
    </div>
  );
};
