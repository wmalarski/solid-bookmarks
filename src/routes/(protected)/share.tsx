import { createAsync, useSearchParams } from "@solidjs/router";
import { For, Suspense } from "solid-js";
import { getOgPropsQuery } from "~/modules/bookmarks/client";
import { InsertBookmarkForm } from "~/modules/bookmarks/components/insert-bookmark-form";

export default function SharePage() {
  const [searchParams] = useSearchParams();

  const ogProps = createAsync(() =>
    getOgPropsQuery(searchParams.text?.toString()),
  );

  return (
    <>
      <InsertBookmarkForm
        initialData={{
          text: searchParams.text?.toString(),
          title: searchParams.title?.toString(),
          url: searchParams.url?.toString(),
          tags: [],
        }}
      />
      <Suspense>
        <For each={ogProps()?.props}>
          {(prop) => <pre>{JSON.stringify(prop, null, 2)}</pre>}
        </For>
      </Suspense>
    </>
  );
}
