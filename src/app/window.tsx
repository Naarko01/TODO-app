import { getCurrentWindow, LogicalSize } from "@tauri-apps/api/window";
import { useState } from "react";

const appWindow = getCurrentWindow();

export function useWindow() {
	const [isWindowMaximize, setIsWindowMaximize] = useState<boolean>(false);

	function closeApp() {
		return appWindow.close();
	}

	async function toggleMaximize() {
		if (isWindowMaximize) {
			await appWindow
				.setSize(new LogicalSize(450, 500))
				.then(() => setIsWindowMaximize(!isWindowMaximize));
		} else {
			await appWindow
				.setSize(new LogicalSize(1000, 850))
				.then(() => setIsWindowMaximize(!isWindowMaximize));
		}
	}

	async function toggleMinimize() {
		const minimized = await appWindow.isMinimized();

		if (!minimized) {
			await appWindow.minimize();
		}
	}

	return { isWindowMaximize, toggleMaximize, toggleMinimize, closeApp };
}
