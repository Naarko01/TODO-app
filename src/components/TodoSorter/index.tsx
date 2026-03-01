import { useRef } from "react";
import type { Todo, SortOrders } from "../../utils/types.js";
import { SortOptions } from "../../utils/constants.js";
import { sortList } from "../../utils/helpers.js";

type Props = {
	listToSort: Todo[];
	order: SortOrders;
	selectedOption: string;
	onSortChange: (sortedList: Todo[]) => void;
	onOrderChange: (order: SortOrders) => void;
	onOptionChange: (option: string) => void;
};

export default function TodoSorter({
	listToSort,
	order,
	selectedOption,
	onSortChange,
	onOrderChange,
	onOptionChange,
}: Props) {
	const selectRef = useRef<HTMLSelectElement>(null);

	function changeOrder() {
		const newOrder = order === "asc" ? "desc" : "asc";
		onOrderChange(newOrder);
		if (selectRef.current && selectRef.current.value !== "default") {
			onSortChange(
				sortList(
					listToSort,
					selectRef.current.value as keyof typeof SortOptions,
					newOrder,
				),
			);
		}
	}

	function selectChange(
		e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
	) {
		onOptionChange(e.currentTarget.value);
		if (e.currentTarget.value !== "default") {
			onSortChange(
				sortList(
					listToSort,
					e.currentTarget.value as keyof typeof SortOptions,
					order,
				),
			);
		}
	}

	return (
		<div>
			<label htmlFor=""></label>
			<select
				ref={selectRef}
				name="todoSorter"
				id="todoSorter"
				value={selectedOption ?? "default"}
				onChange={selectChange}
			>
				<option value="default">--Options de trie--</option>
				{Object.entries(SortOptions).map(([key, label]) => (
					<option key={key} value={key}>
						{label}
					</option>
				))}
			</select>
			<button onClick={changeOrder}>Ordre de trie</button>
		</div>
	);
}
