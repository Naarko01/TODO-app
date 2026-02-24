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
		<div className='border border-theme-border rounded-[10px] bg-theme-card2 p-4'>
			<div className='flex flex-col gap-2'>
				<h1 className='text-theme-text font-bold'>{title}</h1>
				<p className='text-theme-text-muted text-sm'>{content}</p>
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
				<div className='flex flex-col gap-1 text-xs text-theme-text-muted mt-1'>
					<p>
						Date d'expiration: <span className='text-theme-warn'>{deadline ?? "—"}</span>
					</p>
					<p>Date de création: {creationDate}</p>
				</div>
				<div className='flex gap-2 mt-2'>
					<button
						onClick={removeTodo}
						className='base-button bg-theme-card text-theme-text hover:bg-theme-bad hover:text-theme-bad-fg transition-colors'>
						Supprimer
					</button>
					<button
						onClick={() => setIsUpdating(true)}
						className='base-button bg-theme-card text-theme-text hover:bg-theme-primary hover:text-theme-primary-fg transition-colors'>
						Modifier
					</button>
				</div>
			</div>
		</div>
	);
}
