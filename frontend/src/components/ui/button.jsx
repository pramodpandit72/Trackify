import { cn } from "../../lib/utils/twMerge";

export default function Button({
	children,
	variant = "custom",
	className = "",
	...props
}) {
	const base =
		"px-4 py-2 rounded-md font-medium focus:outline-none focus:ring";

	const variants = {
		primary: "bg-sky-600 text-white hover:bg-sky-700",
		secondary: "bg-slate-200 text-slate-800 hover:bg-slate-300",
		ghost: "bg-transparent hover:bg-slate-100",
    custom:"",
	};

	return (
		<button
			{...props}
			// cn() will merge the classes and ensure your prop wins
			className={cn(base, variants[variant], className)}
		>
			{children}
		</button>
	);
}
