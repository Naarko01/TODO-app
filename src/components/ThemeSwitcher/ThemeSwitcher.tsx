import { useUserStore } from "../../store/useUserStore.js";

type ThemeSwitchProps = { usecase: "toggle" | "select" };

export default function ThemeSwitcher({ usecase }: ThemeSwitchProps) {
	const { theme, changeTheme, availableThemes, toggleTheme } = useUserStore();

	return usecase === "select" ?
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
				<button onClick={toggleTheme}>{theme.charAt(0).toUpperCase() + theme.slice(1)}</button>
			</div>;
}
