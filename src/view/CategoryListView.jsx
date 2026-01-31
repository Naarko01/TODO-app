import { useState } from "react";
import TodoCategory from "../components/TodoCategory";

export default function CategoryListView() {
	let catList = [
		{
			id: 1,
			title: "title 1",
		},
		{
			id: 2,
			title: "title 2",
		},
		{
			id: 3,
			title: "title 3",
		},
		{
			id: 4,
			title: "title 4",
		},
	];
	const [catListState, setCatList] = useState(catList);

	function addCategory() {
		setCatList((prev) => [
			...prev,
			{
				id: prev.length + 1,
				title: `title ${prev.length + 1}`,
			},
		]);
	}

	function removeCategory(id) {
		setCatList((prev) => prev.filter((item) => item.id !== id));
	}

	return (
		<div>
			<button onClick={addCategory}>Add category</button>
			{catListState.map((element) => (
				<TodoCategory
					id={element.id}
					title={element.title}
					key={element.id}
					onRemove={() => removeCategory(element.id)}
				/>
			))}
		</div>
	);
}
