import React, { useState } from 'react'

import { Body, Header, Title, Left, Icon, Right } from 'native-base'
import { SafeAreaView, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { Button } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { find, findByMeter } from 'api/meters'
import { Map } from 'components/Map'
import { Search } from 'components/Search'
import { Sidebar } from 'components/Sidebar'

const App = ({ navigation }) => {
  const [areas, setAreas] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [isOpen, setOpen] = useState(false)

  /**
   * Get parking data from the API.
   */
  const getAreas = async (val) => {
    try {
      setLoading(true)
      const res = await find({
        area: val !== '' ? val : 'Downtown',
        rows: 50,
      })

      setLoading(false)
      setAreas(res.records)
    } catch (error) {
      throw new Error(error)
    }
  }

  const getSingleMeter = async (code) => {
    try {
      setLoading(true)
      const res = await findByMeter({ code })
      setLoading(false)
      setAreas(res.records)
    } catch (error) {
      throw new Error(error)
    }
  }

  const onOpenHistorySideBar = () => {
    setOpen(!isOpen)
  }

  /**
   * Callback from search component.
   * @param {String} val search value
   */
  const onSearchArea = (val) => (isNaN(+val) ? getAreas(val) : getSingleMeter(val))

  return (
    <>
      <SafeAreaView keyboardShouldPersistTaps="handled" style={styles.body}>
        <Header>
          <Left>
            <Button transparent onPress={onOpenHistorySideBar}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Parkmeson</Title>
          </Body>
          <Right />
        </Header>
        <KeyboardAwareScrollView
          extraHeight={200}
          contentContainerStyle={styles.appContainer__keyboardScrollView}>
          <Map areas={areas} />
          {isOpen && <Sidebar />}
        </KeyboardAwareScrollView>
        {isLoading && (
          <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
        )}
        {!isOpen && <Search onSearchArea={onSearchArea} />}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'white',
    flex: 1,
  },
  appContainer__keyboardScrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyToggle: {
    zIndex: 110,
    position: 'absolute',
    top: 10,
    left: 10,
  },
})

export default App
