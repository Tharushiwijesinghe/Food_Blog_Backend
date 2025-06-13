// const mongoose = require('mongoose');

// const recipieSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   message: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Message',recipieSchema);

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' } // 'admin' or 'user'
});

module.exports = mongoose.model('User', UserSchema);
