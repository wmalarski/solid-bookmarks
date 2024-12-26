import { createMemo, type Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Card, CardBody } from "~/ui/card/card";
import type { TagModel } from "../server";
import { DeleteTagForm } from "./delete-tag-form";
import { UpdateTagDialog } from "./update-tag-dialog";

type TagsListItemProps = {
  tag: TagModel;
};

export const TagsListItem: Component<TagsListItemProps> = (props) => {
  const { locale } = useI18n();

  const formatter = createMemo(() => new Intl.DateTimeFormat(locale()));

  return (
    <Card variant="bordered" size="compact" bg="base-100">
      <CardBody class="flex gap-2 flex-row items-center">
        <div class="flex gap-2 flex-col pr-6 flex-grow">
          <span class="text-lg">{props.tag.name}</span>
          <span>{formatter().format(new Date(props.tag.created_at))}</span>
        </div>
        <UpdateTagDialog tag={props.tag} />
        <DeleteTagForm tag={props.tag} />
      </CardBody>
    </Card>
  );
};
