import { css } from "@tokenami/css";
import { type Component, Show } from "solid-js";
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

type AuthFieldsProps = {
  pending?: boolean;
  result?: RpcFailure;
};

export const AuthFields: Component<AuthFieldsProps> = (props) => {
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
        <TextFieldLabel for="email">
          <TextFieldLabelText>{t("auth.email")}</TextFieldLabelText>
        </TextFieldLabel>
        <TextFieldInput
          disabled={props.pending}
          id="email"
          inputMode="email"
          name="email"
          placeholder={t("auth.email")}
          type="email"
          variant="bordered"
        />
        <Show when={props.result?.errors?.email}>
          <TextFieldErrorMessage>
            {props.result?.errors?.email}
          </TextFieldErrorMessage>
        </Show>
      </TextFieldRoot>
      <TextFieldRoot>
        <TextFieldLabel for="password">
          <TextFieldLabelText>{t("auth.password")}</TextFieldLabelText>
        </TextFieldLabel>
        <TextFieldInput
          disabled={props.pending}
          id="password"
          name="password"
          placeholder={t("auth.password")}
          type="password"
          variant="bordered"
        />
        <Show when={props.result?.errors?.password}>
          <TextFieldErrorMessage>
            {props.result?.errors?.password}
          </TextFieldErrorMessage>
        </Show>
      </TextFieldRoot>
    </div>
  );
};
