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

type CarouselApi = NonNullable<ReturnType<CreateEmblaCarouselType[1]>>;

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
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  };

  createEffect(() => {
    const apiValue = api();

    if (!apiValue) {
      return;
    }

    onSelect(apiValue);
    apiValue.on("select", onSelect);
    onCleanup(() => apiValue.off("select", onSelect));
  });

  const scrollPrevious = () => {
    api()?.scrollPrev();
  };

  const scrollNext = () => {
    api()?.scrollNext();
  };

  return {
    api,
    canScrollNext,
    canScrollPrev,
    carouselRef,
    scrollNext,
    scrollPrevious,
  };
};

type CarouselContextValue = Accessor<ReturnType<typeof createCarouselContext>>;

const CarouselContext = createContext<CarouselContextValue>(() => {
  throw new Error("useCarousel must be used within a <Carousel />");
});

export const useCarousel = () => {
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
        aria-roledescription="carousel"
        class={twCx("relative", props.class)}
        onKeyDown={onKeyDown}
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
    <div class="overflow-hidden" ref={carousel().carouselRef}>
      <div class={twCx("-ml-4 flex", props.class)} {...props} />
    </div>
  );
};

type CarouselItemProps = ComponentProps<"div">;

export const CarouselItem: Component<CarouselItemProps> = (props) => {
  return (
    <div
      {...props}
      aria-roledescription="slide"
      class={twCx("min-w-0 shrink-0 grow-0 basis-full pl-4", props.class)}
      role="group"
    />
  );
};

type CarouselPreviousProps = Omit<ComponentProps<typeof Button>, "children">;

export const CarouselPrevious: Component<CarouselPreviousProps> = (props) => {
  const { t } = useI18n();

  const carousel = useCarousel();

  return (
    <Button
      shape="circle"
      size="sm"
      type="button"
      {...props}
      class={twCx("-left-12 -translate-y-1/2 absolute top-1/2", props.class)}
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
      shape="circle"
      size="sm"
      type="button"
      {...props}
      class={twCx("-right-12 -translate-y-1/2 absolute top-1/2", props.class)}
      disabled={!carousel().canScrollNext()}
      onClick={carousel().scrollNext}
    >
      <ArrowRightIcon class="size-4" />
      <span class="sr-only">{t("common.nextSlide")}</span>
    </Button>
  );
};
