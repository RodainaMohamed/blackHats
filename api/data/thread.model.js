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

threadSchema.pre('remove', function(next){
	var thread = this;
	thread.model('Business').update(
        { _id: thread.business},
        { $pull: { threads: thread._id } },
        { multi: true },
        next
     );
});

threadSchema.pre('remove', function(next){
	var thread = this;
	thread.model('User').update(
        { _id: thread.user},
        { $pull: { threads: thread._id } },
        { multi: true },
        next
     );
});

mongoose.model('Thread', threadSchema);
