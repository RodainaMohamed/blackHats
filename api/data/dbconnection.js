const mongoose = require("mongoose");
const dburl = "mongodb://localhost:27017/blackhats";

mongoose.connect(dburl);

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
function gracefulShutdown(msg, callback) {
  mongoose.connection.close(function() {
    callback();
  });
}

// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('App termination (SIGINT)', function() {
    process.exit(0);
  });
});

// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('App termination (SIGTERM)', function() {
    process.exit(0);
  });
});

require("./activity.model");
require("./booking.model");
require("./business.model");
require("./review.model");
require("./user.model");