import React, { useState, createContext } from 'react'

export const MeterContext = createContext([])

export const MeterProvider = ({ children }) => {
  const [meters, setMeters] = useState([])

  return (
    <MeterContext.Provider value={[meters, setMeters]}>
      {children}
    </MeterContext.Provider>
  )
}
