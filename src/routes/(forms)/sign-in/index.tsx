import { SignInForm } from "~/modules/auth/components/sign-in-form";
import { Head } from "~/modules/common/components/head";
import { useI18n } from "~/modules/common/contexts/i18n";

export default function SignInPage() {
  const { t } = useI18n();

  return (
    <>
      <Head title={t("auth.signIn")} />
      <SignInForm />
    </>
  );
}
