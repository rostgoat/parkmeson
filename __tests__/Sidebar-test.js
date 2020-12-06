/**
 * @format
 */

import 'react-native'
import React from 'react'

import renderer from 'react-test-renderer'

import { Sidebar } from '../src/components/Sidebar'

// Note: test renderer must be required after react-native.

it('renders correctly', () => {
  const tree = renderer.create(<Sidebar />).toJSON()
  expect(tree).toMatchSnapshot()
})
