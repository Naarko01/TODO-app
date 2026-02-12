import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryListView from "../view/CategoryListView.js";
import TodoListView from "../view/TodoListView.js";
import { useEffect } from "react";
import { useUserStore } from "../store/useUserStore.js";
import { setupAutoSave } from "../persistance/sync.js";
import { initializeApp } from "../store/useAppStore.js";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher.js";

function App() {
	const theme = useUserStore((state) => state.theme);

	//initialize global store
	useEffect(() => {
		initializeApp();
	}, []);

	//activate autosave after modification
	useEffect(() => {
		const cleanup = setupAutoSave();
		return cleanup;
	}, []);

	return (
		<div className={theme} id='theme'>
			<ThemeSwitcher usecase='toggle' />
			<Router>
				<Routes>
					<Route path='/' element={<CategoryListView />} />
					<Route path='/todo-list/:categoryId' element={<TodoListView />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
