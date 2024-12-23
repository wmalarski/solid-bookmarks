import { useParams } from "@solidjs/router";
import { AddBookmarkForm } from "~/modules/bookmarks/components/add-bookmark-form";

export default function SharePage() {
  const params = useParams();

  return (
    <AddBookmarkForm
      initialData={{
        text: params.text,
        title: params.title,
        url: params.url,
      }}
    />
  );
}
