import { ArrowBigRight } from "lucide-react";
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
		<div className="TodoCatContainer">
			<div>
				<h1>{title}</h1>
				<h2>{id}</h2>
				<button onClick={onRemove}>Remove</button>
				<p>{todoCount}</p>
			</div>
			<div>
				<ArrowBigRight onClick={onClick} />
				<p>{nextTodoDeadline}</p>
			</div>
		</div>
	);
}
