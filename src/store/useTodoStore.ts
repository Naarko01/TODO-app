import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type Todo = {
	id: string;
	title: string;
	done?: boolean;
	creationDate: string;
	categoryId?: string | undefined;
	content: string;
	deadline?: string | undefined;
};

export type TodoCategory = { id: string; title: string };

export type TodoData = { todos: Todo[]; categories: TodoCategory[] };

type TodoStore = TodoData & {
	initialized: boolean;
	addTodo: (todo: Omit<Todo, "id" | "creationDate">) => void;
	updateTodo: (id: string, patch: Partial<Todo>) => void;
	deleteTodo: (id: string) => void;
	toggleTodo: (id: string) => void;
	addCategory: (title: string) => void;
	deleteCategory: (id: string) => void;
};

const defaultData: TodoData = { todos: [], categories: [] };

export const useTodoStore = create<TodoStore>()(
	subscribeWithSelector<TodoStore>((set) => ({
		...defaultData,
		initialized: false,
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
				todos: state.todos.map((t) => (t.id === id ? { ...t, ...patch } : t)),
			})),
		deleteTodo: (id) => set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
		toggleTodo: (id) =>
			set((state) => ({
				todos: state.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
			})),
		// Categories action
		addCategory: (title) =>
			set((state) => ({
				categories: [...state.categories, { id: crypto.randomUUID(), title: title }],
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
