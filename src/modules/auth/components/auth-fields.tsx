import { css } from "@tokenami/css";
import { type Component, Show } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import type { RpcFailure } from "~/modules/common/server/helpers";
import { Alert, AlertIcon } from "~/ui/alert/alert";
import { FormControl } from "~/ui/form-control/form-control";
import { Label, LabelText } from "~/ui/label/label";
import {
  TextFieldErrorMessage,
  TextFieldInput,
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
      <FormControl>
        <Label for="email">
          <LabelText>{t("auth.email")}</LabelText>
        </Label>
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
      </FormControl>
      <FormControl>
        <Label for="password">
          <LabelText>{t("auth.password")}</LabelText>
        </Label>
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
      </FormControl>
    </div>
  );
};
