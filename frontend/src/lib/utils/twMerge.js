import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// 1. clsx: Joins strings and handles conditionals (e.g., { "hidden": !isOpen })
  // 2. twMerge: Resolves Tailwind conflicts (e.g., ensures "bg-red-500" overrides "bg-blue-500")