import { ArrowBigRight } from "lucide-react";

export default function TodoCategory({
	id,
	title,
	todoCount,
	nextTodoDeadline,
	onRemove,
	onClick,
}) {
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
