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
      
      let pushedValue = words[i+1] ? words[i+1] : null
      // if there is no value set, create array, else push word into array
      if (markovChains[words[i]]){

        markovChains[words[i]].push(pushedValue);
        
      } else {

        markovChains[words[i]] = [pushedValue];

      }
      // markovChains[words[i]] = markovChains[words[i]] ? markovChains[words[i]].push(words[i+1]) : [words[i+1]]
      
    }
    return markovChains;
    // console.log(markovChains);
  }

  /** return random text from chains */

  makeText(numWords = 100) {

    // call markovChains and create a keys array
    let markovObj = this.makeChains();
    let markovKeys = Object.keys(markovObj);

    let key;

    let outStr = '';

    for (let i=0; i<numWords; i++) {

      if (!key){
        // randomize key for the first loop, add key to string then continue loop
        let keysIdx = Math.floor(Math.random() * markovKeys.length);
        key = markovKeys[keysIdx];
        outStr += `${key}`
        continue;
      }
      
      // make a random call on the random-key value array
      let valuesIdx = Math.floor(Math.random() * markovObj[key].length);
      let value = markovObj[key][valuesIdx];

      if (!value){
        break;
      }

      outStr += ` ${value}`;
      //reset key
      key = value; 
    } 
  return outStr;
  }
  
}
// let test = new MarkovMachine("The cat in the hat is in the hat");
// test.makeText();

module.exports = MarkovMachine