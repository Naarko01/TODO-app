import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserStore } from "../store/useUserStore.js";
import { setupAutoSave } from "../persistance/sync.js";
import { initializeApp } from "../store/useAppStore.js";
import CategoryListView from "../view/CategoryListView.js";
import TodoListView from "../view/TodoListView.js";
import TitleBar from "../components/TitleBar/index.js";

function App() {
	const theme = useUserStore((state) => state.theme);
	const [isTitlebarVisible, setIsTitlebarVisible] = useState<boolean>(false);

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
			<TitleBar
				isVisible={isTitlebarVisible}
				onMouseEnter={() => setIsTitlebarVisible(true)}
				onMouseLeave={() => setIsTitlebarVisible(false)}
			/>
			<div
				className='titlebarToggleArea'
				onMouseEnter={() => setIsTitlebarVisible(true)}
				onMouseLeave={() => setIsTitlebarVisible(false)}
			/>
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
