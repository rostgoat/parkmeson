import React, { useEffect, useCallback, useState } from 'react'

import { SafeAreaView, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { find } from 'api/meters'
import { Map } from 'components/Map'
import { Search } from 'components/Search'

const App = () => {
  const [areas, setAreas] = useState([])
  const [searchVal, setSearchVal] = useState('')
  const [isLoading, setLoading] = useState(false)

  /**
   * Get parking data from the API.
   */
  const getAreas = useCallback(async () => {
    try {
      setLoading(true)
      const res = await find({
        area: searchVal !== '' ? searchVal : 'Downtown',
        rows: 50,
      })
      setLoading(false)
      setAreas(res.records)
    } catch (error) {
      throw new Error(error)
    }
  }, [searchVal])

  useEffect(() => {
    getAreas()
  }, [getAreas])

  /**
   * Callback from search component.
   * @param {String} val search value
   */
  const onSearchArea = (val) => {
    setSearchVal(val)
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
        <Search onSearchArea={onSearchArea} />
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
