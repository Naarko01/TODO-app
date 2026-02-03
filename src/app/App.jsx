import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryListView from "../view/CategoryListView";
import TodoListView from "../view/TodoListView";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<CategoryListView />} />
				<Route path="/todo-list/{catID}" element={<TodoListView />} />
			</Routes>
		</Router>
	);
}

export default App;
