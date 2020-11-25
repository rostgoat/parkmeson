import React from 'react'

import { AppRegistry } from 'react-native'

import App from './App'
import { name as appName } from './app.json'
import { MeterProvider } from './src/context/meterContext'
import { MeterFavProvider } from './src/context/meterFavContext'

const Main = () => (
  <MeterFavProvider>
    <MeterProvider>
      <App />
    </MeterProvider>
  </MeterFavProvider>
)
AppRegistry.registerComponent(appName, () => Main)
