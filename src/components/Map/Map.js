import React from 'react'

import { StyleSheet, View, Text, SectionList } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { Callout } from 'react-native-maps'

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
      {areas &&
        areas.length > 0 &&
        areas.map((loc) => (
          <Marker
            key={loc.recordid}
            coordinate={{
              latitude: loc.fields.geom.coordinates[1],
              longitude: loc.fields.geom.coordinates[0],
            }}>
            <Callout>
              <View style={styles.callout}>
                <Text>
                  Pay by Phone: {loc.fields.pay_phone}
                  {'\n'}
                </Text>
                <Text style={{ fontSize: 18 }}>Hourly Rates</Text>
                <SectionList
                  sections={[
                    {
                      title: 'Monday-Friday',
                      data: [
                        `9am - 6pm: ${loc.fields.r_mf_9a_6p}`,
                        `6pm - 10pm: ${loc.fields.r_mf_6p_10}`,
                      ],
                    },
                    {
                      title: 'Saturday',
                      data: [
                        `9am - 6pm: ${loc.fields.r_sa_9a_6p}`,
                        `6pm - 10pm: ${loc.fields.r_sa_6p_10}`,
                      ],
                    },
                    {
                      title: 'Sunday',
                      data: [
                        `9am - 6pm: ${loc.fields.r_su_9a_6p}`,
                        `6pm - 10pm: ${loc.fields.r_su_6p_10}`,
                      ],
                    },
                  ]}
                  renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                  renderSectionHeader={({ section }) => (
                    <Text style={styles.sectionHeader}>{section.title}</Text>
                  )}
                  keyExtractor={(item, index) => index}
                />
              </View>
            </Callout>
          </Marker>
        ))}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  callout: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 3,
    fontSize: 18,
  },
})

export default Map
