import { createContext, useContext } from 'react'

interface CommandPaletteContextValue {
  openPalette: () => void
}

export const CommandPaletteContext = createContext<CommandPaletteContextValue>({
  openPalette: () => {},
})

export function useCommandPalette() {
  return useContext(CommandPaletteContext)
}
