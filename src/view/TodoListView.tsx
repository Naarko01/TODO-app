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

	return targetedCategory === undefined ?
			<div>Error: CategoryId in useParams doesn't exists</div>
		:	<div className='todolistContainer'>
				<div className='todolistContainer_header'>
					<ArrowLeft
						className='todolistContainer_header--returnBtn'
						onClick={() => navigate("/")}
					/>
					<h1 className='todolistContainer_header--title'>
						Catégorie: {startWithCapital(targetedCategory.title)}
					</h1>
					<div className='todolistContainer_header--addBtn'>
						<PlusIcon className='plus-icon' />
						<button onClick={() => setIsAdding(true)} disabled={isAdding}>
							Add Todo
						</button>
					</div>
				</div>
				<div>
					<TodoForm
						usecase='add'
						isUpdating={isAdding}
						setIsUpdating={setIsAdding}
						categoryId={categoryId}
					/>
					<TodoList categoryId={categoryId} />
				</div>
			</div>;
}
