import { useParams } from "@solidjs/router";
import { InsertBookmarkForm } from "~/modules/bookmarks/components/insert-bookmark-form";

export default function SharePage() {
  const params = useParams();

  return (
    <InsertBookmarkForm
      initialData={{
        text: params.text,
        title: params.title,
        url: params.url,
        tags: [],
      }}
    />
  );
}
