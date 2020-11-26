import React from 'react'

import { AppRegistry, LogBox } from 'react-native'

import App from './App'
import { name as appName } from './app.json'
import { MeterProvider } from './src/context/meterContext'
import { MeterFavProvider } from './src/context/meterFavContext'

/**
 * ! COMMENT THIS LINE TO REMOVE YELLOW WARNING
 */
LogBox.ignoreAllLogs(true)
const Main = () => (
  <MeterFavProvider>
    <MeterProvider>
      <App />
    </MeterProvider>
  </MeterFavProvider>
)
AppRegistry.registerComponent(appName, () => Main)
