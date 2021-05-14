const express = require('express');
const router = express.Router();
const knex = require("../Config/db");
const authorization = require('../Authorization/auth');

router.get('/profiles',async (req,res)=>{

    try {
        const {username} = req.params;

        const select = knex
            .select('p.id_user as id' , 'u.username as email','u.name','p.sex','p.birth','p.description as text',
                'p.video')

            .from('users as u')
            .join('profile_user as p','u.id','p.id_user');
        const data = await select
        return res.json(data);

    }catch (error){
        console.log('Chamada a profiles '+error.message);
        return res.status(500).send({error:error.message});
    }

})

router.get ('/profiles/:idUser',async(req,res)=>{
    try {
        const {idUser} = req.params;

        const select = knex
            .select('p.id_user as id' , 'u.username as email','u.name','p.sex','p.birth','p.description as text',
                'p.video')
            .from('users as u')
            .join('profile_user as p','u.id','p.id_user')
            .where('p.id_user', '=', idUser);

        const data = await select
        console.log(data);
        return res.json(data[0]);

    }catch (error){
        return res.status(500).send({error:error.message});
    }

});

router.get ('/profile/:username',async(req,res)=>{
    try {
        const {username} = req.params;

        const select = knex
            .select('p.id_user as id' , 'u.username as email','u.name','p.sex','p.birth','p.description as text',
                'p.video')

            .from('users as u')
            .join('profile_user as p','u.id','p.id_user')
            .where('u.username','=',username);

        const data = await select
        return res.json(data[0]);

    }catch (error){
        console.log('Chamada a profile :username '+error.message);
        return res.status(500).send({error:error.message});
    }

});

router.post( '/profile' , async(req,res)=>{
    try {
        const {id_user ,sex ,birth, video,text} = req.body;

        knex('profile_user').insert ({
            id_user:id_user,
            sex:sex,
            birth:birth,
            video:video,
            description:text
        }).then((result)=>{
            console.log(result);
            return res.status(201).send({success:true});
        }).catch((e)=>{
            return res.status(500).send({error:e.message});
        });
    }catch (error){
        return res.status(400).send({error:error.message});
    }

});

router.put( '/profile' , async(req,res)=>{
    try {
        const {id_user, sex, video, text , birth} = req.body;

        const update = knex('profile_user').where('id_user', '=', id_user)
            .update({sex: sex, video: video, description: text, birth:birth});
        let result = await update;

        return res.send({result:result});
    }
    catch(error){
        return res.status(400).send({error:'Ocorreu um problema'});
    }
});
module.exports = router;




