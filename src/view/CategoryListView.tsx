import { useState } from "react";
import { useTodoStore } from "../store/useTodoStore.js";
import { useNavigate } from "react-router-dom";
import { LucideClipboardList, PlusIcon } from "lucide-react";
import TodoCategory from "../components/TodoCategory/index.jsx";
import TodoForm from "../components/TodoForm/index.js";

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
		<div className="flex h-full flex-col items-center gap-4 text-theme-text">
			{/* Header */}
			<div
				className="flex min-h-18.75 w-full items-center justify-center
					gap-12 border-b-2 border-theme-card bg-theme-card2"
			>
				<div className="flex items-center justify-center">
					<LucideClipboardList className="text-theme-warn!" />
					<h1 className="ml-2.5">Mes Catégories</h1>
				</div>
				<div className="relative">
					<PlusIcon className="absolute top-1.75 left-1.5 w-5" />
					<button
						onClick={() => setIsAdding(true)}
						disabled={isAdding}
						className="base-button pl-6! h-max bg-theme-card2 font-medium
							text-theme-text disabled:opacity-50"
					>
						Ajouter
					</button>
				</div>
			</div>
			{/* Formulaire d'ajout */}
			{isAdding && (
				<TodoForm
					usecase="add"
					isUpdating={isAdding}
					setIsUpdating={setIsAdding}
				/>
			)}
			{/* Liste des catégories */}
			<div
				className="flex w-4/5 max-w-175 flex-col items-center justify-center
					gap-3.75"
			>
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
