const { v4: uuidv4 } = require('uuid');
const { authors, books } = require('../storage');

// Create a new book
const createBook = (req, res) => {
    const { authorId, bookName, ISBN } = req.body;
    const bookExists = books.find(book => book.ISBN === ISBN);
    if (bookExists) {
        return res.status(400).json({ error: 'Book already exists' });
    }
    const authorExists = authors.find(author => author.id === authorId);
    if (!authorExists) {
        return res.status(404).json({error: "Author does not exists"});
    }
    const id = uuidv4();
    const newBook = { id, authorId, bookName, ISBN };
    books.push(newBook);
    res.json(newBook);
};

// Get all books
const getAllBooks = (req, res) => {
    res.json(books);
};

// Get a single book and its author
const getBookById = (req, res) => {
    const { id } = req.params;
    const book = books.find(book => book.id === id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const author = authors.find(author => author.id === book.authorId);
    res.json({ book, author });
};

// Update a book
const updateBook = (req, res) => {
    const { id } = req.params;
    const { authorId, bookName, ISBN } = req.body;
    const book = books.find(book => book.id === id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const bookExists = books.find(book => book.ISBN === ISBN);
    if (bookExists && bookExists.id !== id) {
        return res.status(400).json({ error: 'ISBN must be unique' });
    }

    const authorExists = authors.find(author => author.id === authorId);
    if (authorExists && authorExists.id !== id) {
        return res.status(404).json({ error: 'Author not found' });
    }
    book.authorId = authorId;
    book.bookName = bookName;
    book.ISBN = ISBN;
    res.json(book);
};

// Delete a book
const deleteBook = (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const book = books[bookIndex];
    books.splice(bookIndex, 1);
    res.json(book);
};

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook
};
