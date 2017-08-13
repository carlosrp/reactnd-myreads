import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShelfBooks from './ShelfBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    myBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ myBooks: books })
    })
  }

  updateShelf(book, shelf) {
    // To try next:
    //   - pass all books to shelf + shelf name, then filter inside shelf
    //   - handler in App: find book and change shelf
    // Update book shelf in state.myBooks
    // idxBook = this.state.myBooks.find((this.state.myBooks, book.id) => {
    //
    // })
    BooksAPI.update(book, shelf)
    BooksAPI.getAll().then((books) => {
      this.setState({ myBooks: books })
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ShelfBooks
                  shelfTitle='Currently Reading'
                  shelfBooks={this.state.myBooks.filter((book) =>
                    book.shelf === 'currentlyReading'
                  )}
                  onShelfChange={this.updateShelf}
                />
                <ShelfBooks
                  shelfTitle='Want To Read'
                  shelfBooks={this.state.myBooks.filter((book) =>
                    book.shelf === 'wantToRead'
                  )}
                  onShelfChange={this.updateShelf}
                />
                <ShelfBooks
                  shelfTitle='Read'
                  shelfBooks={this.state.myBooks.filter((book) =>
                    book.shelf === 'read'
                  )}
                  onShelfChange={this.updateShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
