import { pwaInfo } from "virtual:pwa-info";
import { Link, Meta, Title } from "@solidjs/meta";
import { type Component, createMemo } from "solid-js";
import { getRequestEvent } from "solid-js/web";
import { useI18n } from "../contexts/i18n";

type HeadProps = {
  description?: string;
  title?: string;
};

export const Head: Component<HeadProps> = (props) => {
  const { t } = useI18n();

  const title = createMemo(() => {
    return props.title ? `${props.title} - ${t("seo.title")}` : t("seo.title");
  });

  const description = createMemo(() => {
    return props.description ?? t("seo.description");
  });

  const url = createMemo(() => {
    const href = getRequestEvent()?.request.url || window.location.href;
    return new URL(href);
  });

  const ogUrl = createMemo(() => {
    return `${url().origin}${url().pathname}`;
  });

  return (
    <>
      <Title>{title()}</Title>
      <Meta content={description()} name="description" />
      <Meta content={title()} property="og:title" />
      <Meta content={description()} property="og:description" />
      <Meta content="website" property="og:type" />
      <Meta content={ogUrl()} property="og:url" />
      <Meta content={`${url().origin}/og-image.png`} property="og:image" />
      <Meta content="461" property="og:image:width" />
      <Meta content="460" property="og:image:height" />
      {pwaInfo?.webManifest?.href ? (
        <Link href={pwaInfo.webManifest.href} rel="manifest" />
      ) : null}
    </>
  );
};
