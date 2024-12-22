// @refresh reload
import { StartServer, createHandler } from "@solidjs/start/server";
import { pwaInfo } from "virtual:pwa-info";

export default createHandler(() => (
	<StartServer
		document={({ assets, children, scripts }) => (
			<html lang="en">
				<head>
					<meta charset="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<link rel="icon" href="/favicon.ico" />
					{pwaInfo ? (
						<link rel="manifest" href={pwaInfo.webManifest.href} />
					) : null}
					{assets}
				</head>
				<body>
					<div id="app">{children}</div>
					{scripts}
				</body>
			</html>
		)}
	/>
));
