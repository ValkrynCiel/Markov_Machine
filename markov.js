/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *  ["the", "cat", "in", the", hat]
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // iterate through this.words, such that i is set to key and i+1 is pushed into list of words
    let markovChains = {};
    let words = this.words;

    for (let i = 0; i < words.length; i++){
    
      // if there is no value set, create array, else push word into array
      if (markovChains[words[i]]){

        markovChains[words[i]].push(words[i+1]);
        
      } else {

        markovChains[words[i]] = [];
        markovChains[words[i]].push(words[i+1]);
        
      }
      // markovChains[words[i]] = markovChains[words[i]] ? markovChains[words[i]].push(words[i+1]) : new Array().push(words[i])
      
    }
    return markovChains;
    // console.log(markovChains);
  }

  /** return random text from chains */

  makeText(numWords = 100) {

    // call markovChains and create a keys array
    let markovObj = this.makeChains();
    let markovKeys = Object.keys(markovObj);

    // picking a random key from Keys array.
    let keysIdx = Math.floor(Math.random() * markovKeys.length);
    let key = markovKeys[keysIdx];
    
    // adding the value of the random key to the outSt
    let outStr = `${key}`;

    for (let i=1; i<numWords; i++) {
      
      // make a random call on the random-key value array
      let valuesIdx = Math.floor(Math.random() * markovObj[key].length);
      let value = markovObj[key][valuesIdx];
      if (!value){
        break;
      }
      outStr += ` ${value}`;
      key = value; 
    } return outStr;
  }
}
// let test = new MarkovMachine("The cat in the hat is in the hat");
// test.makeText();

module.exports = MarkovMachine