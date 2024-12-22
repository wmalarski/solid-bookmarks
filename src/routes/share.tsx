import { css } from "@tokenami/css";
import { Button } from "~/ui/button/button";

export default function SharePage() {
  return (
    <main class="w-full space-y-2 p-4">
      <h1>A App</h1>
      <div id="app">
        <div style={css({ "--margin-top": 0, "--margin-bottom": 5 })}>
          <Button
            onClick={() => {
              const data: ShareData = {
                text: "AA",
                title: "BB",
              };

              if (navigator.canShare(data)) {
                navigator.share(data);
              }
            }}
            type="button"
            id="countButton"
          >
            Increment number
          </Button>
        </div>
      </div>
    </main>
  );
}
