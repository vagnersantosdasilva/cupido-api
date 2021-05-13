const express = require('express');
const router = express.Router();
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const authorization = require('../Authorization/auth');
const knex = require("../Config/db");
const config = require ('../Config/config');

const createUserToken = (userId,username,displayname)=>{
    return 'Bearer '
        +jwt.sign({id:userId , username:username , displayname:displayname},
        config.jwt_pass,{expiresIn:config.jwt_expires_in});
}

router.post('/create',async (req,res) =>{

    try {

        const {username , password , name } = req.body;
        if(!username || !password || !name) return res.status(400).send({error : 'Dados insuficientes !'});

        const select = knex.select('username')
            .from('users')
            .where('username','=',username);

        const user_ = await select ;
        console.log(user_[0]);
        if (user_[0] !==undefined) return res.status(400).send({error:'Usuário já existente'});
        if (user_[0]===undefined){

            const pass = await bcrypt.hash(password,10);
            knex('users').insert ({
                username:username,
                password:pass,
                name:name
            }).then((result)=>{
                return res.status(201).send({success:true});
            }).catch((e)=>{
                return res.status(500).send({error:e.message});
            });
        }

    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
});

router.put('/', authorization,async (req,res) =>{

    try {
        const {id, username, password, name} = req.body;
        const pass = await bcrypt.hash(password, 10);

        const update = knex('users').where('id', '=', id)
            .update({name: name, username: username, password: pass});

        result = await update;
        console.log(result);
        return res.send({result:result});
    }
    catch(error){
        return res.status(400).send({error:'Ocorreu um problema'});
    }
});

router.post ('/login' , async (req,res)=>{


    try{
        const {username,password} = req.body;
        if (!username|| !password ) return res.send({error:'Dados insuficientes!'});
        const pass = await bcrypt.hash(password,10);
        const select = knex.select('id','username','password' ,'name')
            .from('users')
            .where('username','=',username)

        const vector = await select ;
        const user = vector[0];

        if (user===undefined) return res.status(400).send({error:'Erro de login e senha!'});

        if (((user.username===username) && (await bcrypt.compare(password ,user.password)) )) {
            return res.send({
                token: createUserToken(user.id, user.username, user.name)
            });
        }
        return res.status(400).send({error:'Erro de login e senha!'});
    }catch (error){
        return res.status(400).send({error:'Ocorreu um problema'});
    }
}) ;


module.exports = router;
