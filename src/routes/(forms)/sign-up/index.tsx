import { SignUp } from "~/modules/auth/components/sign-up";
import { Head } from "~/modules/common/components/head";
import { useI18n } from "~/modules/common/contexts/i18n";

export default function SignUpPage() {
  const { t } = useI18n();

  return (
    <>
      <Head title={t("auth.signUp")} />
      <SignUp />
    </>
  );
}
