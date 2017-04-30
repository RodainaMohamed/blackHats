const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    dateCreated: {
      type: Date,
      default: Date.now
    },
    business: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    messages: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
    }],
    byUser: {
      type: Boolean,
      required: true
    }
});

mongoose.model('Thread', threadSchema);
