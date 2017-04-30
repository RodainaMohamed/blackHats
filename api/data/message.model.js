const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    dateCreated: {
      type: Date,
      default: Date.now
    },
    thread: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Thread",
        required: true
    },
    readUser: {
      type: Boolean,
      default: false
    },
    readBusiness: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      required: true
    },
    byUser: {
      type: Boolean,
      required: true
    }
});

mongoose.model('Message', messageSchema);
