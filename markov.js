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
    console.log(markovChains);
  }
  


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
  }
}
let test = new MarkovMachine("The cat in the hat the cat in the hat");