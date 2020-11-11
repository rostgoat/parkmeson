import React from 'react'

import { StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

const Map = ({ areas }) => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: areas[0].fields.geom.coordinates[1],
        longitude: areas[0].fields.geom.coordinates[0],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      <Marker
        coordinate={{
          latitude: areas[0].fields.geom.coordinates[1],
          longitude: areas[0].fields.geom.coordinates[0],
        }}
        title={areas[0].fields.geo_local_area}
        description={areas[0].fields.geo_local_area}
      />
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default Map
