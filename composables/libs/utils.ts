import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'class-variance-authority/types'
import { v4 as uuidv4 } from 'uuid';

/** tailwindを統合してくれるやつ */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

/** uuid@v4を生成する関数 */
export const createUUID = ():string => uuidv4();
