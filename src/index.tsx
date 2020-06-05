
// First and foremost, CSS!
import "./scss/main.scss";

// And now everything that isn't CSS
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

serviceWorker.unregister();
