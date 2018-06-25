const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

const Usuario = require('../models/usuario');
const SEED = require('../config/config').SEED;

app.post('/', (req, res )=>{

    const body = req.body;

    Usuario.findOne(
        {email: body.email},
         (err, user)=>{
             if (err){
                 res.status(400)
                 .json({error: err})
             }
             console.log(body.email);

             if (!user){
                res.status(400)
                .json({error: "Credenciales incorrectas -email"})
            }


            // compara desencriptando
             if (!bcrypt.compareSync( body.password, user.password )) { 
               return res.status(400)
                .json({error: "Credenciales incorrectas -pass"})
             }

             // token
             const token =  jwt.sign({
                 user: user
             }, SEED , { expiresIn: 14400 });

             res.status(200)
                 .json({
                     ok: true,
                     user: user,
                     id: user._id,
                     token: token
                 });
         });
   
});
module.exports = app;



