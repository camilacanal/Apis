import WordSet from "./wordSet.js";
import Characters from "./character.js";

class App{
    constructor(){
        this.character = new Characters();
       
        this.button = document.querySelector("#boton"); 
        this.charactername = document.querySelector('.name');
        this.description = document.querySelector('.description');
        this.aparicion = document.querySelector('.aparicion');
        this.primera = document.querySelector('.primera-aparicion'); 
        this.img = document.querySelector('#img'); 

        this.button.addEventListener('click', this.fetchCharacters.bind(this)); 
        this.inputValue = document.querySelector("#set-word-input"); 

        const setReview = document.querySelector('#save');
         this._onSet = this._onSet.bind(this);
         setReview.addEventListener('submit', this._onSet);
    }

    fetchCharacters(){
         fetch('/personajes/' + this.inputValue.value)
         .then(response => response.json())
         .then(data => {
            console.log(data);

            if (JSON.stringify(data).includes("not found"))
            this.charactername.innerHTML = 'Personaje inexistente';
            else {
            const nameValue = data.name;
            const descValue = data.description;
            const aparValue = data.apariciones;
            const imgValue = data.imagen; 
            const primeraValue = data.primera; 

            this.charactername.innerHTML = nameValue; 
            this.description.innerHTML = "Descripción: " + descValue; 
            this.aparicion.innerHTML = "Principles apariciones: " + aparValue; 
            this.img.src = imgValue; 
          }
        })

      
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