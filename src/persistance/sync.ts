import { useTodoStore } from "../store/useTodoStore.js";
import { useUserStore } from "../store/useUserStore.js";
import { saveToDisk } from "./storage.js";

let timeout: ReturnType<typeof setTimeout> | undefined;

/**
 * Sets up automatic saving of store data to disk when either store changes.
 * Debounces saves to occur 600ms after the last change.
 * @returns A cleanup function to remove the subscribers
 */
export function setupAutoSave() {
	function debounce() {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			const todoState = useTodoStore.getState();
			const userState = useUserStore.getState();

			saveToDisk({
				todos: { todos: todoState.todos, categories: todoState.categories },
				user: { theme: userState.theme },
			});
		}, 600);
	}

	// Subscribe to todo store changes
	const unsubscribeTodo = useTodoStore.subscribe(
		(s) => ({ todos: s.todos, categories: s.categories }),
		() => debounce(),
	);

	// Subscribe to user store changes
	const unsubscribeUser = useUserStore.subscribe(
		(s) => ({ theme: s.theme }),
		() => debounce(),
	);

	return () => {
		clearTimeout(timeout);
		unsubscribeTodo();
		unsubscribeUser();
	};
}
