import { useUserStore } from "../../store/useUserStore.js";
import { Moon, Sun } from "lucide-react";

type ThemeSwitchProps = { usecase: "toggle" | "select" };

export default function ThemeSwitcher({ usecase }: ThemeSwitchProps) {
	const { theme, changeTheme, availableThemes, toggleTheme } = useUserStore();

	return (
		<div className='ml-5'>
			{usecase === "select" ?
				<div>
					<select
						value={theme}
						onChange={(e) => changeTheme(e.target.value)}
						className='font-jetbrains text-sm rounded-md px-2 py-1 border border-theme-border bg-theme-card text-theme-text outline-none focus:ring-2 focus:ring-theme-ring'>
						{availableThemes.map((theme) => (
							<option key={theme} value={theme}>
								{theme.charAt(0).toUpperCase() + theme.slice(1)}
							</option>
						))}
					</select>
				</div>
			:	<div>
					{/* Bouton toggle avec curseur glissant */}
					<button
						onClick={toggleTheme}
						className='relative flex items-center justify-between bg-theme-secondary rounded-full border-none p-0 h-6.25 w-15 cursor-pointer'>
						<Sun
							strokeWidth='3'
							className={`w-3.75 mx-1.25 transition-all duration-200 ${
								theme === "light" ?
									"z-2 text-theme-text-on-color"
								:	"z-[-1] text-white opacity-60"
							}`}
						/>
						<Moon
							strokeWidth='3'
							className={`w-3.75 mx-1.25 text-white transition-all duration-200 ${
								theme === "dark" ? "z-2" : "z-[-1] opacity-60"
							}`}
						/>
						<div
							className={`absolute self-center w-6.25 h-full bg-theme-card rounded-full transition-all duration-200 ${
								theme === "light" ? "left-0" : "left-8.75"
							}`}
						/>
					</button>
				</div>
			}
		</div>
	);
}
