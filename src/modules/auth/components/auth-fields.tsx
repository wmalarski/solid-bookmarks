import { css } from "@tokenami/css";
import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import type { RpcFailure } from "~/modules/common/server/helpers";
import { FieldError } from "~/ui/field-error/field-error";
import { FormControl } from "~/ui/form-control/form-control";
import { FormError } from "~/ui/form-error/form-error";
import { Label, LabelText } from "~/ui/label/label";
import { TextFieldInput } from "~/ui/text-field/text-field";
import { getInvalidStateProps } from "~/ui/utils/get-invalid-state-props";

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
      <FormError message={props.result?.error} />

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
          {...getInvalidStateProps({
            errorMessageId: "email-error",
            isInvalid: !!props.result?.errors?.email,
          })}
        />
        <FieldError id="email-error" message={props.result?.errors?.email} />
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
          {...getInvalidStateProps({
            errorMessageId: "password-error",
            isInvalid: !!props.result?.errors?.password,
          })}
        />
        <FieldError
          id="password-error"
          message={props.result?.errors?.password}
        />
      </FormControl>
    </div>
  );
};
