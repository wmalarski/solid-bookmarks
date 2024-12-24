import { SignUpForm } from "~/modules/auth/components/sign-up-form";
import { Head } from "~/modules/common/components/head";
import { useI18n } from "~/modules/common/contexts/i18n";

export default function SignUpPage() {
  const { t } = useI18n();

  return (
    <>
      <Head title={t("auth.signUp")} />
      <SignUpForm />
    </>
  );
}
