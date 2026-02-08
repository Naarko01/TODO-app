import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryListView from "../view/CategoryListView.js";
import TodoListView from "../view/TodoListView.js";
import { useEffect } from "react";
import { useTodoStore } from "../store/useTodoStore.js";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher.js";

function App() {
	useEffect(() => {
		useTodoStore.getState().init();
	}, []);

	return (
		<>
			<ThemeSwitcher />
			<Router>
				<Routes>
					<Route path='/' element={<CategoryListView />} />
					<Route path='/todo-list/:categoryId' element={<TodoListView />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
