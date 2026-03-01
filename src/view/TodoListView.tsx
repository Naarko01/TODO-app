import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTodoStore } from "../store/useTodoStore.js";
import { startWithCapital } from "../utils/helpers.js";
import { PlusIcon, ArrowLeft } from "lucide-react";
import TodoList from "../components/TodoList/index.js";
import TodoForm from "../components/TodoForm/index.js";

export default function TodoListView() {
	const { categoryId } = useParams();
	const categories = useTodoStore((state) => state.categories);
	const targetedCategory = categories.find((cat) => cat.id === categoryId);
	const navigate = useNavigate();
	const [isAdding, setIsAdding] = useState<boolean>(false);

	return targetedCategory === undefined ? (
		<div>Error: CategoryId in useParams doesn't exists</div>
	) : (
		<div className="flex w-full flex-col">
			{/* Header */}
			<div
				className="relative flex h-25 w-full items-center justify-center
					gap-6 self-center border-b-2 border-theme-border bg-theme-card2"
			>
				<ArrowLeft
					className="absolute left-5 cursor-pointer text-theme-text"
					onClick={() => navigate("/")}
				/>
				<h1 className="text-theme-text">
					Catégorie: {startWithCapital(targetedCategory.title)}
				</h1>
				<div className="relative cursor-pointer">
					<PlusIcon
						className="absolute top-1.75 left-1.25 w-5 text-theme-text"
					/>
					<button
						onClick={() => setIsAdding(true)}
						disabled={isAdding}
						className="base-button h-max bg-theme-card2 pl-6! font-medium
							text-theme-text disabled:opacity-50"
					>
						Add Todo
					</button>
				</div>
			</div>
			<div>
				<TodoForm
					usecase="addTodo"
					isUpdating={isAdding}
					setIsUpdating={setIsAdding}
					categoryId={categoryId}
				/>
				<TodoList categoryId={categoryId} />
			</div>
		</div>
	);
}
