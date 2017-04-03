import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './index.jsx'

// todo: repeat for all files
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App id="1234" />, div)
})
