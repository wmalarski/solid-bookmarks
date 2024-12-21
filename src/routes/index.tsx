import type { RouteDefinition } from "@solidjs/router";

export const route = {
	preload() {
		// getUser();
	},
} satisfies RouteDefinition;

export default function Home() {
	// const user = createAsync(async () => getUser(), { deferStream: true });
	return (
		<main class="w-full space-y-2 p-4">
			{/* <h2 class="font-bold text-3xl">Hello {user()?.username}</h2> */}
			<h3 class="font-bold text-xl">Message board</h3>
			{/* <form action={logout} method="post">
				<button name="logout" type="submit">
					Logout
				</button>
			</form> */}
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
				<details open={true}>
					<summary>Values</summary>
					<pre id="valuesJson" />
				</details>
				<details open={true}>
					<summary>Tables</summary>
					<pre id="tablesJson" />
				</details>
			</div>
		</main>
	);
}
