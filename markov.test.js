const MM = require("./markov")

describe("ClassMarkovMachine", function(){

    let testInstance;

    afterEach(function(){
        testInstance = null;
    })

    it("returns object with arrays as keys when given a string", () => {
      
        testInstance = new MM("a b a b")
        expect(testInstance.makeChains()).toEqual({a: ["b", "b"], b: ["a", null]})
    
    })

    it("returns letters in order", () => {

        testInstance = new MM("a b c d");
        const expected = ["a b c d", "b c d", "c d", "d"]

        expect(expected).toContain(testInstance.makeText());
    });

    it("returns empty string when numWords = 0", () => {

        testInstance = new MM("this is a test");

        expect(testInstance.makeText(0)).toEqual('')

    })

    it("returns string with length less than or equal to numWords", () => {

        testInstance = new MM('a b a b a b a b a b a b a b a b a b')
        //five words with four spaces
        expect(testInstance.makeText(5).length).toBeLessThanOrEqual(9)
    })

})