import { css } from "@tokenami/css";
import { Show, type Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import type { RpcFailure } from "~/modules/common/server/helpers";
import { Alert, AlertIcon } from "~/ui/alert/alert";
import {
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
  TextFieldLabelText,
  TextFieldRoot,
} from "~/ui/text-field/text-field";
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
    <div
      style={css({
        "--display": "flex",
        "--flex-direction": "column",
        "--gap": 4,
      })}
    >
      <Show when={props.result?.error}>
        <Alert variant="error">
          <AlertIcon variant="error" />
          {props.result?.error}
        </Alert>
      </Show>

      <TextFieldRoot>
        <TextFieldLabel for="title">
          <TextFieldLabelText>{t("tags.form.name")}</TextFieldLabelText>
        </TextFieldLabel>
        <TextFieldInput
          id="name"
          name="name"
          placeholder={t("tags.form.name")}
          value={props.initialData?.name}
          disabled={props.pending}
          variant="bordered"
        />
        <Show when={props.result?.errors?.email}>
          <TextFieldErrorMessage>
            {props.result?.errors?.email}
          </TextFieldErrorMessage>
        </Show>
      </TextFieldRoot>
    </div>
  );
};
