import { useParams, useNavigate } from "react-router-dom";
import TodoList from "../components/TodoList/index.js";
import { useState } from "react";
import TodoForm from "../components/TodoForm/index.js";

export default function TodoListView() {
	const { categoryId } = useParams();
	const navigate = useNavigate();
	const [isAdding, setIsAdding] = useState<boolean>(false);

	return (
		<div>
			{!isAdding && <button onClick={() => setIsAdding(true)}>Add Todo</button>}
			<TodoForm
				usecase='add'
				isUpdating={isAdding}
				setIsUpdating={setIsAdding}
				categoryId={categoryId}
			/>
			<div>
				<button onClick={() => navigate("/")}>Retour</button>
			</div>
			<TodoList categoryId={categoryId} />
		</div>
	);
}
