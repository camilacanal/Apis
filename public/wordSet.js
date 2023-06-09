class WordSet{
 constructor(resultsContainer) {
      this.setWordInput = resultsContainer.querySelector('#set-word-input');     
    }
    
    show(wordSet){
      this.setWordInput.value = wordSet.word;

    }
    
    read() {
      const result = {
        word: this.setWordInput.value,
      };
      return result;
    }
}

export default WordSet;