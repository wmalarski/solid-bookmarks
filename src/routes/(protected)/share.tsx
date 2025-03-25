import { useSearchParams } from "@solidjs/router";
import { InsertBookmarkForm } from "~/modules/bookmarks/components/insert-bookmark-form";

export default function SharePage() {
  const [searchParams] = useSearchParams();

  return (
    <InsertBookmarkForm
      initialData={{
        tags: [],
        text: searchParams.text?.toString(),
        title: searchParams.title?.toString(),
        url: searchParams.url?.toString(),
      }}
    />
  );
}
