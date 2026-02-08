import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const AVAILABLE_THEMES = ["light", "dark"];
const STORAGE_KEY = "app-theme";
const DEFAULT_THEME = "light";

type Theme = {
	theme: string;
	changeTheme: (newTheme: string) => void;
	toggleTheme: () => void;
	availableThemes: string[];
};

const ThemeContext = createContext<null | Theme>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState(() => {
		const savedTheme = localStorage.getItem(STORAGE_KEY);
		return savedTheme && AVAILABLE_THEMES.includes(savedTheme) ? savedTheme : DEFAULT_THEME;
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, theme);
	}, [theme]);

	function changeTheme(newTheme: string) {
		if (AVAILABLE_THEMES.includes(newTheme)) {
			setTheme(newTheme);
		} else {
			console.warn(`Theme "${newTheme}" is not available`);
		}
	}

	function toggleTheme() {
		const currentIndex = AVAILABLE_THEMES.indexOf(theme);
		const nextIndex = (currentIndex + 1) % AVAILABLE_THEMES.length;
		AVAILABLE_THEMES[nextIndex] !== undefined && setTheme(AVAILABLE_THEMES[nextIndex]);
	}

	const value = { theme, changeTheme, toggleTheme, availableThemes: AVAILABLE_THEMES };

	return (
		<ThemeContext.Provider value={value}>
			<div className={theme}>{children}</div>
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
