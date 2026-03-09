import { theme } from "../styles"

export const randomLabels = (): string[] => {
  const colors = theme.labelColors
  return [colors[Math.floor(Math.random() * colors.length)]]
}