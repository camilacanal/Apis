import WordSet from "./wordSet.js";
import Characters from "./character.js";


class App{
    constructor(){
        this.character = new Characters();
       
        this.button = document.querySelector("#boton"); 
        
        this.button.addEventListener('click', this.fetchCharacters.bind(this)); 
        this.inputValue = document.querySelector("#set-word-input"); 

        const setReview = document.querySelector('#save');
         this._onSet = this._onSet.bind(this);
         setReview.addEventListener('submit',this._onSet);
    }

    fetchCharacters(){
         fetch('/personajes/' + this.inputValue.value)
         .then(response => response.json())
         .then(data => {
            console.log(data);
        })
      .catch(err => alert("No se encuentra el personaje buscado :("));
    }
   
    onResponse(response){
       return response.json();
    }

    _onSet(event) {
      event.preventDefault();
  
      const resultsContainer = document.querySelector('#characterContainer');
      const reviewSet = new WordSet(resultsContainer);
      const postBody = reviewSet.read();
  
      this.character.save(postBody);
    }
   
    }
 
 const app = new App();