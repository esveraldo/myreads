import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../Utils/BooksAPI'
import Book from './Book'
import PopMSG from '../Utils/PopMSG'
import shelfs from '../Utils/Shelfs'

class Search extends Component {

  state = {
    query: '',
    results: [],
    none: [],
    error: false,
    shelf: '',
    popmsg: '',
    popmsgdisplay: 'none',
    showLoading: 'none'
  }

  showPopMSG(text){
    this.setState({
      popmsg: text,
      popmsgdisplay: 'block'
    }, () => {
      setTimeout(() => {
        this.setState({
          popmsg: '',
          popmsgdisplay: 'none'
        });
      } , 2000);
    })
  }

  updateQuery = (query) => {
    this.setState(
      {query: query}, this.submit);
  }

  clearQuery = (query) => {
    this.setState({query: ''});
  }

  clearResults = (query) => {
    this.setState({results: []});
  }

  submit() {
    if(this.state.query === '' || this.state.query === undefined || this.state.query === null) {
      this.setState({results : [], query : '', error : false});
      return;
    }

    this.setState({showLoading: "block"});

    BooksAPI.getAll().then((books) => {
      shelf: books
    });

    BooksAPI.search(this.state.query).then((books) => {
      if(books.error && books.error === "empty query") {
        this.setState({error: true, results: []});
      }else {
        if(this.state.results !== books) {
          this.setState({results: books, shelf: books});
        }
        this.setState({showLoading: "none", error: false});
      }
    });
  }

  refresh(book, index){
    this.setState({index: this.state.results.indexOf(book, 0)});
  }

  render () {

    return (
      <div className="search-books">
        <PopMSG display={this.state.popmsgdisplay} text={this.state.popmsg}/>
          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}

              <input type="text" placeholder="Search by title or author" value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
        <img alt="loading gif" className="middlr bottom-side" style={{width: "175px", display: this.state.showLoading}} src="./Loading_icon.gif"/>
          <hr/>
          <ol className="books-grid">
            {this.state.query !== "" && this.state.results.length > 0 && this.state.results.map((book, index) => (
              <Book refresh={this.refresh.bind(this)} showPopMSG={this.showPopMSG.bind(this)} book={book} shelf={book.shelf} key={book.id} id={book.id} imgurl={book.imageLinks === undefined ? "" : book.imageLinks.thumbnail} title={book.title} author={book.authors} />
            ))}
          </ol>
          {this.state.error && <p>No Results...</p>}
        </div>
      </div>
    )
  }
}

export default Search
