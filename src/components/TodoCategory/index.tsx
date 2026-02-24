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
		<div
			className="relative flex h-22.5 w-full items-center rounded-[10px]
				border border-theme-border bg-theme-card2"
		>
			<div className="ml-2.5 flex flex-col">
				<h1 className="text-theme-text">{startWithCapital(title)}</h1>
				<p className="text-sm text-theme-text-muted">
					{todoCount === 0 && "Pas de tâche associée"}
					{todoCount === 1 && "Tâche associée: " + todoCount}
					{todoCount > 1 && "Tâches associées: " + todoCount}
				</p>
				<p className="text-sm text-theme-text-muted">{nextTodoDeadline}</p>
			</div>
			<button
				onClick={onRemove}
				className="absolute right-2.5 cursor-pointer border-none
					bg-transparent text-theme-text transition-colors
					hover:text-theme-bad"
			>
				<LucideTrash2 />
			</button>
			<button
				onClick={onClick}
				className="absolute right-12.5 cursor-pointer border-none
					bg-transparent text-theme-text transition-colors
					hover:text-theme-primary"
			>
				<ArrowBigRight />
			</button>
		</div>
	);
}
