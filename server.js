const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const FILE_PATH = 'data.txt';

app.post('/submit', (req, res) => {
  try {
    const { naam, email } = req.body;

    // Voeg de gegevens toe aan het bestand
    const data = `${naam}, ${email}\n`;
    fs.appendFileSync(FILE_PATH, data);

    res.status(200).send('Bedankt! We hebben je gegevens opgeslagen.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
