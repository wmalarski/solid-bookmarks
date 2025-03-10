import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import type { RpcFailure } from "~/modules/common/server/helpers";
import { FieldError } from "~/ui/field-error/field-error";
import { FieldsetLabel } from "~/ui/fieldset/fieldset";
import { FormError } from "~/ui/form-error/form-error";
import { Input } from "~/ui/input/input";
import { getInvalidStateProps } from "~/ui/utils/get-invalid-state-props";
import type { TagModel } from "../server";

export type TagFieldsData = Pick<TagModel, "name">;

type TagFieldsProps = {
  initialData?: TagFieldsData;
  pending?: boolean;
  result?: RpcFailure;
};

export const TagFields: Component<TagFieldsProps> = (props) => {
  const { t } = useI18n();

  return (
    <div class="flex flex-col gap-4">
      <FormError message={props.result?.error} />

      <FieldsetLabel for="name">{t("tags.form.name")}</FieldsetLabel>
      <Input
        id="name"
        name="name"
        placeholder={t("tags.form.name")}
        value={props.initialData?.name}
        disabled={props.pending}
        width="full"
        {...getInvalidStateProps({
          errorMessageId: "name-error",
          isInvalid: !!props.result?.errors?.name,
        })}
      />
      <FieldError id="name-error" message={props.result?.errors?.name} />
    </div>
  );
};
