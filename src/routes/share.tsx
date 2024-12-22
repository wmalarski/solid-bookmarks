import { useParams } from "@solidjs/router";
import { css } from "@tokenami/css";
import { AddBookmarkForm } from "~/modules/bookmarks/components/add-bookmark-form";

export default function SharePage() {
  const params = useParams();

  return (
    <main
      style={css({ "--width": "var(--size_full)", "--padding": 4 })}
      class="w-full space-y-2 p-4"
    >
      <AddBookmarkForm
        initialData={{
          text: params.text,
          title: params.title,
          url: params.url,
        }}
      />
    </main>
  );
}
