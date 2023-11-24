const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('mailchimp-api-v3');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const API_KEY = '7ae644e2d66d39a3ee681fbe7620ef19-us9';
const LIST_ID = '07d3345807';

app.post('/submit', async (req, res) => {
  try {
    const { naam, email } = req.body;

    // Configureer Mailchimp
    const mailchimpClient = new mailchimp(API_KEY);

    // Voeg de abonnee toe aan de Mailchimp-lijst
    const response = await mailchimpClient.post(`/lists/${LIST_ID}/members`, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: naam
      }
    });

    console.log(response);

    res.status(200).send('Bedankt! We hebben je gegevens goed ontvangen. Succes met de winactie!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
