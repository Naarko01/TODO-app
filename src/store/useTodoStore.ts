import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { loadFromDisk, saveToDisk } from "../persistance/storage.js";

export type Todo = {
	id: string;
	title: string;
	done?: boolean;
	creationDate: string;
	categoryId?: string | undefined;
	content: string;
	deadline?: string | undefined;
};

export type TodoCategory = {
	id: string;
	title: string;
};

export type StoreData = {
	todos: Todo[];
	categories: TodoCategory[];
};

type Store = StoreData & {
	initialized: boolean;
	init: () => Promise<void>;
	addTodo: (todo: Omit<Todo, "id" | "creationDate">) => void;
	updateTodo: (id: string, patch: Partial<Todo>) => void;
	deleteTodo: (id: string) => void;
	toggleTodo: (id: string) => void;
	addCategory: (title: string) => void;
	deleteCategory: (id: string) => void;
};

const defaultData: StoreData = {
	todos: [],
	categories: [],
};

export const useTodoStore = create<Store>()(
	subscribeWithSelector<Store>((set, get) => ({
		...defaultData,
		initialized: false,
		// store init
		init: async () => {
			const data = await loadFromDisk(defaultData);
			set({ ...data, initialized: true });
		},
		// TODO actions
		addTodo: (todo) =>
			set((state) => ({
				todos: [
					...state.todos,
					{
						id: crypto.randomUUID(),
						creationDate: new Date().toLocaleDateString(),
						done: false,
						...todo,
					},
				],
			})),
		updateTodo: (id, patch) =>
			set((state) => ({
				todos: state.todos.map((t) =>
					t.id === id ? { ...t, ...patch } : t,
				),
			})),
		deleteTodo: (id) =>
			set((state) => ({
				todos: state.todos.filter((t) => t.id !== id),
			})),
		toggleTodo: (id) =>
			set((state) => ({
				todos: state.todos.map((t) =>
					t.id === id ? { ...t, done: !t.done } : t,
				),
			})),
		// Categories action
		addCategory: (title) =>
			set((state) => ({
				categories: [
					...state.categories,
					{
						id: crypto.randomUUID(),
						title: title,
					},
				],
			})),
		deleteCategory: (id) =>
			set((state) => ({
				categories: state.categories.filter((c) => c.id !== id),
				todos: state.todos.map((t) =>
					t.categoryId === id ? { ...t, categoryId: undefined } : t,
				),
			})),
	})),
);

//autosave ? à revoir

let timeout: ReturnType<typeof setTimeout> | undefined;
useTodoStore.subscribe(
	(s) => ({
		todos: s.todos,
		categories: s.categories,
	}),
	(data) => {
		clearTimeout(timeout);
		//trigger la save 400ms après la dernière modification du state. Nouvelle modif entre temps reset le timer
		timeout = setTimeout(() => {
			saveToDisk(data);
		}, 400);
	},
);
