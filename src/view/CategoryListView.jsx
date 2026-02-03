import TodoCategory from "../components/TodoCategory";
import { useTodoStore } from "../store/useTodoStore";

export default function CategoryListView() {
	const categories = useTodoStore((state) => state.categories);
	const addCategory = useTodoStore((state) => state.addCategory);
	const deleteCategory = useTodoStore((state) => state.deleteCategory);

	return (
		<div>
			<button onClick={() => addCategory(crypto.randomUUID())}>
				Add category
			</button>
			{categories.map((element) => (
				<TodoCategory
					id={element.id}
					title={element.title}
					key={element.id}
					onRemove={() => deleteCategory(element.id)}
				/>
			))}
		</div>
	);
}
