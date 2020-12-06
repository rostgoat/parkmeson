/**
 * @format
 */

import 'react-native'
import React from 'react'

import renderer from 'react-test-renderer'

import { Search } from '../src/components/Search'

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  const tree = renderer.create(<Search />).toJSON()
  expect(tree).toMatchSnapshot()
})
