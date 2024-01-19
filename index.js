'use strict';

const Hapi = require('@hapi/hapi');
const Mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const nodeMailer = require('nodemailer');

const init = async () => {

  const server = Hapi.server({
    port:  process.env.PORT || 3000,
    host: '0.0.0.0'
  });

   server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });

   server.route({
        method: 'POST',
        path: '/test-post',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });

  // const uri = "mongodb+srv://test:XIKVNI9Rqd6MSewz@e5-cluster.uon5uro.mongodb.net/?retryWrites=true&w=majority";

  // const client = new MongoClient(uri, {
  //   serverApi: {
  //     version: ServerApiVersion.v1,
  //     strict: true,
  //     deprecationErrors: true,
  //   }
  // });

  // async function run() {
  //   try {
  //     await client.connect();
  //     await client.db("admin").command({ ping: 1 });
  //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
  //   } finally {
  //     await client.close();
  //   }
  // }

  // run().catch(console.dir);

  // console.log('Connected to MongoDB');

  server.route({
    method: 'POST',
    path: '/contact-details',
    handler: async (request, h) => {
      try {
        console.log(request.payload);

        if(request.payload != null){

          const html = `<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <link rel="preconnect" href="https://fonts.googleapis.com"> <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"> <title>LearnCue Sales - {Day} {Date}</title> <style> body { font-family: 'Inter', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; } .container { width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; } h1 { color: #333333; } p { color: #000000; font-size: 14px; } .italic{ font-style: italic; } .fw-500{ font-weight: 500; } .m-b-20{ margin-bottom: 20px; } .m-b-50{ margin-bottom: 30px; } .m-b-60{ margin-bottom: 60px; } .no-p-m{ padding: 0 !important; margin: 0 !important; } .p-1{ font-size: 14px; color: #6d6d6d; } .p-2{ font-size: 12px; color: #6d6d6d; } .p-3{ font-size: 12px; } a { color: #007bff; text-decoration: none; } .footer { margin-top: 20px; padding-top: 10px; border-top: 1px solid #dddddd; text-align: center; color: #888888; } </style></head><body> <div class="container"> <p class="italic fw-500 m-b-50">Hi LearnCue Team,<br/>Here is a new query from the LearnCue Website</p> <p>Name: ${request.payload.name}</p> <p>Organisation: ${request.payload.org}</p> <p class="m-b-20">My Query:<br/>${request.payload.query}</p> <p>My Phone Number: ${request.payload.phone}</p> <p class="m-b-60">My Email: ${request.payload.email}</p> <p class="italic fw-500">--- End of Query ---</p> <p class="italic">Query sent from the LearnCue Webpage</p> </div></body></html>`;

          const transporter = nodeMailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: "admin@learncue.com",
              pass: "vkgy unfn devu yuzq"
            }
          })

          const emailer = {
            from: {
              name: "E5 Sales Team",
              address: "admin@learncue.com"
            },
            to: ["anik@essential5.co.in"],
            subject: "LearnCue Enquiry",
            text: "Hello",
            html: html,
          }

          const sendEmail = async(transporter, emailer) => {
            try{
              await transporter.sendMail(emailer)
              console.log("Email has been sent successfully")
            }catch(error){
              console.error(error)
            }
          }

          sendEmail(transporter, emailer);
        }
        return h.response({ message: 'Object received successfully' }).code(200);
      } catch (error) {
        console.error('Error handling POST request', error);
        return h.response({ error: 'Internal Server Error' }).code(500);
      }
    },
  });

  await server.start();

  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
