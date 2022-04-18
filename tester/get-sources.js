const fetch = require('node-fetch');
const fs = require('fs');

const url = 'https://api.watchmode.com/v1/sources/?apiKey=KUO1dToZsgx0dNipgtskygQS67F0JwsO7bPnIkPU';

fetch(url)
  .then(result => result.json())
  .then(data => {

  });
