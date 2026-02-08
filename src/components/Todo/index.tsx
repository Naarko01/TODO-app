import { useState } from "react";
import { useTodoStore, type Todo } from "../../store/useTodoStore.js";
import { formatDateToInput, getTomorrowDate } from "../../utils/helpers.js";

type TodoProps = Todo & { removeTodo: () => void };

export default function Todo({
	id,
	title,
	content,
	creationDate,
	deadline,
	removeTodo,
}: TodoProps) {
	const updateTodo = useTodoStore((state) => state.updateTodo);
	const [isUpdating, setIsUpdating] = useState<boolean>(false);
	const [newTitle, setNewTitle] = useState<string>(title);
	const [newContent, setNewContent] = useState<string>(content);
	const [newDeadline, setNewDeadline] = useState<string | undefined>(
		deadline === undefined ? formatDateToInput(new Date()) : deadline,
	);
	const [error, setError] = useState<string | null>(null);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		let target = e.currentTarget;
		if (target.id === "newTitle") {
			setNewTitle(target.value);
		} else if (target.id === "newContent") {
			setNewContent(target.value);
		} else if (target.id === "newDeadline") {
			setNewDeadline(target.value);
		}
	}

	function handleForm(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		if (newContent !== "" || newTitle !== "" || newDeadline !== undefined) {
			updateTodo(id, {
				title: newTitle,
				content: newContent,
				deadline:
					newDeadline === undefined ? undefined : new Date(newDeadline).toLocaleDateString(),
			});
			setError(null);
			setIsUpdating(false);
		} else {
			setError('Les champs "Titre" et "Contenu" ne peuvent pas être vides');
		}
	}

	return (
		<div>
			{isUpdating ?
				<form onSubmit={handleForm}>
					<label htmlFor='newTitle'>Titre</label>
					<input
						type='text'
						name='newTitle'
						id='newTitle'
						value={newTitle}
						onChange={handleChange}
						required
					/>
					<label htmlFor='newContent'>Contenu</label>
					<input
						type='text'
						name='newContent'
						id='newContent'
						value={newContent}
						onChange={handleChange}
						required
					/>
					<label htmlFor='newDeadline'>A faire avant le:</label>
					<input
						type='date'
						name='newDeadline'
						id='newDeadline'
						value={newDeadline}
						min={formatDateToInput(getTomorrowDate())}
						onChange={handleChange}
						required
					/>
					<button type='submit'>Confirmer</button>
					<button onClick={() => setIsUpdating(false)}>Annuler</button>
				</form>
			:	<div>
					<h1>{title}</h1>
					<p>{content}</p>
					<p>Date d'expiration: {deadline}</p>
				</div>
			}
			<div>
				<p>Date de création: {creationDate}</p>
				{!isUpdating && (
					<>
						<button onClick={removeTodo}>Supprimer</button>
						<button onClick={() => setIsUpdating(true)}>Modifier</button>
					</>
				)}
			</div>
		</div>
	);
}
