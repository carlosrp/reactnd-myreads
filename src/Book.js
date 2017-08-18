import React, { Component } from 'react'
//import ShelfChanger from './ShelfChanger'
import PropTypes from 'prop-types'

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  changeShelf = (event) => {
    //event.preventDefault()
    this.props.onShelfChange(this.props.book, event.target.value)
  }

  render() {
    const { book } = this.props

    // No shelf returned in search
    let shelf = (book.shelf) ? book.shelf : 'noshelf'
    // Some books don't have authors
    let authors = (book.authors) ? book.authors : []

    return(
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
              <div className="book-shelf-changer">
                <select onChange={this.changeShelf} value={shelf}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="noshelf">None</option>
                </select>
              </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{authors.join(", ")}</div>
        </div>
      </li>
    )
  }

}

export default Book
