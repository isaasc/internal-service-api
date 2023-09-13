const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaPerson = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  cpf: {
    type: Number,
    required: [true, 'cpf is required'],
  },
  address: {
    type: String,
    required: [true, 'address is required'],
  },
  telephone: {
    type: Number,
  },
});

module.exports = mongoose.model('Person', schemaPerson);
