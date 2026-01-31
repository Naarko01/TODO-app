import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import CategoryListView from "../view/CategoryListView";
import TodoListView from "../view/TodoListView";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<CategoryListView />} />
				<Route path="/todo-list/{catID}" />
			</Routes>
		</Router>
	);
}

export default App;
