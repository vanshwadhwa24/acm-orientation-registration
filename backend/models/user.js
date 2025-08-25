const mongoose = require('mongoose');   
const userSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        number: { type: String, required: true, match: /^[6-9]\d{9}$/ },
        admissionNumber: { type: String, required: true }
      }, 
      
      { timestamps: true });
      
const User = mongoose.model('User', userSchema);
module.exports = User;