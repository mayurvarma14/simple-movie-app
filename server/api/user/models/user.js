const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const roles = ['user', 'admin'];
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    role: {
      type: String,
      enum: roles,
      default: 'admin',
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.method({
  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  },
});

module.exports = mongoose.model('User', userSchema);
