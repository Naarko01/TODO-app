import { XIcon, Maximize2Icon, Minimize2Icon, MinusIcon } from "lucide-react";
import { useWindow } from "../../app/window.js";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.js";

type TitlebarProps = {
	isVisible: boolean;
	onMouseEnter?: () => void;
	onMouseLeave?: () => void;
};

export default function TitleBar({
	isVisible,
	onMouseEnter,
	onMouseLeave,
}: TitlebarProps) {
	const { isWindowMaximize, toggleMaximize, toggleMinimize, closeApp } =
		useWindow();

	return (
		<div
			className={[
				"fixed top-0 left-0 flex h-9 w-full items-center justify-between",
				"transition-all duration-300 ease-out",
				isVisible
					? "pointer-events-auto z-10 translate-y-0 border-b border-theme-text-muted bg-[color-mix(in_srgb,var(--color-text-muted)_70%,transparent)] opacity-100 backdrop-blur-sm"
					: "pointer-events-none -translate-y-full bg-transparent opacity-0",
			].join(" ")}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<ThemeSwitcher usecase="toggle" />
			<div
				className="h-full flex-1 cursor-grab select-none
					active:cursor-grabbing"
				data-tauri-drag-region
			/>
			<div className="flex shrink-0 items-center justify-end gap-2 pr-2">
				<button
					id="titlebar-minimize"
					title="minimize"
					onClick={toggleMinimize}
					className="flex cursor-pointer items-center justify-center
						rounded border-none bg-transparent px-2 py-1 text-inherit
						transition-colors hover:bg-white/10 active:bg-white/20"
				>
					<MinusIcon />
				</button>
				<button
					id="titlebar-maximize"
					title="maximize"
					onClick={toggleMaximize}
					className="flex cursor-pointer items-center justify-center
						rounded border-none bg-transparent px-2 py-1 text-inherit
						transition-colors hover:bg-white/10 active:bg-white/20"
				>
					{isWindowMaximize ? <Minimize2Icon /> : <Maximize2Icon />}
				</button>
				<button
					id="titlebar-close"
					title="close"
					onClick={closeApp}
					className="flex cursor-pointer items-center justify-center
						rounded border-none bg-transparent px-2 py-1 text-inherit
						transition-colors hover:bg-white/10 active:bg-white/20"
				>
					<XIcon />
				</button>
			</div>
		</div>
	);
}
