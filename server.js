import express from 'express';
import passport from 'passport';
/* import db from './db.js'; */
import path from 'path';
/* import fs from 'fs'; */
import Authorization from "./auth.js";
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class BackendandServer{
    constructor() {
        const app = express();
        app.use(express.json());
        app.use(express.static('public'));
        app.use(express.urlencoded({ extended: false }));
        this.authorization = new Authorization(app);
    
    
        app.get('/login/', this._login);
        app.get('/auth/google/', passport.authenticate('google', {
            scope: ['email', 'profile']
          }));
        app.get('/auth/google/callback', passport.authenticate('google', { // callback --> que vas a hacer cuando se autentique 
          successRedirect: '/',
          failureRedirect: '/login'
        }));
        app.get('/', this.authorization.checkAuthenticated, this._goHome);

    app.post("/logout", (req,res) => {
      req.logOut(err=>console.log(err));
      res.redirect("/login");
   })
     app.listen(3000, () => console.log('Listening on port 3000'));
    }
   
    async _login(req, res) {
      res.sendFile(path.join(__dirname, "public/login.html"));
     }
  
    async _goHome(req, res) {
      res.sendFile(path.join(__dirname, "public/home.html"));
   } 
}

new BackendandServer();
