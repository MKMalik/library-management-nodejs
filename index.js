const { log } = require('console');
const express = require('express');
const fs = require('fs');
const app = express();

// Import author and book controllers
const authorController = require('./controllers/author');
const bookController = require('./controllers/book');

// Body parsing middleware
app.use(express.json());

// Logging middleware
const logRequests = (req, res, next) => {
    let log = `${req.method} request received at ${new Date()}\n`;
    log += `URL: ${req.url}\n`;
    log += `Body: ${JSON.stringify(req.body)}\n`;
    log += '--------------------------------\n'
    fs.appendFile('request.log', log, (err) => {
        if (err) {
            console.error(err);
        }
    });
    next();
}
app.use(logRequests);

// Author endpoints
app.post('/author', authorController.createAuthor);
app.get('/author', authorController.getAllAuthors);
app.get('/author/:id', authorController.getAuthorById);
app.patch('/author/:id', authorController.updateAuthor);
app.delete('/author/:id', authorController.deleteAuthor);

// Book endpoints
app.post('/book', bookController.createBook);
app.get('/book', bookController.getAllBooks);
app.get('/book/:id', bookController.getBookById);
app.patch('/book/:id', bookController.updateBook);
app.delete('/book/:id', bookController.deleteBook);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
