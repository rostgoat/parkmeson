import React, { useContext, useState } from 'react'

import { Button, Text, Container, List, ListItem } from 'native-base'
import { StyleSheet, View, ScrollView } from 'react-native'

import { MeterContext } from '../../context/meterContext'
import { MeterFavContext } from '../../context/meterFavContext'

const MetersList = ({ meters, fav }) => {
  let tempMeters = []
  if (fav) {
    tempMeters = meters
  } else {
    tempMeters = meters.sort((a, b) => a.count - b.count)
  }

  return (
    <List>
      <ListItem itemHeader first>
        <Text>Pay By Phone</Text>
        {fav && <Text style={styles.countText}>Visits</Text>}
        <Text style={styles.countText}>Area</Text>
      </ListItem>
      {meters &&
        meters.length > 0 &&
        tempMeters.map((meter, index) => (
          <ListItem key={index}>
            <Text>{meter.id}</Text>
            {fav && <Text style={styles.count}>{meter.count}</Text>}
            <Text style={styles.area}>{meter.area}</Text>
          </ListItem>
        ))}
    </List>
  )
}
const Sidebar = () => {
  const [meters] = useContext(MeterContext)
  const [favMeters] = useContext(MeterFavContext)
  const [showFav, setShowFav] = useState(false)
  return (
    <Container style={styles.container}>
      <View style={styles.innerContainerButtons}>
        <Button rounded onPress={() => setShowFav(false)}>
          <Text>Most Used</Text>
        </Button>
        <Button rounded success onPress={() => setShowFav(true)}>
          <Text>Favorites</Text>
        </Button>
      </View>
      <ScrollView style={styles.innerContainerMeters}>
        {showFav && favMeters && favMeters.length > 0 && (
          <MetersList meters={favMeters} />
        )}
        {!showFav && meters && meters.length > 0 && (
          <MetersList meters={meters} fav={true} />
        )}
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
    paddingTop: 30,
  },
  innerContainerButtons: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 30,
    paddingRight: 30,
  },
  innerContainerMeters: {
    padding: 20,
  },
  count: {
    marginLeft: 70,
  },
  area: {
    marginLeft: 50,
  },
  countText: {
    marginLeft: 30,
  },
})

export default Sidebar
