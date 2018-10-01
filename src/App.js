import React, { Component } from 'react'
// import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import Initial from './Components/Initial.js'
import Search from './Components/Search.js'
import './App.css'

class App extends Component {

  render() {
    return (
      <div className="app">
      <Route exact path="/" render={({ history }) => (
        <Initial />
      )}/>

      <Route exact path="/search" render={({ history }) => (
        <Search />
      )}/>
      </div>
    )
  }
}

export default App
