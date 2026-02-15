import { XIcon, Maximize2Icon, Minimize2Icon, MinusIcon } from "lucide-react";
import { useWindow } from "../../app/window.js";
import { useState } from "react";

type TitlebarProps = { isVisible: boolean; onMouseEnter?: () => void; onMouseLeave?: () => void };

export default function TitleBar({ isVisible, onMouseEnter, onMouseLeave }: TitlebarProps) {
	const { isWindowMaximize, toggleMaximize, toggleMinimize, closeApp } = useWindow();

	return (
		<div
			className={`titlebar ${isVisible ? "visible" : "hidden"}`}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}>
			<div className='drag-area' data-tauri-drag-region></div>
			<div className='controls'>
				<button id='titlebar-minimize' title='minimize' onClick={toggleMinimize}>
					<MinusIcon />
				</button>
				<button id='titlebar-maximize' title='maximize' onClick={toggleMaximize}>
					{isWindowMaximize ?
						<Minimize2Icon />
					:	<Maximize2Icon />}
				</button>
				<button id='titlebar-close' title='close' onClick={closeApp}>
					<XIcon />
				</button>
			</div>
		</div>
	);
}
