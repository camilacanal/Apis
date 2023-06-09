import express from 'express';
import passport from 'passport';
import db from './db.js';  
import path from 'path';
import fs from 'fs'; 
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
        app.use(express.urlencoded({ extended: false }));
        this.authorization = new Authorization(app);
        
        // fetch desde el servidor --> no funciona 
        app.get("/personajes", (req, res)=> {
          fetch("https://www.mockachino.com/9faa6d69-fbe9-41/personajes")
             .then(response => response.json())
             .then(data =>{ 
              console.log(data);
              res.json(data);
            
            })
        });

        app.get('/login/', this._login);
        app.get('/auth/google/', passport.authenticate('google', {
            scope: ['email', 'profile']
          }));
        app.get('/auth/google/callback', passport.authenticate('google', { // callback --> que vas a hacer cuando se autentique 
          successRedirect: '/',
          failureRedirect: '/login'
        }));
        app.get('/', this.authorization.checkAuthenticated, this._goHome);

      app.post('/save/', this._doSave); 

    app.post("/logout", (req,res) => {
      req.logOut(err=>console.log(err));
      res.redirect("/login");
   })
     app.listen(3000, () => console.log('Listening on port 3000'));
    }
   
    async _doSave(req, res) {
    const query = { word: req.body.word};
    const collection = db.collection("word");
    await collection.insertOne(query);
    res.json({ success: true });
  }


    async _login(req, res) {
      res.sendFile(path.join(_dirname, "public/login.html"));
     }
  
    async _goHome(req, res) {
      res.sendFile(path.join(_dirname, "public/home.html"));
   } 

}

new BackendandServer();