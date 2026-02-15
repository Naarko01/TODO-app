import { useState } from "react";
import TodoCategory from "../components/TodoCategory/index.jsx";
import { useTodoStore } from "../store/useTodoStore.js";
import { useNavigate } from "react-router-dom";
import { LucideClipboardList, PlusIcon } from "lucide-react";

export default function CategoryListView() {
	const categories = useTodoStore((state) => state.categories);
	const addCategory = useTodoStore((state) => state.addCategory);
	const deleteCategory = useTodoStore((state) => state.deleteCategory);
	const navigate = useNavigate();
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const [newCatTitle, setNewCatTitle] = useState<string>("");
	const [error, setError] = useState<null | string>(null);

	function submitForm(e: React.SubmitEvent) {
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
		<div className='categoryListView'>
			<div className='categoryListView_header'>
				<div className='categoryListView_header--title'>
					<LucideClipboardList className='categoryListView_header--title-icon' />
					<h1>Mes Catégories</h1>
				</div>
				<div className='categoryListView_header--addBtn'>
					<PlusIcon className='plus-icon' />
					<button onClick={() => setIsAdding(true)} disabled={isAdding}>
						Ajouter
					</button>
				</div>
			</div>
			{isAdding && (
				<form onSubmit={submitForm} className='categoryListView_addForm'>
					<p>Nouvelle Catégorie:</p>
					<label htmlFor='newCatTitle'>Titre</label>
					<input
						type='text'
						name='newCatTitle'
						id='newCatTitle'
						value={newCatTitle}
						onChange={(e) => setNewCatTitle(e.currentTarget.value)}
					/>
					<div className='categoryListView_addForm--btn'>
						<button type='submit' className='categoryListView_addForm--btn-submit'>
							Créer
						</button>
						<button
							onClick={() => setIsAdding(false)}
							className='categoryListView_addForm--btn-cancel'>
							Annuler
						</button>
					</div>
					{error && <p>{error}</p>}
				</form>
			)}
			<div className='categoryListView_list'>
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
