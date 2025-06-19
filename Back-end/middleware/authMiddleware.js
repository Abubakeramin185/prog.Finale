import jwt from 'jsonwebtoken';
import 'dotenv/config';
import userModel from '../models/usersSchema.js';

const jwtSecretKey = process.env.JWT_SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  try {
    const tokenBearer = req.headers.authorization;

    if (!tokenBearer) {
      return res.status(401).json({ error: 'Token required' });
    }

    const token = tokenBearer.replace('Bearer ', '');
    const data = await verifyJWT(token);

    if (!data || !data.exp) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const user = await userModel.findById(data.id);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user;
    next();

  } catch (err) {
    console.error('Auth Middleware Error:', err);
    return res.status(401).json({ error: 'Token invalid or expired' });
  }
};

const verifyJWT = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) reject(err); // FIX: qui ora chiama reject in caso di errore
      else resolve(decoded);
    });
  });
};

export default authMiddleware;





// //middleware Importo le dipendenze necessario per il progetto
// import jwt from 'jsonwebtoken';
// import 'dotenv/config'
// const jwtSecretKey = process.env.JWT_SECRET_KEY;

// // Import Model
// import userModel from "../models/usersSchema.js";

// // Middleware
// const authMiddleware = async (req, res, next) => {
//     //console.log("Sono authMiddleware!")
//     try {
//         const tokenBearer = req.headers.authorization
        
//         if(tokenBearer !== undefined){
//             const token = tokenBearer.replace('Bearer ', '')
//             const data = await verifyJWT(token)
//             console.log(data)
//             if(data.exp) {
//                 const me = await userModel.findById(data.id)
//                 if(me) {
//                     req.user = me
//                     next()
//                 } else {
//                     res.status(401).send('User not found!')
//                 }
//             } else {
//                 res.status(401).send('Please login again!!')
//             }
//         } else {
//             res.status(401).send('Token required!!!!')
//         } 
        
//     } catch(err) {
//         next('Token error!!')
//     }
// }


// const verifyJWT = (token) => {
//     return new Promise((res, rej) => {
//         jwt.verify(token, "amMUGVFLKNMty77", (err, data) => {
//             if(err) res(err)
//             else res(data)
//         })
//     })
// }

// export default  authMiddleware;
