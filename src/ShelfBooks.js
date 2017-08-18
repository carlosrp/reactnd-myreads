import React, { Component } from 'react'
import Book from './Book'
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
              <Book key={book.id} book={book} onShelfChange={onShelfChange} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default ShelfBooks
