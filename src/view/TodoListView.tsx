import { useTodoStore } from "../store/useTodoStore.js";
import { useParams, useNavigate } from "react-router-dom";
import TodoList from "../components/TodoList/index.js";
import { useState } from "react";
import { formatDateToInput, getTomorrowDate } from "../utils/helpers.js";

export default function TodoListView() {
	const { categoryId } = useParams();
	const addTodos = useTodoStore((state) => state.addTodo);
	const navigate = useNavigate();
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const [newTodoTitle, setNewTodoTitle] = useState<string>("");
	const [newTodoContent, setNewTodoContent] = useState<string>("");
	const [error, setError] = useState<null | string>(null);
	const [deadline, setDeadline] = useState<string>(
		formatDateToInput(new Date()),
	);

	function resetFormStates() {
		setError(null);
		setIsAdding(false);
		setDeadline(formatDateToInput(new Date()));
		setNewTodoContent("");
		setNewTodoTitle("");
	}

	function handleSubmit(e: React.SubmitEvent) {
		e.preventDefault();
		if (newTodoTitle !== "" || newTodoContent !== "") {
			addTodos({
				title: newTodoTitle,
				content: newTodoContent,
				categoryId: categoryId,
				deadline: new Date(deadline).toLocaleDateString(),
			});
			resetFormStates();
		} else {
			setError("Vérifiez que tous les champs soient bien remplis");
		}
	}

	return (
		<div>
			{isAdding ?
				<form onSubmit={handleSubmit}>
					<label htmlFor="newTodoTitle">Titre</label>
					<input
						type="text"
						name="newTodoTitle"
						id="newTodoTitle"
						value={newTodoTitle}
						onChange={(e) => setNewTodoTitle(e.currentTarget.value)}
						required
					/>
					<label htmlFor="newTodoContent">Content</label>
					<input
						type="text"
						name="newTodoContent"
						id="newTodoContent"
						value={newTodoContent}
						onChange={(e) => setNewTodoContent(e.currentTarget.value)}
						required
					/>
					<label htmlFor="deadlineInput">A faire avant le:</label>
					<input
						type="date"
						name="deadlineInput"
						id="deadlineInput"
						value={deadline}
						min={formatDateToInput(getTomorrowDate())}
						onChange={(e) => setDeadline(e.currentTarget.value)}
						required
					/>
					<button type="submit">Créer</button>
					<button onClick={resetFormStates}>Annuler</button>
					{error && <p>{error}</p>}
				</form>
			:	<button onClick={() => setIsAdding(true)}>Add Todo</button>}
			<div>
				<button onClick={() => navigate("/")}>Retour</button>
			</div>
			<TodoList categoryId={categoryId} />
		</div>
	);
}
