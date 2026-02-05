import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryListView from "../view/CategoryListView";
import TodoListView from "../view/TodoListView";
import { useEffect } from "react";
import { useTodoStore } from "../store/useTodoStore";

function App() {
	useEffect(() => {
		useTodoStore.getState().init();
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/" element={<CategoryListView />} />
				<Route path="/todo-list/:categoryId" element={<TodoListView />} />
			</Routes>
		</Router>
	);
}

export default App;
