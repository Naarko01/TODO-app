import { useUserStore } from "../../store/useUserStore.js";

export default function ThemeSwitcher() {
	const { theme, changeTheme, availableThemes } = useUserStore();

	return (
		<div className='theme-switcher'>
			<select value={theme} onChange={(e) => changeTheme(e.target.value)}>
				{availableThemes.map((theme) => (
					<option key={theme} value={theme}>
						{theme.charAt(0).toUpperCase() + theme.slice(1)}
					</option>
				))}
			</select>
		</div>
	);
}
