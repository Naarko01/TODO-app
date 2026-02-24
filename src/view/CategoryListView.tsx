import { useState } from "react";
import { useTodoStore } from "../store/useTodoStore.js";
import { useNavigate } from "react-router-dom";
import { LucideClipboardList, PlusIcon } from "lucide-react";
import TodoCategory from "../components/TodoCategory/index.jsx";

export default function CategoryListView() {
	const categories = useTodoStore((state) => state.categories);
	const todos = useTodoStore((state) => state.todos);
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

	function numbTodoPerCategory(categoryId: string): number {
		const todoPerCategory = todos.filter((t) => t.categoryId === categoryId);
		return todoPerCategory.length;
	}

	return (
		<div className='flex flex-col items-center gap-4 text-theme-text h-full'>
			{/* Header */}
			<div className='flex justify-center items-center gap-12 bg-theme-card2 w-full min-h-18.75 border-b-2 border-theme-card'>
				<div className='flex justify-center items-center'>
					<LucideClipboardList className='text-theme-warn' />
					<h1 className='ml-2.5'>Mes Catégories</h1>
				</div>
				<div className='relative'>
					<PlusIcon className='absolute top-1 left-1.25 w-5' />
					<button
						onClick={() => setIsAdding(true)}
						disabled={isAdding}
						className='base-button pl-6 h-max font-medium bg-theme-card2 text-theme-text disabled:opacity-50'>
						Ajouter
					</button>
				</div>
			</div>

			{/* Formulaire d'ajout */}
			{isAdding && (
				<form
					onSubmit={submitForm}
					className='flex flex-col justify-center items-center gap-2 border-2 border-theme-border bg-theme-card2 w-1/2 max-w-125 h-37.5 rounded-[10px] p-4'>
					<p className='text-center font-bold'>Nouvelle Catégorie:</p>
					<label htmlFor='newCatTitle' className='text-center font-bold'>
						Titre
					</label>
					<input
						type='text'
						name='newCatTitle'
						id='newCatTitle'
						value={newCatTitle}
						onChange={(e) => setNewCatTitle(e.currentTarget.value)}
						className='h-7.5 font-jetbrains text-base font-semibold mb-2.5 w-4/5 max-w-87.5 self-center rounded-full px-5 border border-theme-border bg-theme-card text-theme-text outline-none focus:ring-2 focus:ring-theme-ring'
					/>
					<div className='flex justify-center gap-5'>
						<button type='submit' className='base-button bg-theme-card text-theme-text'>
							Créer
						</button>
						<button
							onClick={() => setIsAdding(false)}
							className='base-button bg-theme-card text-theme-text'>
							Annuler
						</button>
					</div>
					{error && <p className='text-theme-bad text-sm'>{error}</p>}
				</form>
			)}

			{/* Liste des catégories */}
			<div className='flex flex-col justify-center items-center gap-3.75 w-4/5 max-w-175'>
				{categories.map((element) => (
					<TodoCategory
						id={element.id}
						title={element.title}
						todoCount={numbTodoPerCategory(element.id)}
						onRemove={() => deleteCategory(element.id)}
						onClick={() => navigate(`/todo-list/${element.id}`)}
						key={element.id}
					/>
				))}
			</div>
		</div>
	);
}
