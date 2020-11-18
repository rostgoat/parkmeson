import React, { useEffect, useCallback, useState } from 'react'

import { SafeAreaView, StyleSheet } from 'react-native'
import { ActivityIndicator, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { find } from 'api/meters'
import { Map } from 'components/Map'
import { Search } from 'components/Search'
import { default as availableAreas } from 'data/areas'

const App = () => {
  const [areas, setAreas] = useState([])
  const [search, setSearch] = useState('Downtown')
  const [isLoading, setLoading] = useState(false)

  /**
   * Get parking data from the API.
   */
  const getAreas = useCallback(async () => {
    try {
      setLoading(true)
      const res = await find({ area: search, rows: 100 })
      setLoading(false)
      setAreas(res.records)
    } catch (error) {
      throw new Error(error)
    }
  }, [search])

  useEffect(() => {
    getAreas()
  }, [getAreas])

  const newSearch = (input) => {
    if (availableAreas.includes(input)) {
      setSearch(input)
    }
  }

  return (
    <>
      <SafeAreaView keyboardShouldPersistTaps="handled" style={styles.body}>
        <KeyboardAwareScrollView
          extraHeight={200}
          contentContainerStyle={styles.appContainer__keyboardScrollView}>
          {areas && areas.length > 0 && <Map areas={areas} />}
        </KeyboardAwareScrollView>
        {isLoading && (
          <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
        )}
        <Search updateSearch={(value) => newSearch(value)} />
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
})

export default App
