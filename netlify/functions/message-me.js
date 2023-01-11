// Will create a function that sends me a mail
// Nodemailer is used to send the mail

import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PASSWORD,
  }
});

export const handler = async function(event, context) {
  console.log(process.env.MAIL_ADDRESS, import.meta.env.MAIL_ADDRESS);

  try {
    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Please provide all the details'
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    }

    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'You are not using a http POST method for this endpoint.',
        }),
        headers: {
          'Content-Type': 'application/json',
          'Allow': 'POST'
        },
      }
    }

    const mailOptions = {
      from: 'arunbohra12@gmail.com',
      to: 'arunbohra12@gmail.com',
      subject: 'Message from portfolio site',
      html: `
        <p>Someone sent you a message</p>
        <p><b>Name:</b>${name}</p>
        <p><b>Email:</b>${email}</p>
        <div>
        	<b>Message:</b>
        	<p>${message}</p>
        </div>
      `,
    };

    let response = { message: 'success', };
    let statusCode = 200;

    // The following transporter sends the mail
    transporter.sendMail(mailOptions, function (err, info) {
      if(err) {
     	  statusCode = 400;
        response = {
    	  	error: err.message,
    	  	message: 'Sorry, something went wrong! Please try again.',
    	  };
      } else {
        statusCode = 200;
        response = {
  	  	  message: 'Successfully sent the message!',
  	    };
      }
    });

    return {
      statusCode,
      body: JSON.stringify(response),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  } catch(err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: err.message }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  }
}
