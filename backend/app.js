const express = require('express');
const morgan = require('morgan');
const path = require('path');
const User = require('./models/user');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./config/db');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.post('/register', async (req, res) => {
  try {
    const { name, email, number,  admissionNumber } = req.body;
    if (!name || !email || !number || !admissionNumber) {
        return res.status(400).json({ error: "All fields are required" });
      }
    await User.create({ name, email, number,  admissionNumber });
    res.send('User registered successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});


app.listen(5000, () => {
  console.log('Server is running');
});
