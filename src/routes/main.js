import {} from 'dotenv/config';
import express from 'express';
import TargetUser from '../services/target-user';

const router = express.Router();
const user = new TargetUser();

router.get('/',(req,res)=>{
    res.json({
        success: true,
        message: 'Welcome to Target100 API System.'
    })
})

router.post('/login',async(req,res)=>{
    try{
        let {username,password} = req.body;
        let loggedInUser = await user.OnLoginUser(username,password)
        if(!loggedInUser.status){
            throw loggedInUser.error
        }
        res.status(200).json({
            success: true,
            message: 'Login Successful!!',
            data: loggedInUser
        });
    }catch(ex){
        res.status(401).json({
            success: false,
            message: 'Error in login',
            error: ex
        })
    }
})

export default router;

