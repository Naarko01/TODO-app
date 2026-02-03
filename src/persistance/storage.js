import { readTextFile, writeTextFile, exists, BaseDirectory, mkdir } from "@tauri-apps/plugin-fs";

const FILE_NAME = "todos.json"
const DIR_PATH = BaseDirectory.AppData
const APP_DIR = "TODO-App"

async function ensureAppDir() {
   const dirExists = await exists(APP_DIR, { dir: DIR_PATH })

   if (!dirExists) {
      await mkdir(APP_DIR, {
         dir: DIR_PATH,
         recursive: true
      });
   }
}

function getFilePath() {
   return `${APP_DIR}/${FILE_NAME}`;
}

export async function loadFromDisk(fallback) {
   try {
      await ensureAppDir();

      const path = getFilePath();

      const fileExists = await exists(path, {
         dir: DIR_PATH
      });

      if (!fileExists) {
         await saveToDisk(fallback)
         return fallback;
      }
      const content = await readTextFile(path, {
         dir: DIR_PATH
      })
      return JSON.parse(content)
   } catch (err) {
      console.error("Load error:", err)
      return fallback;
   }
}

export async function saveToDisk(data) {
   try {
      await ensureAppDir();
      await writeTextFile(
         FILE_NAME,
         JSON.stringify(data, null, 2),
         { dir: DIR_PATH }
      );
   } catch (err) {
      console.error("Save error:", err);
   }

}