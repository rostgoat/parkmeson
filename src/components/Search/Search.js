import React, { useState } from 'react'

import { SearchBar } from 'react-native-elements'

const Search = ({ onSearchArea }) => {
  const [search, setSearch] = useState()

  return (
    <SearchBar
      placeholder="Where do you need parking?"
      onChangeText={setSearch}
      value={search}
      onSubmitEditing={() => onSearchArea(search)}
    />
  )
}

export default Search
