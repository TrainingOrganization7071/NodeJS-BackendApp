//https://www.abibliadigital.com.br/api/books

const express = require('express');
const axios = require('axios'); // Import axios for making HTTP requests
var cors = require('cors')

const app = express();
const port = 3001;


app.use(cors())



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})


var apiURL = "https://www.abibliadigital.com.br/api/books"


app.get('/', (req, res) => {
    res.send('Hello, world ---!');
});

// Fetch all books from the external API
app.get('/books', async (req, res) => {
  try {
    const response = await axios.get(apiURL);
    const books = response.data; // Extract data from the response
    res.json(books); // Send the books data as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching books data');
  }
});

// Retrieve a specific book by ID (using book abbreviations as ID)
app.get('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const response = await axios.get(apiUrl);
    const books = response.data;
    const book = books.find(b => b.abbrev.pt === bookId || b.abbrev.en === bookId);

    if (book) {
      res.json(book);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving book data');
  }
});

app.get('/apitodb', (req, res) => {
  res.send('========================-API-To-DB-=========================');
});

// Create a new book (simulating, as this external API likely won't allow creation)
app.post('/books', (req, res) => {
  const newBook = req.body; // Get the book details from the request body
  // Simulate adding the book to the database
  console.log('New book created:', newBook);
  res.status(201).send('Book created successfully (simulated)');
});

// Update a specific book by ID (simulating update since external API won't allow it)
app.put('/books/:id', async (req, res) => {
  const bookId = req.params.id;
  const updatedBookData = req.body;

  try {
    const response = await axios.get(apiUrl);
    const books = response.data;
    const bookIndex = books.findIndex(b => b.abbrev.pt === bookId || b.abbrev.en === bookId);

    if (bookIndex !== -1) {
      // Simulate updating the book data
      books[bookIndex] = { ...books[bookIndex], ...updatedBookData };
      console.log(`Book with ID ${bookId} updated to:`, books[bookIndex]);
      res.send(`Book with ID ${bookId} updated successfully (simulated)`);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating book data');
  }
});

// Delete a specific book by ID (simulating deletion since external API won't allow it)
app.delete('/books/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const response = await axios.get(apiUrl);
    const books = response.data;
    const bookIndex = books.findIndex(b => b.abbrev.pt === bookId || b.abbrev.en === bookId);

    if (bookIndex !== -1) {
      // Simulate deleting the book
      const deletedBook = books[bookIndex];
      books.splice(bookIndex, 1);
      console.log(`Book with ID ${bookId} deleted:`, deletedBook);
      res.send(`Book with ID ${bookId} deleted successfully (simulated)`);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting book');
  }
});



//------------------------CosmosDB-Commmunication--------------------








