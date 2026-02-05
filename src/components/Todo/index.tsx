interface TodoProps {
	id: string;
	title: string;
	content: string;
	creationDate: string;
	deadline?: string | undefined;
}

export default function Todo({
	id,
	title,
	content,
	creationDate,
	deadline,
}: TodoProps) {
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
