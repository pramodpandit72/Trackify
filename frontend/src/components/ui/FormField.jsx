import React from "react";
import { cn } from "../../lib/utils/twMerge";

function FormField({ id, label, errors, type = "text", className = "", ...props }) {
	return (
		<div className="flex flex-col gap-3 my-2">
			<label htmlFor={id} className="ml-1">{label}</label>
			<div className="flex flex-col gap-1">
				<input
					{...props}
					type={type}
					id={id}
					className={cn(
						`w-full bg-blue-100/70 font-light text-black border outline-none border-white focus:border-indigo-700 hover:border-blue-500 rounded-sm p-2 ${errors[id] ? "border-red-500": ""}`,
						className,
					)}
				/>

				{errors && errors[id] && (
					<p className="text-sm ml-1 text-red-600">
						{errors[id]?.message}
					</p>
				)}
			</div>
		</div>
	);
}

export default FormField;
