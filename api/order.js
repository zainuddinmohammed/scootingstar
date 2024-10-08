const express = require('express');
const serverless = require('serverless-http');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const app = express();

// CORS options
const corsOptions = {
    origin: 'https://scootingstar-zainuddinmohammeds-projects.vercel.app',
    methods: 'POST',
    allowedHeaders: ['Content-Type'],
};

// Use CORS with options
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage(); // Use memory storage for serverless
const upload = multer({ storage });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

transporter.verify((error) => {
    if (error) {
        console.error('Error connecting to the email service:', error);
    } else {
        console.log('Email service is ready to send messages.');
    }
});

app.post('/api/order', upload.single('design'), (req, res) => {
    const {
        name, email, contactMethod, description, startDate, startTime, endDate, endTime, eventLocation, dateTimePairs, advertiseLocation, selection, details
    } = req.body;
    const design = req.file ? req.file.buffer : null;

    console.log('Order received:', {
        name, email, contactMethod, description, startDate, startTime, endDate, endTime, eventLocation, dateTimePairs, advertiseLocation, selection, details
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'Scooting Star Order',
        text: `
            Name/Student Organization: ${name}
            Email: ${email}
            Contact Method: ${contactMethod}
            Event/Org Description: ${description}
            Event Start Date: ${startDate}
            Event Start Time: ${startTime}
            Event End Date: ${endDate}
            Event End Time: ${endTime}
            Event Location: ${eventLocation}
            Advertising Dates: ${JSON.stringify(dateTimePairs)}
            Advertising Locations: ${advertiseLocation}
            Poster Type: ${selection}
            Poster Design: ${design ? 'attached' : 'N/A'}
            Extra Details: ${details}
        `,
        attachments: design ? [{ filename: 'design.png', content: design }] : [],
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).send({ message: 'Error sending email' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(201).send({ message: 'Order received successfully' });
        }
    });
});

// Export the serverless app
module.exports = app;
module.exports.handler = serverless(app);