import React, { useState, createContext } from 'react'

export const MeterFavContext = createContext([])

export const MeterFavProvider = ({ children }) => {
  const [favMeters, setFavMeters] = useState([])

  return (
    <MeterFavContext.Provider value={[favMeters, setFavMeters]}>
      {children}
    </MeterFavContext.Provider>
  )
}
