import { useState } from "react";
import TodoCategory from "../components/TodoCategory";
import { useTodoStore } from "../store/useTodoStore";
import { useNavigate } from "react-router-dom";

export default function CategoryListView() {
	const categories = useTodoStore((state) => state.categories);
	const addCategory = useTodoStore((state) => state.addCategory);
	const deleteCategory = useTodoStore((state) => state.deleteCategory);
	const navigate = useNavigate();
	const [isAdding, setIsAdding] = useState(false);
	const [newCatTitle, setNewCatTitle] = useState("");
	const [error, setError] = useState(null);

	function submitForm(e) {
		e.preventDefault();
		if (newCatTitle !== "") {
			addCategory(newCatTitle);
			setError(null);
			setIsAdding(false);
		} else {
			setError('Vérifiez que le champ "Titre" est bien rempli');
		}
	}

	return (
		<div>
			{isAdding ?
				<form onSubmit={submitForm}>
					<label htmlFor="newCatTitle">Titre</label>
					<input
						type="text"
						name="newCatTitle"
						id="newCatTitle"
						value={newCatTitle}
						onChange={(e) => setNewCatTitle(e.currentTarget.value)}
					/>
					<button type="submit">Créer</button>
					<button onClick={() => setIsAdding(false)}>Annuler</button>
					{error && <p>{error}</p>}
				</form>
			:	<button onClick={() => setIsAdding(true)}>Add category</button>}
			<div>
				{categories.map((element) => (
					<TodoCategory
						id={element.id}
						title={element.title}
						key={element.id}
						onRemove={() => deleteCategory(element.id)}
						onClick={() => navigate(`/todo-list/${element.id}`)}
					/>
				))}
			</div>
		</div>
	);
}
