import { createContext, useContext, useState } from 'react'

interface InfoContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
}

const InfoContext = createContext<InfoContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export function InfoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <InfoContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </InfoContext.Provider>
  )
}

export const useInfo = () => useContext(InfoContext)
