const formSubmit = document.querySelector('.submitBtn');
const forms = document.forms;
const bookList = document.querySelector('.book-list');
let bookStore = [];


// add books to the bookStore array as an object
function addBook(bookTitle, bookAuthor) {
  if(bookTitle === '' || bookAuthor === '') {
    console.log('Fill in all fields')
  }else {
    const book = {
      title: bookTitle,
      writter: bookAuthor,
      id: new Date().valueOf()
    }
    bookStore.push(book);
    localStorage.setItem('books', JSON.stringify(bookStore));
    // add book to browser
    UpdateBrowser(book)
  }
}