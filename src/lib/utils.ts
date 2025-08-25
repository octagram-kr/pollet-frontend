import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind 클래스명을 조건부로 합치고, 중복된 클래스는 덮어씌우기
 */
export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return twMerge(clsx(inputs))
}
