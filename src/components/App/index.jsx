import React, { PropTypes, Component } from 'react'
import logo from './logo.svg'
import './index.css'

function fetchProduct(id, cb) {
  return fetch(`api/product/${id}`, {
    accept: 'application/json',
  }).then(checkStatus)
    .then(response => response.json())
    .then(cb)
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(`HTTP Error ${response.statusText}`)
  error.status = response.statusText
  error.response = response
  console.log(error) // eslint-disable-line no-console
  throw error
}

class App extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  }

  static defaultProps = {
    id: null
  }

  state = {
    isLoading: true
  }

  componentDidMount() {
    fetchProduct(this.props.id, product => {
      this.setState({
        isLoading: false,
        product
      })
    })
  } 

  render () {
    const {
      isLoading,
      product
    } = this.state

    return isLoading ? null : (
      <div className="app">
        <div className="app__chunk">
          <h1>title</h1>
          <div>
            image <br />
            sub images
          </div>
        </div>
        <div className="app__chunk app__chunk--pull-right">
          price <br />
          special offers <br />
          quantity <br />
          pick up in store <br />
          add to cart <br />
          returns <br />
          add to registry <br />
          add to list <br />
          share <br />
          product highlights
        </div>
        <div className="app__chunk">
          ratings <br />
          reviews <br />
          revies
        </div>
      </div>
    )
  }
}

export default App
