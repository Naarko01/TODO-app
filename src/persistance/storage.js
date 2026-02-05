import { readTextFile, writeTextFile, exists, BaseDirectory, mkdir } from "@tauri-apps/plugin-fs";

const FILE_NAME = "todos.json"
const DIR_PATH = BaseDirectory.Document
const APP_DIR = "TODO-App"

async function ensureAppDir() {
   try {
      const dirExists = await exists(APP_DIR, { baseDir: DIR_PATH })
      if (!dirExists) {
         await mkdir(APP_DIR, {
            baseDir: DIR_PATH,
            recursive: true
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

export async function loadFromDisk(fallback) {
   try {
      await ensureAppDir();
      const path = getFilePath();

      const fileExists = await exists(path, {
         baseDir: DIR_PATH
      });

      if (!fileExists) {
         await saveToDisk(fallback)
         return fallback;
      }
      const content = await readTextFile(path, {
         baseDir: DIR_PATH
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
         getFilePath(),
         JSON.stringify(data, null, 2),
         { baseDir: DIR_PATH }
      );
   } catch (err) {
      console.error("Save error:", err);
   }

}