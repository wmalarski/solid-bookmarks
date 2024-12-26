import type { Component } from "solid-js";
import { createDateFormatter } from "~/modules/common/utils/formatters";
import { Card, CardBody } from "~/ui/card/card";
import type { TagModel } from "../server";
import { DeleteTagForm } from "./delete-tag-form";
import { UpdateTagDialog } from "./update-tag-dialog";

type TagsListItemProps = {
  tag: TagModel;
};

export const TagsListItem: Component<TagsListItemProps> = (props) => {
  const formatDate = createDateFormatter();

  return (
    <Card variant="bordered" size="compact">
      <CardBody class="flex gap-2 flex-row items-center">
        <div class="flex gap-2 flex-col pr-6 flex-grow">
          <span class="text-lg">{props.tag.name}</span>
          <span>{formatDate(props.tag.created_at)}</span>
        </div>
        <UpdateTagDialog tag={props.tag} />
        <DeleteTagForm tag={props.tag} />
      </CardBody>
    </Card>
  );
};
