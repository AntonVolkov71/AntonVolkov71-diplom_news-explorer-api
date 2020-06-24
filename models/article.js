const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,

  },
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/{2}/.test(v);
      },
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/{2}/.test(v);
      },
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
    select: false,
  },
});


articleSchema.methods.omitPrivate = function omitPrivate() {
const obj = this.toObject();
delete obj.owner;
return obj;
};

module.exports = mongoose.model('article', articleSchema);
