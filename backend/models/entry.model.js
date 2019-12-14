const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const entrySchema = new Schema({
  accomplishments: { type: String, required: true },
  description: { type: String, required: true },
  username: { type: String, required: true },
  datepick: { type: Date, required: true },
}, {
  timestamps: true,
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;