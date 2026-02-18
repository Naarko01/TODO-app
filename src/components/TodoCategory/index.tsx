import { ArrowBigRight, LucideTrash2 } from "lucide-react";
import type { TodoCategory } from "../../store/useTodoStore.js";
import { startWithCapital } from "../../utils/helpers.js";

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
		<div className='TodoCategory'>
			<div className='TodoCategory_content'>
				<h1 className='TodoCategory_content--title'>{startWithCapital(title)}</h1>
				<p className='TodoCategory_content--todocount'>
					{todoCount === 0 && "Pas de tâche associée"}
					{todoCount === 1 && "Tâche associée: " + todoCount}
					{todoCount > 1 && "Tâches associées: " + todoCount}
				</p>
				<p className='TodoCategory_content--nextDeadline'>{nextTodoDeadline}</p>
			</div>
			<button onClick={onRemove} className='TodoCategory_delete'>
				<LucideTrash2 />
			</button>
			<button onClick={onClick} className='TodoCategory_select'>
				<ArrowBigRight />
			</button>
		</div>
	);
}
