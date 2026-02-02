use serde_json::Value;
use std::fs;
use std::path::PathBuf;

#[tauri::command]
fn save_todos(todos: Vec<Value>) -> Result<String, String> {
    let mut docs_dir: PathBuf =
        dirs::document_dir().ok_or("Impossible de trouver le dossier Documents")?;
    docs_dir.push("TODO-app");

    fs::create_dir_all(&docs_dir).map_err(|e| format!("Erreur création dossier: {}", e))?;

    let file_path = docs_dir.join("todos.json");

    let json = serde_json::to_string_pretty(&todos)
        .map_err(|e| format!("Erreur sérialisation JSON: {}", e))?;

    fs::write(&file_path, json).map_err(|e| format!("Erreur écriture fichier: {}", e))?;

    Ok(file_path.to_string_lossy().into_owned())
}

#[tauri::command]
fn load_todos() -> Result<Vec<Value>, String> {
    let docs_dir: PathBuf =
        dirs::document_dir().ok_or("Impossible de trouver le dossier Documents")?;
    let file_path = docs_dir.join("TODO-app").join("todos.json");

    // Si le fichier n'existe pas, retourner un tableau vide
    if !file_path.exists() {
        return Ok(Vec::new());
    }

    let content =
        fs::read_to_string(&file_path).map_err(|e| format!("Erreur lecture fichier: {}", e))?;
    let todos: Vec<Value> =
        serde_json::from_str(&content).map_err(|e| format!("Erreur parsing JSON: {}", e))?;
    Ok(todos)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![save_todos, load_todos])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
