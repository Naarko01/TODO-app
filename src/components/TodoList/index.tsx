import { useMemo } from "react";
import { useTodoStore } from "../../store/useTodoStore.js";
import Todo from "../Todo/index.js";

export default function TodoList({ categoryId }: { categoryId: string | undefined }) {
	const todos = useTodoStore((state) => state.todos);
	const todosByCategory = useMemo(
		() => todos.filter((t) => t.categoryId === categoryId),
		[todos, categoryId],
	);
	const deleteTodo = useTodoStore((state) => state.deleteTodo);

	return (
		<div className='flex flex-col gap-3 p-4'>
			{todosByCategory.length === 0 ?
				<div className='text-center text-theme-text-muted mt-8'>
					Pas de Todo dans cette catégorie
				</div>
			:	<div className='flex flex-col gap-3'>
					{todosByCategory?.map((t) => (
						<Todo
							id={t.id}
							key={t.id}
							title={t.title}
							content={t.content}
							creationDate={t.creationDate}
							deadline={t.deadline}
							categoryId={t.categoryId}
							removeTodo={() => deleteTodo(t.id)}
						/>
					))}
				</div>
			}
		</div>
	);
}
