/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react'

import { Button } from 'native-base'
import { StyleSheet, View, Text, SectionList } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'

import { MeterContext } from '../../context/meterContext'
import { MeterFavContext } from '../../context/meterFavContext'

const Map = ({ areas }) => {
  const [meters, setMeters] = useContext(MeterContext)
  const [favMeters, setFavMeters] = useContext(MeterFavContext)

  /**
   * Set favorite markers data to state when marker is clicked
   * @param {Event} e event
   */
  const onChooseFavorite = (e) => {
    const { longitude, latitude } = e.nativeEvent.coordinate

    let payByPhoneId
    let chosenArea
    areas.forEach((area) => {
      if (area.fields.geom.coordinates[0] === longitude) {
        payByPhoneId = area.fields.pay_phone
        chosenArea = area.fields.geo_local_area
      }
    })

    const foundMeter = favMeters.filter((meter) => meter.id === payByPhoneId)
    if (foundMeter && foundMeter.length === 1) {
      const updatedMeter = {
        id: payByPhoneId,
        area: chosenArea,
      }

      const tempMeters = favMeters
      tempMeters[
        tempMeters.findIndex((el) => el.id === updatedMeter.id)
      ] = updatedMeter

      setFavMeters((oldMeters) => [...oldMeters, ...tempMeters])
    } else {
      setFavMeters((oldMeters) => [
        ...oldMeters,
        { id: payByPhoneId, area: chosenArea },
      ])
    }
  }
  /**
   * Add marker data to state when marker is clicked
   * @param {Event} e event
   */
  const onMarkerPress = async (e) => {
    const { longitude, latitude } = e.nativeEvent.coordinate

    let payByPhoneId
    let chosenArea
    areas.forEach((area) => {
      if (area.fields.geom.coordinates[0] === longitude) {
        payByPhoneId = area.fields.pay_phone
        chosenArea = area.fields.geo_local_area
      }
    })

    const foundMeter = meters.filter((meter) => meter.id === payByPhoneId)
    if (foundMeter && foundMeter.length === 1) {
      const updatedMeter = {
        id: payByPhoneId,
        count: foundMeter[0].count + 1,
        area: chosenArea,
      }

      const tempMeters = meters
      tempMeters[
        tempMeters.findIndex((el) => el.id === updatedMeter.id)
      ] = updatedMeter

      setMeters((oldMeters) => [...oldMeters, ...tempMeters])
    } else {
      setMeters((oldMeters) => [
        ...oldMeters,
        { id: payByPhoneId, count: 1, area: chosenArea },
      ])
    }
  }
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude:
          areas && areas.length === 0
            ? 49.278981829564074
            : areas[0].fields.geom.coordinates[1],
        longitude:
          areas && areas.length === 0
            ? -123.11776621538205
            : areas[0].fields.geom.coordinates[0],
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {areas &&
        areas.length > 0 &&
        areas.map((loc) => (
          <Marker
            onPress={(e) => onMarkerPress(e)}
            key={loc.recordid}
            coordinate={{
              latitude: loc.fields.geom.coordinates[1],
              longitude: loc.fields.geom.coordinates[0],
            }}>
            <Callout onPress={(e) => onChooseFavorite(e)}>
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
                <Button success style={{ width: '100%', color: 'white' }}>
                  <Text>Favorite</Text>
                </Button>
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
