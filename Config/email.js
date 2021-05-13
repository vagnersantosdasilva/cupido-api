const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: '',
    port : 587 ,
    secure:true,
    auth:{
        user:"",
        pass:''
    }
});

module.exports = transporter;