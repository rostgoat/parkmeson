module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-button|native-base-.*|react-native-.*|react-navigation-*|@codler/react-native-keyboard-aware-scroll-view)/)',
  ],
  transform: {
    '^.+\\.js?$': 'babel-jest',
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  moduleDirectories: ['node_modules', 'src/node_modules'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleNameMapper: {
    ky: 'ky/umd',
    '\\.(css|less|scss|sass|svg)$': 'identity-obj-proxy',
  },
  resetMocks: true,
  testEnvironment: 'jsdom',
  timers: 'fake',
}
