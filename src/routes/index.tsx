import { createAsync, type RouteDefinition } from "@solidjs/router";
import { getUser, logout } from "~/api";

export const route = {
  preload() {
    getUser();
  },
} satisfies RouteDefinition;

export default function Home() {
  const user = createAsync(async () => getUser(), { deferStream: true });
  return (
    <main class="w-full p-4 space-y-2">
      <h2 class="font-bold text-3xl">Hello {user()?.username}</h2>
      <h3 class="font-bold text-xl">Message board</h3>
      <form action={logout} method="post">
        <button name="logout" type="submit">
          Logout
        </button>
      </form>
      <h1>A TinyBase App</h1>
      <div id="app">
        <div id="buttons">
          <button type="button" id="countButton">
            Increment number
          </button>
          <button type="button" id="randomButton">
            Random number
          </button>
          <button type="button" id="addPetButton">
            Add a pet
          </button>
        </div>
        <details open>
          <summary>Values</summary>
          <pre id="valuesJson" />
        </details>
        <details open>
          <summary>Tables</summary>
          <pre id="tablesJson" />
        </details>
      </div>
    </main>
  );
}
