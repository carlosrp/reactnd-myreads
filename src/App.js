import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ShelfBooks from './ShelfBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    myBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ myBooks: books })
    })
  }

  updateShelf = (book, shelf) => {

    // Find book in list and update or remove from shelf
    const books = this.state.myBooks
    let idxElem = books.findIndex((elem) => {
      return elem.id === book.id
    })
    //console.log('Updating shelf for', book.title, shelf, idxElem)
    // If book not found (comes from  search), add it to my books;
    // if found, then just change shelf (or remove if no shelf)
    if( idxElem === -1 ) {
      // Add shelf property
      book['shelf'] = shelf
      books.push(book)
    } else {
      if( shelf !== 'noshelf') {
        // Move book in my shelves
        books[idxElem].shelf = shelf
      } else { // 'noshelf'
        // Remove from my books
        books.splice(idxElem, 1)
      }
    }

    // Update array of my books
    this.setState({myBooks: books})

    // Update book shelf in backend
    if(shelf !== 'noshelf') {
      BooksAPI.update(book, shelf)
    } else {
      BooksAPI.update(book, 'none')
    }
    //this.forceUpdate()
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ShelfBooks
                  shelfTitle='Currently Reading'
                  shelfName='currentlyReading'
                  myBooks={this.state.myBooks}
                  onShelfChange={this.updateShelf}
                />
                <ShelfBooks
                  shelfTitle='Want To Read'
                  shelfName='wantToRead'
                  myBooks={this.state.myBooks}
                  onShelfChange={this.updateShelf}
                />
                <ShelfBooks
                  shelfTitle='Read'
                  shelfName='read'
                  myBooks={this.state.myBooks}
                  onShelfChange={this.updateShelf}
                />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
        <Route path="/search" render={() => (
          <SearchBooks
            myBooks={this.state.myBooks}
            onShelfChange={this.updateShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
