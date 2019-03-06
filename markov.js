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

    for (let i = 0; i < words.length-1; i++){
      
      let pushedValue = words[i+2] ? words[i+2] : null
      // if there is no value set, create array, else push word into array
      if (markovChains[`${words[i]} ${words[i+1]}`]){

        markovChains[`${words[i]} ${words[i+1]}`].push(pushedValue);
        
      } else {

        markovChains[`${words[i]} ${words[i+1]}`] = [pushedValue];

      }
      
    }
    // console.log(markovChains);
    return markovChains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {

    // call markovChains and create a keys array
    let markovObj = this.makeChains();
    let markovKeys = Object.keys(markovObj);
    // console.log("markovObj=",markovObj);
    let key;

    let outStr = '';

    for (let i=0; i<numWords; i++) {

      if (!key){
        // randomize key for the first loop, add key to string then continue loop
        let keysIdx = Math.floor(Math.random() * markovKeys.length);
        key = markovKeys[keysIdx];
        // console.log("key1=",key);
        outStr += `${key}`;

        continue;
      }
      
      // make a random call on the random-key value array
      // console.log("markovObj[key]=", markovObj[key]);
      // console.log("key2=",key);
      let valuesIdx = Math.floor(Math.random() * markovObj[key].length);
      let value = markovObj[key][valuesIdx];

      if (!value){
        break;
      }

      outStr += ` ${value}`;
      // console.log("value=",value);
      
      let keySplit = key.split(' ');
      // console.log("keyspilit=",keySplit);
      key = `${keySplit[1]} ${value}`;
      // console.log("key reassign=",key);
    } 
    console.log(outStr);
  return outStr;
  }
  
}

module.exports = MarkovMachine

let text = new MarkovMachine("the cat in the hat is in the hat");
text.makeText();