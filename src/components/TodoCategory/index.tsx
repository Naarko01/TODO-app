import { ArrowBigRight, LucideTrash2 } from "lucide-react";
import { startWithCapital } from "../../utils/helpers.js";
import type { TodoCategory } from "../../store/useTodoStore.js";

type CategoryProps = TodoCategory & {
	todoCount: number;
	nextTodoDeadline?: string | undefined;
	onRemove: () => void;
	onClick: () => void;
};

export default function TodoCategory({
	id,
	title,
	todoCount,
	nextTodoDeadline,
	onRemove,
	onClick,
}: CategoryProps) {
	return (
		<div className='relative flex items-center border border-theme-border rounded-[10px] bg-theme-card2 w-full h-22.5'>
			<div className='flex flex-col ml-2.5'>
				<h1 className='text-theme-text'>{startWithCapital(title)}</h1>
				<p className='text-theme-text-muted text-sm'>
					{todoCount === 0 && "Pas de tâche associée"}
					{todoCount === 1 && "Tâche associée: " + todoCount}
					{todoCount > 1 && "Tâches associées: " + todoCount}
				</p>
				<p className='text-theme-text-muted text-sm'>{nextTodoDeadline}</p>
			</div>
			<button
				onClick={onRemove}
				className='absolute right-2.5 border-none bg-transparent cursor-pointer text-theme-text hover:text-theme-bad transition-colors'>
				<LucideTrash2 />
			</button>
			<button
				onClick={onClick}
				className='absolute right-12.5 border-none bg-transparent cursor-pointer text-theme-text hover:text-theme-primary transition-colors'>
				<ArrowBigRight />
			</button>
		</div>
	);
}
