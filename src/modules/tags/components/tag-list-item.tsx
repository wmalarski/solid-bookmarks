import type { Component } from "solid-js";
import type { TagModel } from "~/modules/supabase/models";
import { DeleteTagForm } from "./delete-tag-form";
import { UpdateTagForm } from "./update-tag-form";

type TagsListItemProps = {
  tag: TagModel;
};

export const TagsListItem: Component<TagsListItemProps> = (props) => {
  return (
    <div>
      <pre>{JSON.stringify(props.tag, null, 2)}</pre>
      <DeleteTagForm tag={props.tag} />
      <UpdateTagForm tag={props.tag} />
    </div>
  );
};
