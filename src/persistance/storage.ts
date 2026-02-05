import {
	readTextFile,
	writeTextFile,
	exists,
	BaseDirectory,
	mkdir,
} from "@tauri-apps/plugin-fs";
import type { StoreData } from "../store/useTodoStore.js";

const FILE_NAME = "todos.json";
const DIR_PATH = BaseDirectory.Document;
const APP_DIR = "TODO-App";

/**
 * Ensures that the application directory exists in the specified base directory.
 */
async function ensureAppDir() {
	try {
		const dirExists = await exists(APP_DIR, { baseDir: DIR_PATH });
		if (!dirExists) {
			await mkdir(APP_DIR, {
				baseDir: DIR_PATH,
				recursive: true,
			});
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
 *
 * @param {StoreData} fallback Data to return if loading fails or file doesn't exist. Also used to initialize the file on first run.
 * @returns {StoreData} The loaded data from disk, or the fallback if loading fails.
 * @description Loads the store data from disk.
 * If the file doesn't exist, it initializes it with the provided fallback data.
 * If any error occurs during loading, it logs the error and returns the fallback data.
 */
export async function loadFromDisk(fallback: StoreData): Promise<StoreData> {
	try {
		await ensureAppDir();
		const path = getFilePath();

		const fileExists = await exists(path, {
			baseDir: DIR_PATH,
		});

		if (!fileExists) {
			await saveToDisk(fallback);
			return fallback;
		}
		const content = await readTextFile(path, {
			baseDir: DIR_PATH,
		});
		return JSON.parse(content);
	} catch (err) {
		console.error("Load error:", err);
		return fallback;
	}
}

/**
 *
 * @param {StoreData} data The data to be saved to disk.
 * @description Saves the provided store data to disk.
 * It ensures the application directory exists before attempting to write the file.
 * If any error occurs during saving, it logs the error to the console.
 */
export async function saveToDisk(data: StoreData) {
	try {
		await ensureAppDir();
		await writeTextFile(getFilePath(), JSON.stringify(data, null, 2), {
			baseDir: DIR_PATH,
		});
	} catch (err) {
		console.error("Save error:", err);
	}
}
