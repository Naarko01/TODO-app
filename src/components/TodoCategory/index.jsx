export default function TodoCategory({
	id,
	title,
	todoCount,
	nextTodoDeadline,
	onRemove,
}) {
	return (
		<div>
			<div>
				<h1>{title}</h1>
				<h2>{id}</h2>
				<button onClick={onRemove}>Remove</button>
				<p>{todoCount}</p>
			</div>
			<div>
				<p>{nextTodoDeadline}</p>
			</div>
		</div>
	);
}
