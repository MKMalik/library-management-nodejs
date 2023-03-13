const { v4: uuidv4 } = require('uuid');
let { authors, books } = require('../storage');

// Create a new author
const createAuthor = (req, res) => {
    const { name } = req.body;
    const authorExists = authors.find(author => author.name === name);
    if (authorExists) {
        return res.status(400).json({ error: 'Author already exists' });
    }
    const id = uuidv4();
    const newAuthor = { id, name };
    authors.push(newAuthor);
    res.json(newAuthor);
};

// Get all authors
const getAllAuthors = (req, res) => {
    res.json(authors);
};

// Get a single author and their books
const getAuthorById = (req, res) => {
    const { id } = req.params;
    const author = authors.find(author => author.id === id);
    if (!author) {
        return res.status(404).json({ error: 'Author not found' });
    }
    const authorBooks = books.filter(book => book.authorId === id);
    res.json({ author, books: authorBooks });
};

// Update an author
const updateAuthor = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const author = authors.find(author => author.id === id);
    if (!author) {
        return res.status(404).json({ error: 'Author not found' });
    }
    const authorExists = authors.find(author => author.name === name);
    if (authorExists && authorExists.id !== id) {
        return res.status(400).json({ error: 'Author name must be unique' });
    }
    author.name = name;
    res.json(author);
};

// Delete an author
const deleteAuthor = (req, res) => {
    const { id } = req.params;
    const authorIndex = authors.findIndex(author => author.id === id);
    if (authorIndex === -1) {
        return res.status(404).json({ error: 'Author not found' });
    }
    const authorBooks = books.filter(book => book.authorId === id);
    books = books.filter(book => book.authorId !== id);
    authors.splice(authorIndex, 1);
    res.json({ author: id, books: authorBooks });
};

module.exports = {
    createAuthor,
    getAllAuthors,
    getAuthorById,
    updateAuthor,
    deleteAuthor
};
