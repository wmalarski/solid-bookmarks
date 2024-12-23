import { css } from "@tokenami/css";
import { Button } from "~/ui/button/button";

export default function HomePage() {
  return (
    <>
      <h1>A App</h1>
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
    </>
  );
}