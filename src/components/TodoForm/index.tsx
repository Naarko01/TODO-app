import { useState } from "react";
import { formatDateToInput, getTomorrowDate, dateStringToInput } from "../../utils/helpers.js";
import { useTodoStore } from "../../store/useTodoStore.js";

type BaseProps = {
	isUpdating: boolean;
	setIsUpdating: (v: boolean) => void;
	categoryId?: string | undefined;
};

type AddProps = BaseProps & { usecase: "add" };

type EditProps = BaseProps & {
	usecase: "edit";
	title: string;
	content: string;
	deadline?: string | undefined;
	id: string;
};

type TodoFormProps = AddProps | EditProps;

export default function TodoForm(props: TodoFormProps) {
	const { usecase, isUpdating, setIsUpdating } = props;
	const initialTitle = usecase === "edit" ? props.title : "";
	const initialContent = usecase === "edit" ? props.content : "";
	const initialDeadline =
		usecase === "edit" && props.deadline ?
			dateStringToInput(props.deadline)
		:	formatDateToInput(new Date());

	const [newTitle, setNewTitle] = useState<string>(initialTitle);
	const [newContent, setNewContent] = useState<string>(initialContent);
	const [newDeadline, setNewDeadline] = useState<string>(initialDeadline);
	const [error, setError] = useState<string | null>(null);
	const addTodos = useTodoStore((state) => state.addTodo);
	const updateTodos = useTodoStore((state) => state.updateTodo);

	function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		let target = e.currentTarget;
		if (target.id === "newTitle") {
			setNewTitle(target.value);
		} else if (target.id === "newContent") {
			setNewContent(target.value);
		} else if (target.id === "newDeadline") {
			setNewDeadline(target.value);
		}
	}

	function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		if (newTitle !== "" && newContent !== "") {
			switch (usecase) {
				case "add":
					addTodos({
						title: newTitle,
						content: newContent,
						categoryId: props.categoryId,
						deadline: newDeadline && new Date(newDeadline).toLocaleDateString(),
					});
					break;
				case "edit":
					updateTodos(props.id, {
						title: newTitle,
						content: newContent,
						deadline: newDeadline && new Date(newDeadline).toLocaleDateString(),
					});
					break;
			}
			setError(null);
			setIsUpdating(false);
		} else {
			setError("Vérifiez que tous les champs soient bien remplis");
		}
	}

	return (
		isUpdating && (
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-3 border-2 border-theme-border bg-theme-card2 rounded-[10px] p-4 mx-4 my-3'>
				<div className='flex flex-col gap-1'>
					<label htmlFor='newTitle' className='text-theme-text font-semibold text-sm'>
						Titre
					</label>
					<input
						type='text'
						name='newTitle'
						id='newTitle'
						value={newTitle}
						onChange={handleChange}
						required
						className='h-9 font-jetbrains text-sm rounded-lg px-3 border border-theme-border bg-theme-card text-theme-text outline-none focus:ring-2 focus:ring-theme-ring'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<label htmlFor='newContent' className='text-theme-text font-semibold text-sm'>
						Contenu
					</label>
					<input
						type='text'
						name='newContent'
						id='newContent'
						value={newContent}
						onChange={handleChange}
						required
						className='h-9 font-jetbrains text-sm rounded-lg px-3 border border-theme-border bg-theme-card text-theme-text outline-none focus:ring-2 focus:ring-theme-ring'
					/>
				</div>
				<div className='flex flex-col gap-1'>
					<label htmlFor='newDeadline' className='text-theme-text font-semibold text-sm'>
						À faire avant le:
					</label>
					<input
						type='date'
						name='newDeadline'
						id='newDeadline'
						value={newDeadline}
						min={formatDateToInput(getTomorrowDate())}
						onChange={handleChange}
						required
						className='h-9 font-jetbrains text-sm rounded-lg px-3 border border-theme-border bg-theme-card text-theme-text outline-none focus:ring-2 focus:ring-theme-ring'
					/>
				</div>
				{error && <p className='text-theme-bad text-sm'>{error}</p>}
				<div className='flex gap-3 mt-1'>
					<button
						type='submit'
						className='base-button bg-theme-good text-theme-good-fg hover:opacity-90 transition-opacity'>
						Confirmer
					</button>
					<button
						onClick={() => setIsUpdating(false)}
						className='base-button bg-theme-card text-theme-text hover:opacity-80 transition-opacity'>
						Annuler
					</button>
				</div>
			</form>
		)
	);
}
