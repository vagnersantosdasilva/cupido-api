const jwt = require('jsonwebtoken');
const config = require('../Config/config');

const authorization = (req,res,next)=>{
    let token = req.headers.authorization;
    token = token.replace("Bearer ","");
    console.log(token);
    if (token) {
        try{
            jwt.verify(token,config.jwt_pass)
            return next();
        }
        catch(err){

            return res.status(401)
                .send({error:'Token inválido'});
        }

    }
    return res.sendStatus(401)
        .send({error:'Token não enviado no header'});
}

module.exports = authorization;