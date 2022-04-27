const formSubmit = document.querySelector('.submitBtn');
const { forms } = document;
const bookList = document.querySelector('.book-list');
let bookStore = [];

// add books to the broswer
function UpdateBrowser(book) {
  const bookDiv = document.createElement('div');
  bookDiv.classList.add('book-holder');
  // add book title
  const titleP = document.createElement('p');
  titleP.textContent = book.title;
  // add author
  const authorP = document.createElement('p');
  authorP.textContent = book.writter;
  // add hidden id field
  const id = document.createElement('p');
  id.setAttribute('type', 'hidden');
  id.setAttribute('value', book.id);
  //  create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Remove';
  deleteBtn.classList.add('deleteBtn');
  const line = document.createElement('hr');

  bookDiv.appendChild(titleP);
  bookDiv.appendChild(authorP);
  bookDiv.appendChild(id);
  bookDiv.appendChild(deleteBtn);
  bookDiv.appendChild(line);
  bookList.appendChild(bookDiv);
}

// add books to the bookStore array as an object
function addBook(bookTitle, bookAuthor) {
  if (bookTitle !== '' || bookAuthor !== '') {
    const book = {
      title: bookTitle,
      writter: bookAuthor,
      id: new Date().valueOf(),
    };
    bookStore.push(book);
    localStorage.setItem('books', JSON.stringify(bookStore));
    // add book to browser
    UpdateBrowser(book);
  }
}

formSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  const form = forms['book-form'];
  const fields = form.elements;
  const bookTitle = fields.title.value;
  const bookAuthor = fields.author.value;
  // clear form fields
  fields.title.value = '';
  fields.author.value = '';
  // add book to bookStore
  addBook(bookTitle, bookAuthor);
});

// update the browser with content of array
window.addEventListener('DOMContentLoaded', () => {
  const books = localStorage.getItem('books');
  if (books) {
    bookStore = JSON.parse(books);
    bookStore.forEach((book) => UpdateBrowser(book));
  }
});

// remove element from bookstore on click
bookList.addEventListener('click', (e) => {
  // check if clicked element is delete button
  const targetElement = e.target.classList[0];
  // console.log (targetBook);
  if (targetElement === 'deleteBtn') {
    // get book id
    const bookId = +e.target.parentNode.childNodes[2].getAttribute('value');
    // remove book from browser display
    bookList.removeChild(e.target.parentNode);
    // remove book from bookstore array
    bookStore.forEach((book, index) => {
      if (book.id === bookId) {
        bookStore.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(bookStore));
  }
});
