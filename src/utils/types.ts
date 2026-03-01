export type Usecases = "addTodo" | "edit" | "addCategory" | "toggle" | "select";

export type SortOrders = "asc" | "desc";

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

export type TodoData = {
	todos: Todo[];
	categories: TodoCategory[];
};

export type TodoStore = TodoData & {
	initialized: boolean;
	addTodo: (todo: Omit<Todo, "id" | "creationDate">) => void;
	updateTodo: (id: string, patch: Partial<Todo>) => void;
	deleteTodo: (id: string) => void;
	toggleTodo: (id: string) => void;
	addCategory: (title: string) => void;
	deleteCategory: (id: string) => void;
};

export type UserData = {
	theme: string;
};

export type UserStore = UserData & {
	availableThemes: string[];
	changeTheme: (newTheme: string) => void;
	toggleTheme: () => void;
};
