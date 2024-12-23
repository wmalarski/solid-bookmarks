import { SignUpSuccess } from "~/modules/auth/components/sign-up-success";
import { Head } from "~/modules/common/components/head";
import { useI18n } from "~/modules/common/contexts/i18n";

export default function SignUpSuccessPage() {
  const { t } = useI18n();

  return (
    <>
      <Head title={t("auth.signUpSuccess.title")} />
      <SignUpSuccess />
    </>
  );
}
