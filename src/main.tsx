import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
// @ts-ignore: SCSS module declarations are not present in this project
import "./index.scss";

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error('Root element with id "root" was not found');
}
ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
