import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

const BookShelves = (props) => {

  const { shelves, books, onChangeBookShelf } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {shelves.map((shelf) => (
          <div key={shelf.id}>
            <BookShelf
              shelf={shelf}
              books={books.filter( (book) => book.shelf === shelf.id )}
              onChangeBookShelf={onChangeBookShelf}
            />
          </div>
        ))}
      </div>
      <div className="open-search">
        <Link to="/search">Add a Book</Link>
      </div>
    </div>
  )
}

BookShelves.propTypes = {
  shelves: PropTypes.array.isRequired,
  books: PropTypes.array.isRequired,
  onChangeBookShelf: PropTypes.func.isRequired
}

export default BookShelves;
