import { useState } from "react";
import type { Todo } from "../../utils/types.js";
import { useTodoStore } from "../../store/useTodoStore.js";
import TodoForm from "../TodoForm/index.js";

type TodoProps = Todo & {
	removeTodo: () => void;
};

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
	const toggleTodo = useTodoStore((state) => state.toggleTodo);
	const todos = useTodoStore((state) => state.todos);
	const isDone = todos.find((t) => t.id === id)?.done;

	return (
		<div className="todo-card">
			{isDone && <div className="todoDoneFilter"></div>}
			<h1 className="font-bold text-theme-text">{title}</h1>
			<p className="text-sm text-theme-text-muted">{content}</p>
			<TodoForm
				usecase="edit"
				title={title}
				content={content}
				deadline={deadline}
				categoryId={categoryId}
				id={id}
				isUpdating={isUpdating}
				setIsUpdating={setIsUpdating}
			/>
			<div className="mt-1 flex flex-col gap-1 text-xs text-theme-text-muted">
				<p>
					Date d'expiration:{" "}
					<span className="text-theme-warn">{deadline ?? "—"}</span>
				</p>
				<p>Date de création: {creationDate}</p>
			</div>
			<div className="mt-2 flex gap-2 items-center">
				<button
					onClick={removeTodo}
					className="little-button bg-theme-card text-theme-text
						transition-colors hover:bg-theme-bad hover:text-theme-bad-fg"
				>
					Supprimer
				</button>
				<button
					onClick={() => setIsUpdating(true)}
					className="little-button bg-theme-card text-theme-text
						transition-colors hover:bg-theme-primary
						hover:text-theme-primary-fg"
				>
					Modifier
				</button>
				<div className="flex gap-2 text-sm">
					<label htmlFor="toggleDone">Marquer comme fait: </label>
					<input
						type="checkbox"
						name="toggleDone"
						id="toggleDone"
						className="cursor-pointer w-4"
						checked={isDone}
						onChange={() => toggleTodo(id)}
					/>
				</div>
			</div>
		</div>
	);
}
