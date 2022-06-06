const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor insere um nome'],
  },
  email: {
    type: String,
    required: [true, 'Por favor insere um email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Por favor insere um email válido'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Por favor insere uma password'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Por favor confirma a password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'As passwords não são iguais. Por favor, escreve novamente.',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  // Apagamos o password confirm porque só precisamos dele para validar no registo
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPasssword
) {
  return await bcrypt.compare(candidatePassword, userPasssword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
