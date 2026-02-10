import { useState } from "react";
import { type Todo } from "../../store/useTodoStore.js";
import TodoForm from "../TodoForm/index.js";

type TodoProps = Todo & { removeTodo: () => void };

export default function Todo({
	id,
	title,
	content,
	creationDate,
	deadline,
	categoryId,
	removeTodo,
}: TodoProps) {
	const [isUpdating, setIsUpdating] = useState<boolean>(false);

	return (
		<div>
			<div>
				<h1>{title}</h1>
				<p>{content}</p>
				<TodoForm
					usecase='edit'
					title={title}
					content={content}
					deadline={deadline}
					categoryId={categoryId}
					id={id}
					isUpdating={isUpdating}
					setIsUpdating={setIsUpdating}
				/>
				<p>Date d'expiration: {deadline}</p>
				<p>Date de création: {creationDate}</p>
				<button onClick={removeTodo}>Supprimer</button>
				<button onClick={() => setIsUpdating(true)}>Modifier</button>
			</div>
		</div>
	);
}
