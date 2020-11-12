import React from 'react'

import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Map } from 'components/Map'
const App = () => {
  return (
    <>
      <SafeAreaView keyboardShouldPersistTaps="handled" style={styles.body}>
        <KeyboardAwareScrollView
          extraHeight={200}
          contentContainerStyle={styles.appContainer__keyboardScrollView}>
          <Map />
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