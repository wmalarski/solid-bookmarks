import { useParams } from "@solidjs/router";
import { AddBookmarkForm } from "~/modules/bookmarks/components/add-bookmark-form";
import { PageLayout } from "~/modules/common/components/layout";

export default function SharePage() {
  const params = useParams();

  return (
    <PageLayout>
      <AddBookmarkForm
        initialData={{
          text: params.text,
          title: params.title,
          url: params.url,
        }}
      />
    </PageLayout>
  );
}
