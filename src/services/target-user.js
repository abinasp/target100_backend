import {mongoConnect} from "../util/db"
import {generateToken} from '../util/token';

export default class TargetUser{

    OnLoginUser = async(username,password) =>{
        try{
            let user = await this.OnExistsUser(username);
            if(!user.status){
                throw user.error
            }

            if(user.user.password !== password){
                throw 'Wrong password!!'
            }
            return {
                status: true,
                token: generateToken(username,password)
            };
        }catch(ex){
            console.error('Error in login user');
            return {
                status: false,
                error: ex
            };
        }
    }

    OnExistsUser = async (username)=>{
        try{
            const dbc = await mongoConnect();
            let user = await dbc.collection('admin').findOne({username:username});
            if(!user){
                throw "User doesn't exists"
            }
            return {
                status: true,
                user: user
            };
        }catch(ex){
            console.error('Error in finding user');
            return {
                status:false,
                error: ex
            };
        }
    }

}