import express, { Router } from "express";
import userModel from "../models/usersSchema.js";
import bcrypt from "bcrypt";
import "dotenv/config"
 import jwt  from "jsonwebtoken";

const seltRounds = + process.env.SALT_ROUNDS ;
const jwtSecretkey = process.env.TWT_SECRET_KEY;


const router = express.Router();

//import model
// const userModel = require("../models/users")


// {
//     "fullname": "John Smith",
//     "username": "johnsmith",
//     "email" : "johnsmith@example.com",
//     "pasword" : "pa$$word!",
//     "verified" :  false,
// }



router.post('/register', async (req, res) => {
// const obj = req.body;
//  const user =  new userModel(obj)
//  const userSave = await user.save()
//   return res.status(201).json(userSave)
// const password = req.body.pasword;
const { fullname, username, email, password } = req.body;
if (!password) {
  return res.status(400).json({ message: "Password is required" });
}
const hashedPassword = await bcrypt.hash(password, seltRounds);

const user= new userModel({

    fullname,
    username,
    email,
    password: hashedPassword
    // ...req.body,
    // password: await bcrypt.hash(password, seltRounds)

});
const userSave = await user.save()
return res.status(201).json(userSave)

})

//ogg che inierà il client tramite una chiamata ajax

// {

//         "username": "johnsmith",
//         "pasword" : "pa$$word!",

//     }

router.post('/login', async (req, res) => {
    //Logica per login di un utente
    const username = req.body.username
    const password = req.body.password

    const userLogin = await userModel.findOne({email: username})
    console.log(userLogin)
    if(userLogin){
        //lo usernaame è stato trovato nel DB
        //controllo la password
        console.log(userLogin)
        const  log = await bcrypt.compare(password, userLogin.password)
        if(log){
            //la password è corretta
            //cenero un token
        
            const token = await generateToken({
                id: userLogin._id,
                username: userLogin.username,
                fullname: userLogin.fullname,
                email: userLogin.email
            })
            return res.status(200).json(token)
            }else{
                return res.status(400).json({message: 'invalid password!!'})

            }

        }else{
            return res.status(400).json({message: 'invalid username!!'})
        }
    
    })


    const generateToken = (payload) => {
        return new Promise((res, rej) => {
            jwt.sign(payload, "amMUGVFLKNMty77", { expiresIn: '1h' }, (err, token) => {
                if(err) rej(err)
                else res(token)
            });
        })
    }







export default router;
