import { XIcon, Maximize2Icon, Minimize2Icon, MinusIcon } from "lucide-react";
import { useWindow } from "../../app/window.js";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher.js";

type TitlebarProps = { isVisible: boolean; onMouseEnter?: () => void; onMouseLeave?: () => void };

export default function TitleBar({ isVisible, onMouseEnter, onMouseLeave }: TitlebarProps) {
	const { isWindowMaximize, toggleMaximize, toggleMinimize, closeApp } = useWindow();

	return (
		<div
			className={[
				"fixed top-0 left-0 w-full h-9 flex justify-between items-center",
				"transition-all duration-300 ease-out",
				isVisible ?
					"translate-y-0 opacity-100 pointer-events-auto bg-[color-mix(in_srgb,var(--color-text-muted)_70%,transparent)] border-b border-theme-text-muted backdrop-blur-sm z-10"
				:	"-translate-y-full opacity-0 pointer-events-none bg-transparent",
			].join(" ")}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}>
			<ThemeSwitcher usecase='toggle' />
			<div
				className='flex-1 h-full cursor-grab active:cursor-grabbing select-none'
				data-tauri-drag-region
			/>
			<div className='flex justify-end items-center gap-2 pr-2 shrink-0'>
				<button
					id='titlebar-minimize'
					title='minimize'
					onClick={toggleMinimize}
					className='cursor-pointer px-2 py-1 border-none bg-transparent text-inherit flex items-center justify-center rounded hover:bg-white/10 active:bg-white/20 transition-colors'>
					<MinusIcon />
				</button>
				<button
					id='titlebar-maximize'
					title='maximize'
					onClick={toggleMaximize}
					className='cursor-pointer px-2 py-1 border-none bg-transparent text-inherit flex items-center justify-center rounded hover:bg-white/10 active:bg-white/20 transition-colors'>
					{isWindowMaximize ?
						<Minimize2Icon />
					:	<Maximize2Icon />}
				</button>
				<button
					id='titlebar-close'
					title='close'
					onClick={closeApp}
					className='cursor-pointer px-2 py-1 border-none bg-transparent text-inherit flex items-center justify-center rounded hover:bg-white/10 active:bg-white/20 transition-colors'>
					<XIcon />
				</button>
			</div>
		</div>
	);
}
