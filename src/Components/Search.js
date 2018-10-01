import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../Utils/BooksAPI'
import Book from './Book'

class Search extends Component {

  state = {
    query: '',
    results: [],
    error: false,
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()}, this.submit);
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

    BooksAPI.search(this.state.query).then((books) => {
      if(books.error && books.error === "empty query") {
        this.setState({error: true, results: []});
      }else {
        if(this.state.results !== books) {
          this.setState({results: books});
        }
        this.setState({error: false});
      }
    });
  }

  refresh(book, shelf){
    this.setState(() => {
      var index = this.state.results.indexOf(book, 0);
      this.state.results[index].shelf = shelf;
    });
  }

  render () {

    return (
      <div className="search-books">
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
          <hr/>
          <ol className="books-grid">
            {this.state.query !== "" && this.state.results.length > 0 && this.state.results.map((book, index) => (
              <Book refresh={this.refresh.bind(this)} book={book} shelf={book.shelf} key={book.id} id={book.id} imgurl={book.imageLinks === undefined ? "" : book.imageLinks.thumbnail} title={book.title} author={book.authors} />
            ))}
          </ol>
          {this.state.error && <p>No Results...</p>}
        </div>
      </div>
    )
  }

}

export default Search
