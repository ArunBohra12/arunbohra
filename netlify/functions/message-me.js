// Using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

import * as sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const handler = async function (event, context) {
  try {
    const { name, email, message } = JSON.parse(event.body);

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Please provide all the details',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'You are not using a http POST method for this endpoint.',
        }),
        headers: {
          'Content-Type': 'application/json',
          Allow: 'POST',
        },
      };
    }

    const msg = {
      to: process.env.EMAIL_TO,
      from: process.env.EMAIL_FROM,
      subject: `Message from ${name}`,
      text: message,
      html: `
        <p>${name} sent you a message</p>
        <p><b>Email:</b>${email}</p>
        <br />
        <div>
          <b>Message:</b>
          <p>${message}</p>
        </div>
      `,
    };

    await sgMail.send(msg);

    const response = { message: 'Email sent successfully!' };

    return {
      statusCode: 200,
      body: JSON.stringify(response),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: err.message }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
};
