 const express = require('express');
const nodemailer = require('nodemailer');
 const cors = require('cors');
 const bodyParser = require('body-parser');
 const path=require('path');
 const dotenv=require('dotenv'); 
 dotenv.config();
 const PORT = process.env.PORT || 3000;


 

 const app = express();
 app.use(cors());
 app.use(bodyParser.json());

 const emailFrom = process.env.EMAIL_USERNAME;
 const emailPassword = process.env.EMAIL_PASSWORD;

 const transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
     user: emailFrom,
     pass: emailPassword,
   },
 });

 app.post('/send-email', (req, res) => {
     const { name, email, message } = req.body;

     const mailOptions = {
       from: emailFrom,
       to: 'recipient@example.com',  
       subject: 'New Contact Form Submission',
       text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
     };

     transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
         console.log(error);
         res.status(500).send('Error: Unable to send the email.');
       } else {
         console.log('Email sent: ' + info.response);
         res.status(200).send('Email sent successfully.');
       }
     });
   });

app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from bob server!
       
    </section>
  </body>
</html>
`
