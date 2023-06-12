import express from 'express';
import passport from 'passport';
import db from './db.js';  
import path from 'path'; 
import Authorization from "./auth.js";
import {fileURLToPath} from 'url';
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
import fetch from "node-fetch"

class BackendandServer{
    constructor() {
        const app = express();
        app.use(express.json());
        app.use(express.static('public'));
        //app.use(express.urlencoded({ extended: false }));
        this.authorization = new Authorization(app);
        
        app.get('/personajes/:personaje', this._doSearch);
        app.post('/save/', this._doSave);
        app.get('/login/', this._login);
        app.get('/auth/google/', passport.authenticate('google', {
            scope: ['email', 'profile']
          }));
        app.get('/auth/google/callback', passport.authenticate('google', { // callback --> que vas a hacer cuando se autentique 
          successRedirect: '/',
          failureRedirect: '/login'
        }));
        app.get('/', this.authorization.checkAuthenticated, this._goHome);


     app.listen(3000, () => console.log('Listening on port 3000'));
    }
   
   async _doSave(req, res) {
    const query = { word: req.body.word}; //no tengo acceso a la base de datos de uds, pero quizas el campo no se llame word
    const collection = db.collection("word");
    await collection.insertOne(query); //no tengo acceso a la base de datos de uds, pero quizas la coleccion no se llame word
    res.json({ success: true });
  } 

   async _doSearch(req,res){
    const routeParams = req.params;
    const personaje = routeParams.personaje;
    
     return fetch("https://www.mockachino.com/3e8f3f82-d354-4c/personajes/"+personaje)
    .then(response => response.json())
    .then(data => {
      res.json(data); 
      console.log(data)
    })

}

    async _login(req, res) {
      res.sendFile(path.join(_dirname, "public/login.html"));
     }
  
    async _goHome(req, res) {
      res.sendFile(path.join(_dirname, "public/home.html"));
   } 

}

new BackendandServer();
