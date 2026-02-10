import { useTodoStore } from "./useTodoStore.js";
import { useUserStore } from "./useUserStore.js";
import { loadFromDisk } from "../persistance/storage.js";

const defaultAppData = { todos: { todos: [], categories: [] }, user: { theme: "light" } };

/**
 * Store initialization function that loads data from disk and populates all stores.
 * Called once on app startup to ensure all stores are initialized with persisted data before the UI renders.
 */
export async function initializeApp() {
	try {
		const appData = await loadFromDisk(defaultAppData);
		//Initialize stores with loaded data
		useTodoStore.setState({ ...appData.todos, initialized: true });
		useUserStore.setState(appData.user);
	} catch (error) {
		console.error("Failed to initialize app:", error);
		//Stores are initialized with default data
		useTodoStore.setState({ initialized: true });
	}
}
