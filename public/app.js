apiUrl = "https://www.mockachino.com/9faa6d69-fbe9-41/personajes"

class App{
    constructor(){
        this.onJsonReady = this.onJsonReady.bind(this);
        this.onResponse = this.onResponse.bind(this);
        this.loadcharacters = this.loadcharacters.bind(this);
        
        this.onClick = this.onClick.bind(this);
        const b = document.querySelector("#boton");
        b.addEventListener('click', this.onClick);
    }

    onClick(event){
        event.preventDefault();
        const input = document.querySelector('#input');
        const word = input.value.trim();
            this.dictionary.doLookup(word)
      .then(this._showResults);

    }
    onJsonReady(json) {
      const characterContainer = document.querySelector("#characterContainer");
      characterContainer.innerHTML = "";  
      for(const c of json.personajes) {
          new Characters(characterContainer, c.imagen)
        }
    }
   
    onResponse(response){
       return response.json();
    }
   
    loadcharacters() {
        fetch(apiUrl)
        .then(this.onResponse)
        .then(this.onJsonReady);
    } }
 
 class Characters {
    constructor(characterContainer, imageUrl){
       const image = new Image();
       image.src  - imageUrl;
        characterContainer.append(image);
    } }

 const app = new App(); 
 app.loadcharacters();