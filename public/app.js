import WordSet from "./wordSet.js";
import Characters from "./character.js";


class App{
    constructor(){

        this.character = new Characters();
        this.onJsonReady = this.onJsonReady.bind(this);
        this.onResponse = this.onResponse.bind(this);
        
        this.onClick = this.onClick.bind(this);
        const b = document.querySelector("#boton");
        b.addEventListener('click', this.onClick);

        const setForm= document.querySelector('#set');
        this._onSet = this._onSet.bind(this);
        setForm.addEventListener('submit', this._onSet);
    }

    _onSet(event) {
        event.preventDefault();
    
        const resultsContainer = document.querySelector('#results');
        const wordSet = new WordSet(resultsContainer);
        const postBody = wordSet.read();
    
        this.character.save(postBody);
    
      }

    onClick(event){ 
        fetch("/personajes") 
        .then(this.onResponse)
        .then(this.onJsonReady);
        event.preventDefault();
    }
    
    onJsonReady(json) {
      console.log(json)
     /*  const characterContainer = document.querySelector("#characterContainer");
      characterContainer.innerHTML = "";  
      for(const c of json.personajes) {4
        const character = new Characters(c.descripcion)
       characterContainer.innerHTML =  character.getImage();   
      } */
    }
   
    onResponse(response){
       return response.json();
    }
   
    }
 
  /* class Characters {
  image = null;
  constructor(imageUrl){
       this.image = new Image();
       this.image.src  = imageUrl;  
    } 

    getImage(){
        return "<image src\"" + this.image.url + "/>";
    }
    }  */

 const app = new App();