import { createMemo, For, type Component, type ComponentProps } from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "~/ui/button/button";
import { Checkbox } from "~/ui/checkbox/checkbox";
import {
  closeDialog,
  Dialog,
  DialogActions,
  DialogBox,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "~/ui/dialog/dialog";
import { FormControl } from "~/ui/form-control/form-control";
import { FilterIcon } from "~/ui/icons/filter-icon";
import { Label, LabelText } from "~/ui/label/label";
import { Radio } from "~/ui/radio/radio";
import {
  useSetFiltersSearchParams,
  type FiltersSearchParams,
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
          <FormControl direction="horizontal">
            <Radio
              id={option}
              value={option}
              checked={props.done === option}
              name="done"
            />
            <Label for={option}>
              <LabelText class="capitalize">{option}</LabelText>
            </Label>
          </FormControl>
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
    <FormControl direction="horizontal">
      <Checkbox id="random" checked={props.random === "on"} name="random" />
      <Label for="random">
        <LabelText>{t("bookmarks.filters.random")}</LabelText>
      </Label>
    </FormControl>
  );
};
