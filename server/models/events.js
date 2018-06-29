var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PrideSchema = Schema({
  name: {
      type: String,
      required: true,
      minlength: 1,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt:{
      type: Number,
      default: null
    },
    description: {
      type: String,
      trim: true
    },
    location:{
      type: String,
      trim: true
    },
    url:{
      type: String,
      trim: true
    }
});

var PrideEvent = mongoose.model('PrideEvent', PrideSchema);

module.exports = {PrideEvent};
