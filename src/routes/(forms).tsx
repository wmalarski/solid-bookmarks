import type { RouteSectionProps } from "@solidjs/router";
import {
  FormLayout,
  PageFooter,
  PageTitle,
} from "~/modules/common/components/layout";

export default function FormsLayout(props: RouteSectionProps) {
  return (
    <FormLayout>
      <PageTitle />
      {props.children}
      <PageFooter />
    </FormLayout>
  );
}
