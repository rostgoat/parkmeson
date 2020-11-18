import React, { useEffect, useCallback, useState } from 'react'

import { SafeAreaView, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { find } from 'api/meters'
import { Map } from 'components/Map'
import { Search } from 'components/Search'

const App = () => {
  const [areas, setAreas] = useState([])
  const [searchVal, setSearchVal] = useState('')

  /**
   * Get parking data from the API.
   */
  const getAreas = useCallback(async () => {
    try {
      const res = await find({
        area: searchVal !== '' ? searchVal : 'Downtown',
        rows: 50,
      })
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
})

export default App
