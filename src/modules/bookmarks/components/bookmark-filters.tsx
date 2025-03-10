import { type Component, type ComponentProps, For, createMemo } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import { Checkbox } from "~/ui/checkbox/checkbox";
import {
  Dialog,
  DialogActions,
  DialogBox,
  DialogClose,
  DialogTitle,
  DialogTrigger,
  closeDialog,
} from "~/ui/dialog/dialog";
import { FieldsetLabel } from "~/ui/fieldset/fieldset";
import { FilterIcon } from "~/ui/icons/filter-icon";
import { Input } from "~/ui/input/input";
import { Radio } from "~/ui/radio/radio";
import {
  type FiltersSearchParams,
  useSetFiltersSearchParams,
} from "../utils/use-filters-search-params";
import { BookmarkTagsField } from "./bookmark-tags-field";

type BookmarkFiltersProps = {
  params: FiltersSearchParams;
};

export const BookmarkFilters: Component<BookmarkFiltersProps> = (props) => {
  const { t } = useI18n();

  const dialogId = createMemo(() => "filters-dialog");
  const formId = createMemo(() => "filters-form");

  const setFiltersSearchParams = useSetFiltersSearchParams();

  const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    setFiltersSearchParams(formData);

    closeDialog(dialogId());
  };

  return (
    <>
      <DialogTrigger for={dialogId()} size="sm" color="secondary">
        <FilterIcon class="size-4" />
        {t("bookmarks.filters.filters")}
      </DialogTrigger>
      <Dialog id={dialogId()}>
        <DialogBox>
          <DialogTitle>{t("bookmarks.filters.filters")}</DialogTitle>
          <form id={formId()} onSubmit={onSubmit} class="flex flex-col gap-4">
            <RandomFilter random={props.params.random} />
            <DoneFilter done={props.params.done} />
            <QueryFilter query={props.params.query} />
            <BookmarkTagsField initialTags={props.params["tags[]"]} />
          </form>
          <DialogActions>
            <DialogClose />
            <Button form={formId()} color="primary" type="submit">
              {t("common.save")}
            </Button>
          </DialogActions>
        </DialogBox>
      </Dialog>
    </>
  );
};

type DoneFilterProps = {
  done: FiltersSearchParams["done"];
};

const DoneFilter: Component<DoneFilterProps> = (props) => {
  const options: FiltersSearchParams["done"][] = [
    "all",
    "completed",
    "uncompleted",
  ];

  return (
    <div class="flex flex-col gap-4">
      <For each={options}>
        {(option) => (
          <FieldsetLabel class="capitalize">
            <Radio value={option} checked={props.done === option} name="done" />
            {option}
          </FieldsetLabel>
        )}
      </For>
    </div>
  );
};

type RandomFilterProps = {
  random: FiltersSearchParams["random"];
};

const RandomFilter: Component<RandomFilterProps> = (props) => {
  const { t } = useI18n();

  return (
    <FieldsetLabel>
      <Checkbox checked={props.random === "on"} name="random" />
      {t("bookmarks.filters.random")}
    </FieldsetLabel>
  );
};

type QueryFilterProps = {
  query: FiltersSearchParams["query"];
};

const QueryFilter: Component<QueryFilterProps> = (props) => {
  const { t } = useI18n();

  return (
    <>
      <FieldsetLabel for="query">{t("bookmarks.filters.query")}</FieldsetLabel>
      <Input
        id="query"
        name="query"
        placeholder={t("bookmarks.filters.query")}
        value={props.query ?? ""}
        width="full"
      />
    </>
  );
};
