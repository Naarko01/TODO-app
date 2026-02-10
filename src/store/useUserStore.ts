import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const AVAILABLE_THEMES = ["light", "dark"];
const DEFAULT_THEME = "light";

export type UserData = {
	theme: string;
	// other user options to come
};

type UserStore = UserData & {
	availableThemes: string[];
	changeTheme: (newTheme: string) => void;
	toggleTheme: () => void;
};

export const useUserStore = create<UserStore>()(
	subscribeWithSelector<UserStore>((set) => ({
		theme: DEFAULT_THEME,
		availableThemes: AVAILABLE_THEMES,

		changeTheme: (newTheme) => {
			if (AVAILABLE_THEMES.includes(newTheme)) {
				set({ theme: newTheme });
			}
		},

		toggleTheme: () => {
			set((state) => {
				const currentIndex = AVAILABLE_THEMES.indexOf(state.theme);
				const nextIndex = (currentIndex + 1) % AVAILABLE_THEMES.length;
				const newTheme = AVAILABLE_THEMES[nextIndex];
				if (newTheme !== undefined) {
					return { theme: newTheme };
				}
				return {};
			});
		},
	})),
);
