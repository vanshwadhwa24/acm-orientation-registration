const express = require('express');
const morgan = require('morgan');
const path = require('path');
const User = require('./models/user');
const dotenv = require('dotenv');
const db = require('./config/db');
const cors = require('cors');
const QRCode = require('qrcode');

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.post('/register', async (req, res) => {
  try {
    const { name, email, number, admissionNumber } = req.body;
    if (!name || !email || !number || !admissionNumber) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    await User.create({ name, email, number, admissionNumber });

    const qrData = `
    Event: Orientation
    Name: ${name}
    Email: ${email}
    Mobile: ${number}
    Admission: ${admissionNumber}
    Status: Successfully Registered
    `;

    const qrCode = await QRCode.toDataURL(qrData);

    res.status(200).json({
      message: 'User registered successfully',
      qrCode,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

// Use dynamic port for Render deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
