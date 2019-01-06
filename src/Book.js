import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  };

  state = {
    showInfo: false
  }

  closeBookDescription = () => {
    this.setState({showInfo: false});
  };

  showBookDescription = (e) => {
    e.preventDefault();
    this.setState({showInfo:true});
  };

  componentDidMount(){
    Modal.setAppElement('body');
  };

  render() {

    const {book, onChangeBookShelf} = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf ? book.shelf : "none"} onChange={(event) => onChangeBookShelf(book, event.target.value)}>
              <option value="moveTo" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
        <div className="book-info">
          <button onClick={(event) => this.showBookDescription(event)}>Description</button>
        </div>
        {this.state.showInfo && (
          <Modal
            isOpen={this.state.showInfo}
            onRequestClose={this.closeBookDescription}
            shouldCloseOnOverlayClick={true}
            className={'book-modal'}
            overlayClassName={'book-modal-overlay'}
            contentLabel="Book Description"
          >
            <div className="book-info-modal">
              <h1>{book.title}</h1>
              <h2>{book.subtitle}</h2>
              <p>Published: {book.publishedDate} by {book.publisher} </p>
              <p>Pages: {book.pageCount}</p>
              <p>Authors: {book.authors}</p>
              <p>{book.description}</p>
            </div>
          </Modal>
        )}
      </div>
    )
  }
}

export default Book;
