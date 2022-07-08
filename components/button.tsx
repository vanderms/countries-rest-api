import { useTheme } from "contexts/theme/theme-context"

export function Button() {

  const { toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>Toggle</button>
  )
} 