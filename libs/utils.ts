import clsx from "clsx";
import { twMerge } from 'tailwind-merge';
import type {ClassValue} from "class-variance-authority/types";

export const cn = (...inputs:ClassValue[]):string => {
    return twMerge(clsx(inputs));
};
