let myLibrary = [];

function book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
  this.id = id;
}

book.prototype.changeReadStatus = function () {
  if (this.haveRead == true) {
    console.log("read")
    this.haveRead = false;
    return 'Read';
  } else {
    console.log("not read")
    this.haveRead = true;
    return "Not read."
    
  }
};

function addBookToLibrary() {
  let book_title = document.querySelector("#bkTitle").value;
  let book_author = document.querySelector("#bkAuthor").value;
  let book_num_pages = document.querySelector("#numPages").value;
  let book_read_status = document.querySelector("#readTF").value;

  let bookToAdd = new book(
    book_title,
    book_author,
    book_num_pages,
    book_read_status,
    (id = Math.random(1 * 5))
  );

  myLibrary.push(bookToAdd);
  //document.body.appendChild(bookToAdd);
  console.log(myLibrary);
}

function displayNewBookForm() {
  const bookForm = document.createElement("form");
  bookForm.innerHTML =
    '<label for="bkTitle">Book Title</label>' +
    '<input type="text" id="bkTitle" name="bkTitle">' +
    '<label for="bkAuthor">Book Author</label>' +
    '<input type="text" id="bkAuthor" name="bkAuthor">' +
    '<label for="numPages">Number Of Pages</label>' +
    '<input type="text" id="numPages" name="numPages">' +
    '<label for="readTF">Read Status (T/F):</label>' +
    '<input type="text" id="readTF" name="readTF">' +
    '<button type="submit" id="submit" >Submit</button>';

  bookForm.classList.add("book-form");
  document.body.appendChild(bookForm);

  let submitBtn = document.querySelector("#submit");

  submitBtn.onclick = (e) => {
    e.preventDefault();
    addBookToLibrary();
    document.querySelector("#bkTitle").value = "";
    document.querySelector("#bkAuthor").value = "";
    document.querySelector("#numPages").value = "";
    document.querySelector("#readTF").value = "";
  };
}

function showLibrary(lib) {
  let bookShelf = document.createElement("div");
  bookShelf.classList.add("book-shelf");

  myLibrary.forEach((currentBook) => {
    let bookDiv = document.createElement("div");
    bookDiv.classList.add("book-div");
    const removeBookBtn = document.createElement("button");
    removeBookBtn.innerHTML = "(-)";
    const readStatusBox = document.createElement("input");
    readStatusBox.setAttribute("type", "checkbox");
    const readStatusLabel = document.createElement("label");
    readStatusLabel.innerHTML = "Change read status:";

    bookDiv.innerHTML =
      "<h2>Book Title: " +
      currentBook.title +
      "</h2>" +
      "<p>Book author: " +
      currentBook.author +
      "</p>" +
      "<p>Number of Pages: " +
      currentBook.pages +
      "</p>" +
      '<p class="read-status-box">Read Status: ' +
      currentBook.haveRead +
      "</p>";
    bookDiv.appendChild(removeBookBtn);
    bookDiv.appendChild(readStatusLabel);
    bookDiv.appendChild(readStatusBox);
    bookShelf.appendChild(bookDiv);

    removeBookBtn.onclick = () => {
      bookDiv.remove();
      console.log(myLibrary);
      let filtered = myLibrary.filter((book) => book.id != currentBook.id);
      console.log(filtered);
      myLibrary = filtered;
    };

    readStatusBox.onclick = () => {
      bookDiv.innerHTML =
      "<h2>Book Title: " +
      currentBook.title +
      "</h2>" +
      "<p>Book author: " +
      currentBook.author +
      "</p>" +
      "<p>Number of Pages: " +
      currentBook.pages +
      "</p>" +
      '<p class="read-status-box">Read Status: ' +
      currentBook.changeReadStatus() +
      "</p>";

      bookDiv.appendChild(removeBookBtn);
      bookDiv.appendChild(readStatusLabel);
      bookDiv.appendChild(readStatusBox);
      bookShelf.appendChild(bookDiv);
    };

    document.body.appendChild(bookShelf);
  });
}

const addNewBookBtn = document.createElement("button");
addNewBookBtn.innerHTML = "Add New Book";
document.body.appendChild(addNewBookBtn);

addNewBookBtn.onclick = (e) => {
  e.preventDefault();
  displayNewBookForm();
};

const showLibraryBtn = document.createElement("button");
showLibraryBtn.innerHTML = "Show Library";
document.body.appendChild(showLibraryBtn);

let libraryHeader = document.createElement("h3");
libraryHeader.innerHTML = "Library:";
document.body.appendChild(libraryHeader);

showLibraryBtn.onclick = (e) => {
  e.preventDefault();
  showLibrary();
};