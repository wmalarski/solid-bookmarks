import { type Action, useAction } from "@solidjs/router";
import type { ComponentProps } from "solid-js";
import type { RpcResult } from "../server/helpers";

type UseActionOnSubmitArgs = {
  onSuccess: () => void;
  action: Action<[form: FormData], RpcResult, [form: FormData]>;
};

export const useActionOnSubmit = (args: UseActionOnSubmitArgs) => {
  const action = useAction(args.action);

  const onSubmit: ComponentProps<"form">["onSubmit"] = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await action(formData);

    if (result?.success) {
      args.onSuccess();
    }
  };

  return onSubmit;
};
