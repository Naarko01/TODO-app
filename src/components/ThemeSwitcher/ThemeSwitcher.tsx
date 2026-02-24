import { useUserStore } from "../../store/useUserStore.js";
import { Moon, Sun } from "lucide-react";

type ThemeSwitchProps = { usecase: "toggle" | "select" };

export default function ThemeSwitcher({ usecase }: ThemeSwitchProps) {
	const { theme, changeTheme, availableThemes, toggleTheme } = useUserStore();

	return (
		<div className="ml-5">
			{usecase === "select" ? (
				<div>
					<select
						value={theme}
						onChange={(e) => changeTheme(e.target.value)}
						className="rounded-md border border-theme-border bg-theme-card
							px-2 py-1 font-jetbrains text-sm text-theme-text
							outline-none focus:ring-2 focus:ring-theme-ring"
					>
						{availableThemes.map((theme) => (
							<option key={theme} value={theme}>
								{theme.charAt(0).toUpperCase() + theme.slice(1)}
							</option>
						))}
					</select>
				</div>
			) : (
				<div>
					{/* Bouton toggle avec curseur glissant */}
					<button
						onClick={toggleTheme}
						className="relative flex h-6.25 w-15 cursor-pointer
							items-center justify-between rounded-full border-none
							bg-theme-secondary p-0"
					>
						<Sun
							strokeWidth="3"
							className={`mx-1.25 w-3.75 transition-all duration-200 ${
								theme === "light"
									? "z-2 text-theme-text-on-color"
									: "z-[-1] text-white opacity-60"
								}`}
						/>
						<Moon
							strokeWidth="3"
							className={`mx-1.25 w-3.75 text-white transition-all
								duration-200
								${theme === "dark" ? "z-2" : "z-[-1] opacity-60"}`}
						/>
						<div
							className={`absolute h-full w-6.25 self-center rounded-full
								bg-theme-card transition-all duration-200 ${
									theme === "light" ? "left-0" : "left-8.75"
								}`}
						/>
					</button>
				</div>
			)}
		</div>
	);
}
