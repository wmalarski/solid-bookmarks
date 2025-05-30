import type { Component } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import type { RpcFailure } from "~/modules/common/server/helpers";
import { FieldError } from "~/ui/field-error/field-error";
import {
  Fieldset,
  FieldsetLabel,
  FieldsetLegend,
} from "~/ui/fieldset/fieldset";
import { FormError } from "~/ui/form-error/form-error";
import { Input } from "~/ui/input/input";
import { getInvalidStateProps } from "~/ui/utils/get-invalid-state-props";

type AuthFieldsProps = {
  pending?: boolean;
  result?: RpcFailure;
  title: string;
};

export const AuthFields: Component<AuthFieldsProps> = (props) => {
  const { t } = useI18n();

  return (
    <Fieldset>
      <FieldsetLegend>{props.title}</FieldsetLegend>

      <FormError message={props.result?.error} />

      <FieldsetLabel for="email">{t("auth.email")}</FieldsetLabel>
      <Input
        disabled={props.pending}
        id="email"
        inputMode="email"
        name="email"
        placeholder={t("auth.email")}
        required={true}
        type="email"
        width="full"
        {...getInvalidStateProps({
          errorMessageId: "email-error",
          isInvalid: !!props.result?.errors?.email,
        })}
      />
      <FieldError id="email-error" message={props.result?.errors?.email} />

      <FieldsetLabel for="password">{t("auth.password")}</FieldsetLabel>
      <Input
        disabled={props.pending}
        id="password"
        name="password"
        placeholder={t("auth.password")}
        type="password"
        width="full"
        {...getInvalidStateProps({
          errorMessageId: "password-error",
          isInvalid: !!props.result?.errors?.password,
        })}
      />
      <FieldError
        id="password-error"
        message={props.result?.errors?.password}
      />
    </Fieldset>
  );
};
