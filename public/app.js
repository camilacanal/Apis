// fetch desde el servidor (back) 
apiUrl = "/personajes"

// fetch desde el front 
//  apiUrl = "https://www.mockachino.com/9faa6d69-fbe9-41/personajes"

class App{
    constructor(){
        this.onJsonReady = this.onJsonReady.bind(this);
        this.onResponse = this.onResponse.bind(this);
        
        this.onClick = this.onClick.bind(this);
        const b = document.querySelector("#boton");
        b.addEventListener('click', this.onClick);
    }

    onClick(event){ 
        fetch(apiUrl) 
        .then(this.onResponse)
        .then(this.onJsonReady);
        event.preventDefault();
    }
    
    onJsonReady(json) {
      console.log(json)
      const characterContainer = document.querySelector("#characterContainer");
      characterContainer.innerHTML = "";  
      for(const c of json.personajes) {4
        const character = new Characters(c.descripcion)
       characterContainer.innerHTML =  character.getImage();   
      }
    }
   
    onResponse(response){
       return response.json();
    }
   
    }
 
 class Characters {
  image = null;
  constructor(imageUrl){
       this.image = new Image();
       this.image.src  = imageUrl;  
    } 

    getImage(){
        return "<image src\"" + this.image.url + "/>";
    }
    }

 const app = new App();