import { PhysicalSize, getCurrentWindow } from "@tauri-apps/api/window";

// Initialiser et afficher la fenêtre Tauri au démarrage
async function initializeWindow() {
	try {
		const appWindow = getCurrentWindow();

		// Appliquer les configurations
		await appWindow.setMinSize(new PhysicalSize(450, 500));
		await appWindow.center();
		await appWindow.setTitle("TODO App");
	} catch (err) {
		console.error("Erreur lors de la configuration de la fenêtre:", err);
	}
}

//initializeWindow();
