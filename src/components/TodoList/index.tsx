import { useEffect, useMemo, useState } from "react";
import { useTodoStore } from "../../store/useTodoStore.js";
import type { SortOrders } from "../../utils/types.js";
import { SortOptions } from "../../utils/constants.js";
import TodoSorter from "../TodoSorter/index.js";
import Todo from "../Todo/index.js";
import { sortList } from "../../utils/helpers.js";

type Props = {
	categoryId: string | undefined;
};

export default function TodoList({ categoryId }: Props) {
	const todos = useTodoStore((state) => state.todos);
	const todosByCategory = useMemo(
		() => todos.filter((t) => t.categoryId === categoryId),
		[todos, categoryId],
	);
	const deleteTodo = useTodoStore((state) => state.deleteTodo);
	const [sortedTodos, setSortedTodos] =
		useState<typeof todosByCategory>(todosByCategory);
	const [order, setOrder] = useState<SortOrders>("asc");
	const [selectedOption, setSelectedOption] = useState<string>("default");

	useEffect(() => {
		if (selectedOption === "default") {
			setSortedTodos(todosByCategory);
		} else {
			setSortedTodos(
				sortList(
					todosByCategory,
					selectedOption as keyof typeof SortOptions,
					order,
				),
			);
		}
	}, [todosByCategory, selectedOption, order]);

	return (
		<div className="flex flex-col gap-3 p-4">
			{todosByCategory.length === 0 ? (
				<div className="mt-8 text-center text-theme-text-muted">
					Pas de Todo dans cette catégorie
				</div>
			) : (
				<div>
					<TodoSorter
						listToSort={todosByCategory}
						order={order}
						selectedOption={selectedOption}
						onSortChange={(sorted) => setSortedTodos(sorted)}
						onOrderChange={(newOrder) => setOrder(newOrder)}
						onOptionChange={(option) => setSelectedOption(option)}
					/>
					<div className="flex flex-col gap-3">
						{sortedTodos?.map((t) => (
							<Todo
								id={t.id}
								key={t.id}
								title={t.title}
								content={t.content}
								creationDate={t.creationDate}
								deadline={t.deadline}
								categoryId={t.categoryId}
								removeTodo={() => deleteTodo(t.id)}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}
