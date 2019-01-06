import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';
import { DebounceInput } from 'react-debounce-input';

class Search extends Component {

  state = {
    books: []
  }

  static propTypes = {
    onChangeBookShelf: PropTypes.func.isRequired,
    shelfBooks: PropTypes.array.isRequired
  };

  searchBooks = (query) => {
    const{ shelfBooks } = this.props;

    if(query) {
      BooksAPI.search(query).then( (searchResp) => {
        if(searchResp.length > 0){

          const booksResults = searchResp.map( (searchBook) => {
            const found = shelfBooks.find( (shelfBook) =>
              shelfBook.id === searchBook.id
            );
            searchBook.shelf = found ? found.shelf : 'none';
            return searchBook;
          }); //Go through search results, match book state with state in our existing shelf, if it is there already.

          const booksResultsWithImages = booksResults.filter(book => book.imageLinks); //Filter out books without images

          this.setState({books:booksResultsWithImages});
        } else {
          this.setState({books:[]});
        }
      });
    } else {
      this.setState({books:[]});
    }
  };

  render() {

    const {onChangeBookShelf} = this.props;
    const {books} = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >Close></Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              placeholder="Search by Title or Author..."
              debounceTimeout={500}
              onChange={(event) => this.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.length > 0 && books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  onChangeBookShelf={onChangeBookShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default Search
