import React, { useState } from 'react'

import { SearchBar } from 'react-native-elements'

const Search = () => {
  const [search, updateSearch] = useState()

  return (
    <SearchBar
      placeholder="Where do you need parking?"
      onChangeText={updateSearch}
      value={search}
    />
  )
}

export default Search
