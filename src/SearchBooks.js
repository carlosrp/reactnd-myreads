import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import './App.css'

class SearchBooks extends Component {

  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
  }

  state = {
    foundBooks: [],
    searchQuery: ''
  }

  componentDidMount() {
    this.setState({ searchQuery: '' })
  }

  updateSearch = (query) => {
    this.setState({ searchQuery: query.trim() })
    BooksAPI.search(this.state.searchQuery, 20).then((books) => {
      if(books && books.length > 0) {
        let notInMyBooks = books.filter((foundBook) => {
          //return true if book is not found in myBooks
          return (this.props.myBooks.findIndex((myBook) => {
            return myBook.id === foundBook.id
          }) < 0)
        })
        this.setState({ foundBooks: notInMyBooks })
      }
    })
  }

  updateBookShelfInSearch = (book,shelf) => {
    // Remove from foundBooks, to update view
    const books = this.state.foundBooks
    let idxElem = books.findIndex((elem) => {
      return elem.id === book.id
    })
    if( idxElem >  -1) {
      books.splice(idxElem, 1)
      this.setState({ foundBooks: books })
    }
    // Update shelf in myBooks in App
    this.props.onShelfChange(book, shelf)
  }

  render() {
    //const { onShelfChange } = this.props
    const { foundBooks, searchQuery  } = this.state

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchQuery}
              onChange={(event) => this.updateSearch(event.target.value)}/>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {foundBooks.map((book) => (
                  <Book key={book.id} book={book} onShelfChange={this.updateBookShelfInSearch} />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks
