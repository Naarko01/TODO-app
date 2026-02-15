import { ArrowBigRight, LucideTrash2 } from "lucide-react";
import type { TodoCategory } from "../../store/useTodoStore.js";

type CategoryProps = TodoCategory & {
	todoCount?: number | undefined;
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
			<h1 className='TodoCategory_title'>{title}</h1>
			<LucideTrash2 onClick={onRemove} className='TodoCategory_delete' />
			<p className='TodoCategory_todocount'>{todoCount}</p>
			<ArrowBigRight onClick={onClick} className='TodoCategory_select' />
			<p className='TodoCategory_nextDeadline'>{nextTodoDeadline}</p>
		</div>
	);
}
