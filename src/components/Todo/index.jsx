export default function Todo({
	id,
	title,
	content,
	creationDate,
	deadline,
	categoryId,
}) {
	return (
		<div>
			<div>
				<h1>{title}</h1>
				<p>{content}</p>
			</div>
			<div>
				<p>{creationDate}</p>
				<p>{deadline}</p>
			</div>
		</div>
	);
}
