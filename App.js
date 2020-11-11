import React, { useEffect, useCallback, useState } from 'react'

import { SafeAreaView, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { find } from 'api/meters'
import { Map } from 'components/Map'

const App = () => {
  const [areas, setAreas] = useState([])

  /**
   * Get parking data from the API.
   */
  const getAreas = useCallback(async () => {
    try {
      const res = await find({ area: 'Downtown', rows: 1 })
      setAreas(res.records)
    } catch (error) {
      throw new Error(error)
    }
  }, [])

  useEffect(() => {
    getAreas()
  }, [getAreas])

  return (
    <>
      <SafeAreaView keyboardShouldPersistTaps="handled" style={styles.body}>
        <KeyboardAwareScrollView
          extraHeight={200}
          contentContainerStyle={styles.appContainer__keyboardScrollView}>
          {areas && areas.length > 0 && <Map areas={areas} />}
        </KeyboardAwareScrollView>
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
