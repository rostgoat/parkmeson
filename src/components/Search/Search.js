import React, { useState } from 'react'

import { SearchBar } from 'react-native-elements'

const Search = (props) => {
  const [search, setSearch] = useState()

  const updateSearch = (text) => {
    props.updateSearch(text)
    setSearch(text)
  }

  return (
    <SearchBar
      placeholder="Where do you need parking?"
      onChangeText={updateSearch}
      value={search}
    />
  )
}

export default Search
