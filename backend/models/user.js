const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Digite um endereço de e-mail válido',
        },
      },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },

  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador',
  },

  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604390580.png',
    validate: {
      validator: (value) => validator.isURL(value),
      message: 'O avatar deve conter uma URL válida',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
