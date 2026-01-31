import { createContext, useContext, useReducer } from "react";

const CategoryContext = createContext(null);
const CategoryDispatch = createContext(null);

export function CategoryProvider({ children }) {
	const [category, dispatch] = useReducer(categoryReducer, initialCategory);

	return (
		<CategoryContext value={category}>
			<CategoryDispatch value={dispatch}>{children}</CategoryDispatch>
		</CategoryContext>
	);
}

export function useCategory() {
	return useContext(CategoryContext);
}

export function useCategoryDispatch() {
	return useContext(CategoryDispatch);
}

const initialCategory = [
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
