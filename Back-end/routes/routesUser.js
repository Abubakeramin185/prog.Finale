
import express from 'express';
import User from '../models/usersSchema.js';

const router = express.Router();




router.get('/', async (req, res) => {
  try{
  const users = await User.find();
  res.status(200).json(users);
  }catch(error){
    next(err)
  }
});
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try{
    const user = await usersSchema.findbyid(id);
    res.status(200).json(user)
}catch(error){
    res.status(500).json({error: err.message})
}

})

router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.status(201).json(user);
});

router.put('/:id', async (req, res) => {
    const id = res.params.id;
    const obj = req.body;
    try{
        const userUbdate = await usersSchema.findByIdAndUbdate(id, obj)
        res.status(200).json(userUbdate)
    }catch(error){
        res.status(500).json({error: err.message})
    }
    
})


router.delete('/:id', async(req, res) => {
    const id = res.params.id;
    try{
        await usersSchema.findByIdAndDelete(id);
        res.status(200).json({message: "user deleted!!!"})
    }catch(error){
        res.status(500).json({error: err.message})
    }
})





export default router;