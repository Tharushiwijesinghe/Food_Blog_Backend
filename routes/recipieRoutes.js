const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer'); // ✅ Required for sending emails
const recipieModels = require('../models/recipieModels');




// ✅ Route to handle contact form submission
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hvtharushi1999@gmail.com',
      pass: 'bpvm xmfx hzdy euon'
    }
  });

  const mailOptions = {
    from: email,
    to: 'hvtharushi1999@gmail.com',
    subject: `New Contact Message from ${name}`,
    text: `${message}\n\nSender Email: ${email}`,

  };

  try {
    await transporter.sendMail(mailOptions); // ✅ This is inside the async function
    res.status(200).json({ success: true, message: 'Email sent!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});





module.exports = router;
