import {
	readTextFile,
	writeTextFile,
	exists,
	BaseDirectory,
	mkdir,
} from "@tauri-apps/plugin-fs";
import type { TodoData, UserData } from "../utils/types.js";

export type AppData = { todos: TodoData; user: UserData };

const FILE_NAME = "todos.json";
const DIR_PATH = BaseDirectory.Document;
const APP_DIR = "TODO-App";

/**
 * Ensures that the application directory exists in the specified base directory.
 * @throws Will throw an error if there is an issue accessing the file system or creating the directory.
 */
async function ensureAppDir() {
	try {
		const dirExists = await exists(APP_DIR, { baseDir: DIR_PATH });
		if (!dirExists) {
			await mkdir(APP_DIR, { baseDir: DIR_PATH, recursive: true });
		}
	} catch (err) {
		console.error("ensureAppDir - FS error:", err);
		throw err;
	}
}

function getFilePath() {
	return `${APP_DIR}/${FILE_NAME}`;
}

/**
 * @param {AppData} fallback Data to return if loading fails or file doesn't exist. Also used to initialize the file on first run.
 * @returns {AppData} The loaded data from disk, or the fallback if loading fails.
 * @description Loads the store data from disk.
 * If the file doesn't exist, it initializes it with the provided fallback data.
 * If any error occurs during loading, it logs the error and returns the fallback data.
 */
export async function loadFromDisk(fallback: AppData): Promise<AppData> {
	try {
		await ensureAppDir();
		const path = getFilePath();

		const fileExists = await exists(path, { baseDir: DIR_PATH });

		if (!fileExists) {
			await saveToDisk(fallback);
			return fallback;
		}
		const content = await readTextFile(path, { baseDir: DIR_PATH });
		const data = JSON.parse(content);

		// Merge avec defaults pour éviter les erreurs si une clé manque
		return {
			todos: { ...fallback.todos, ...data.todos },
			user: { ...fallback.user, ...data.user },
		};
	} catch (err) {
		console.error("Load error:", err);
		return fallback;
	}
}

/**
 * @param {AppData} data The data to be saved to disk.
 * @description Saves the provided store data to disk.
 * It ensures the application directory exists before attempting to write the file.
 * If any error occurs during saving, it logs the error to the console.
 */
export async function saveToDisk(data: AppData) {
	try {
		await ensureAppDir();
		await writeTextFile(getFilePath(), JSON.stringify(data, null, 2), {
			baseDir: DIR_PATH,
		});
	} catch (err) {
		console.error("Save error:", err);
	}
}
