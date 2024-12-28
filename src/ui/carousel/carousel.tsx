import createEmblaCarousel, {
  type CreateEmblaCarouselType,
} from "embla-carousel-solid";
import {
  type Accessor,
  type Component,
  type ComponentProps,
  createContext,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  useContext,
} from "solid-js";
import { useI18n } from "~/modules/common/contexts/i18n";
import { Button } from "../button/button";
import { ArrowLeftIcon } from "../icons/arrow-left-icon";
import { ArrowRightIcon } from "../icons/arrow-right-icon";
import { twCx } from "../utils/tw-cva";

type CarouselApi = ReturnType<CreateEmblaCarouselType[1]>;

type UseCarouselParameters = Parameters<typeof createEmblaCarousel>;
type CarouselOptions = ReturnType<NonNullable<UseCarouselParameters[0]>>;
type CarouselPlugin = ReturnType<NonNullable<UseCarouselParameters[1]>>;

type CreateCarouselContextArgs = {
  options?: CarouselOptions;
  plugins?: CarouselPlugin;
};

const createCarouselContext = (args: CreateCarouselContextArgs) => {
  const [carouselRef, api] = createEmblaCarousel(
    () => args.options ?? {},
    () => args.plugins ?? [],
  );

  const [canScrollPrev, setCanScrollPrev] = createSignal(false);
  const [canScrollNext, setCanScrollNext] = createSignal(false);

  const onSelect = (api: CarouselApi) => {
    if (!api) {
      return;
    }

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  };

  createEffect(() => {
    const apiValue = api();

    onSelect(apiValue);

    apiValue?.on("select", onSelect);
    onCleanup(() => apiValue?.off("select", onSelect));
  });

  const scrollPrevious = () => {
    api()?.scrollPrev();
  };

  const scrollNext = () => {
    api()?.scrollNext();
  };

  return {
    carouselRef,
    canScrollNext,
    canScrollPrev,
    scrollPrevious,
    scrollNext,
    api,
  };
};

type CarouselContextValue = Accessor<ReturnType<typeof createCarouselContext>>;

const CarouselContext = createContext<CarouselContextValue>(() => {
  throw new Error("useCarousel must be used within a <Carousel />");
});

const useCarousel = () => {
  return useContext(CarouselContext);
};

type CarouselRootProps = ComponentProps<"div"> & CreateCarouselContextArgs;

export const Carousel: Component<CarouselRootProps> = (props) => {
  const context = createMemo(() =>
    createCarouselContext({
      options: props.options,
      plugins: props.plugins,
    }),
  );

  const onKeyDown: ComponentProps<"div">["onKeyDown"] = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      context().scrollPrevious();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      context().scrollNext();
    }
  };

  return (
    <CarouselContext.Provider value={context}>
      <div
        onKeyDown={onKeyDown}
        class={twCx("relative", props.class)}
        aria-roledescription="carousel"
        {...props}
      >
        {props.children}
      </div>
    </CarouselContext.Provider>
  );
};

type CarouselContentProps = ComponentProps<"div">;

export const CarouselContent: Component<CarouselContentProps> = (props) => {
  const carousel = useCarousel();

  return (
    <div ref={carousel().carouselRef} class="overflow-hidden">
      <div class={twCx("flex -ml-4", props.class)} {...props} />
    </div>
  );
};

type CarouselItemProps = ComponentProps<"div">;

export const CarouselItem: Component<CarouselItemProps> = (props) => {
  return (
    <div
      {...props}
      role="group"
      aria-roledescription="slide"
      class={twCx("min-w-0 shrink-0 grow-0 basis-full pl-4", props.class)}
    />
  );
};

type CarouselPreviousProps = Omit<ComponentProps<typeof Button>, "children">;

export const CarouselPrevious: Component<CarouselPreviousProps> = (props) => {
  const { t } = useI18n();

  const carousel = useCarousel();

  return (
    <Button
      type="button"
      shape="circle"
      size="sm"
      {...props}
      class={twCx("absolute -left-12 top-1/2 -translate-y-1/2", props.class)}
      disabled={!carousel().canScrollPrev()}
      onClick={carousel().scrollPrevious}
    >
      <ArrowLeftIcon class="size-4" />
      <span class="sr-only">{t("common.previousSlide")}</span>
    </Button>
  );
};

type CarouselNextProps = Omit<ComponentProps<typeof Button>, "children">;

export const CarouselNext: Component<CarouselNextProps> = (props) => {
  const { t } = useI18n();

  const carousel = useCarousel();

  return (
    <Button
      type="button"
      shape="circle"
      size="sm"
      {...props}
      class={twCx("absolute -right-12 top-1/2 -translate-y-1/2", props.class)}
      disabled={!carousel().canScrollNext()}
      onClick={carousel().scrollNext}
    >
      <ArrowRightIcon class="size-4" />
      <span class="sr-only">{t("common.nextSlide")}</span>
    </Button>
  );
};
