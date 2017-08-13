import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ShelfChanger extends Component {

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

    return(
      <div className="book-shelf-changer">
        <select onChange={this.changeShelf} value={book.shelf}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfChanger
