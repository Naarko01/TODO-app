import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Todo from "../components/Todo";
import TodoCategory from "../components/TodoCategory";

function App() {
	return (
		<main>
			<TodoCategory>
				<Todo />
			</TodoCategory>
		</main>
	);
}

export default App;
