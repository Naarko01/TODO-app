import { useTodoStore } from "../store/useTodoStore";
import { useParams, useNavigate } from "react-router-dom";
import Todo from "../components/Todo";

export default function TodoListView() {
	const { categoryId } = useParams();
	const getTodos = useTodoStore((state) => state.getTodosByCategory);
	const todos = getTodos(categoryId);
	const navigate = useNavigate();

	return (
		<>
			<div>
				<button onClick={() => navigate("/")}>Retour</button>
			</div>
			{todos.length === 0 ?
				<div>No todos in this category</div>
			:	<div>
					{todos?.map((element) => (
						<Todo
							id={element.id}
							title={element.title}
							content={element.content}
							creationDate={element.creationDate}
							deadline={element.deadline}
						/>
					))}
				</div>
			}
		</>
	);
}
