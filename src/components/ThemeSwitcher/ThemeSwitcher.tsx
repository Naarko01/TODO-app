import { useUserStore } from "../../store/useUserStore.js";
import { Moon, Sun } from "lucide-react";

type ThemeSwitchProps = { usecase: "toggle" | "select" };

export default function ThemeSwitcher({ usecase }: ThemeSwitchProps) {
	const { theme, changeTheme, availableThemes, toggleTheme } = useUserStore();

	return (
		<div className='themeSwitcher'>
			{usecase === "select" ?
				<div className='themeSwitcher-select'>
					<select value={theme} onChange={(e) => changeTheme(e.target.value)}>
						{availableThemes.map((theme) => (
							<option key={theme} value={theme}>
								{theme.charAt(0).toUpperCase() + theme.slice(1)}
							</option>
						))}
					</select>
				</div>
			:	<div className='themeSwitcher-toggle'>
					<button onClick={toggleTheme}>
						<Sun
							className={`themeIcon ${theme === "light" ? "selected" : ""}`}
							strokeWidth={"3"}
						/>
						<Moon
							className={`themeIcon dark ${theme === "dark" ? "selected" : ""}`}
							strokeWidth={"3"}
						/>
						<div className={`switch ${theme}`}></div>
					</button>
				</div>
			}
		</div>
	);
}
