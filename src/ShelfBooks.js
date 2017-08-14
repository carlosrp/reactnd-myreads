import React, { Component } from 'react'
import ShelfChanger from './ShelfChanger'
import PropTypes from 'prop-types'

class ShelfBooks extends Component {

  static propTypes = {
    shelfName: PropTypes.string.isRequired,
    shelfTitle: PropTypes.string.isRequired,
    myBooks: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { shelfTitle, shelfName, myBooks, onShelfChange } = this.props
    const shelfBooks = myBooks.filter((book) => book.shelf === shelfName)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelfBooks.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    <ShelfChanger book={book} onShelfChange={onShelfChange}/>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors.join(", ")}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default ShelfBooks
