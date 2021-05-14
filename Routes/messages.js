const express = require('express');
const nodemailer = require("nodemailer");
const knex = require("../Config/db");
const router = express.Router();
const authorization = require('../Authorization/auth');


router.post('/sendmail',authorization,async (req,res) => {

    try{

        const transporter = nodemailer.createTransport({
            host: 'smtp.mail.yahoo.com',
            port : 587 ,
            secure:true,
            auth:{
                user:"vagnersantosdasilva@yahoo.com.br",
                pass:''
            }
        });


      await transporter.sendMail({
            from:"Cupido Online <vagnersantosdasilva@yahoo.com.br>",
            to :"vagnersantosdasilva@gmail.com",
            subject :"Titulo aqui",
            text :"Corpo da mensagem aqui"});
        }
        catch(error){
            console.log(error.message);
        }


});

router.get ('/messages/:id' ,authorization, async (req,res)=>{

    try {
        const {id} = req.params;

        const subquery = knex.select('id_from as id').from('messages as m').where('id_to',id);

        const select = knex
            .select('m.id','m.id_from' , 'u.name','m.message','m.anonymous')
            .from('users as u')
            .join('messages as m','u.id','m.id_from')
            .whereIn('u.id',subquery);
        const data = await select
        return res.json(data);

    }catch (error){
        return res.status(500).send({error:error.message});
    }

});

router.post ('/sendmessage',authorization,  (req,res)=>{

        const {id_to,id_from,anonymous,message} = req.body;
        knex('messages').insert ({
            id_to:id_to,
            id_from:id_from,
            message:message,
            anonymous:anonymous
        }).then((result)=>{
            return res.status(201).send({success:true});
        }).catch((e)=>{
            return res.status(500).send({error:e.message});
        });
});
module.exports = router;

