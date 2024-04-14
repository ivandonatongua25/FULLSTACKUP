const nodemailer = require('nodemailer');
require('dotenv').config();


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ivandonatongua@gmail.com',
      pass: 'ontt gvhp qiqg hzwm'
    },
  
    tls: {
        rejectUnauthorized: false
    }
  });
  
  let mailOptions = {
    from: 'ivandonatongua@gmail.com',
    to: 'nguanzeng@gmail.com',
    subject: `Notificaciones de fullstack`,
    html: '<h2>Ivan Donato Hizo Esto</h2><br>'
  };
  
const sendMail = () => {
  
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
        console.log(err)
    else
        console.log(info);
      console.log("Ivan Tu Email Se envio Correctamente");
  });
}

module.exports = { sendMail }
