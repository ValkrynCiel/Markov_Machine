const fs = require('fs');
const process = require('process');
const axios = require('axios');
const MM = require('./markov');


/** read file at path and print it out. */

function cat(path) {
  fs.readFile(path, 'utf8', function(err, data) {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      console.log(new MM(data).makeText());
    }
  });
}

/** read page at URL and print it out. */

async function webCat(url) {
  try {
    let resp = await axios.get(url);
    console.log(new MM(resp.data).makeText());
  } catch (err) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let path = process.argv[3];

if (process.argv[2] === 'url') {
  webCat(path);
} else {
  cat(path);
}
