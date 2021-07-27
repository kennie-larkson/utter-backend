import nodemailer from "nodemailer"


  async function main () {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'materiakenny@gmail.com',
        pass: 'THISGMAILPWORD'
      }
    });
    
    const mailOptions = {
      from: 'materialkenny@gmail.com',
      to: 'webappdev993@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy :)!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  export default main