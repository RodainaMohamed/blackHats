const mongoose = require("mongoose");
const Thread = mongoose.model("Thread");
const Message = mongoose.model("Message");
const User = mongoose.model("User");
const Business = mongoose.model("Business");


// api/thread/add/:id
module.exports.createThread = function (req, res) {
    req.checkBody('message', 'Message is required').notEmpty();

    const errors = req.validationErrors();
    var user;
    var business;
    var byUser;
    if (errors) {
        res.status(500).json({
            error: errors,
            msg: "Incomplete Input",
            data: null
        });
    } else {
        if (req.user.constructor.modelName === "User") {
            user = req.user._id;
            business = req.params.id;
            byUser = true;
        } else {
            business = req.user._id;
            user = req.params.id;
            byUser = false;
        }
        User.findById(user, function (errUser, user) {
            if (errUser) {
                res.status(500).json({
                    error: errUser,
                    msg: "Error finding the user",
                    data: null
                });
            } else {
                if (!user) {
                    res.status(404).json({
                        error: null,
                        msg: "User not found",
                        data: null
                    });
                } else {
                    Business.findById(business, function (errBusiness) {
                        if (errBusiness) {
                            res.status(500).json({
                                error: errBusiness,
                                msg: "Error finding the business",
                                data: null
                            });
                        } else {
                            if (!business) {
                                res.status(404).json({
                                    error: null,
                                    msg: "Business not found",
                                    data: null
                                });
                            } else {
                                const newThread = new Thread({
                                    business: business._id,
                                    user: user._id,
                                    byUser: byUser
                                });
                                newThread.save(function (errSave, thread) {
                                    if (errSave) {
                                        res.status(500).json({
                                            error: errSave,
                                            msg: "Error creating the thread",
                                            data: null
                                        });
                                    } else {
                                        // add message then add thread to user and business
                                        addMessage(thread._id, req.body.message, byUser, function (success, status, msg, data) {
                                            if (!success) {
                                                res.status(status).json({
                                                    error: data,
                                                    msg: msg,
                                                    data: null
                                                });
                                            } else {
                                                user.threads.push(thread._id);
                                                user.save(function (errSaveUser, userNew) {
                                                    if (errSaveUser) {
                                                        res.status(500).json({
                                                            error: errSaveUser,
                                                            msg: "Error updating user",
                                                            data: null
                                                        });
                                                    } else {
                                                        business.threads.push(thread._id);
                                                        business.save(function (errSaveBusiness, newBusiness) {
                                                            if (errSaveBusiness) {
                                                                res.status(500).json({
                                                                    error: errSaveBusiness,
                                                                    msg: "Error updating business",
                                                                    data: null
                                                                });
                                                            } else {
                                                                res.status(200).json({
                                                                    error: null,
                                                                    msg: "Thread created successfully",
                                                                    data: thread
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });

                            };
                        };
                    });
                }
            }
        });
    }
}


// done(success, status, msg, data)
function addMessage(threadId, content, byUser, done) {
    Thread.findById(threadId, function (err, thread) {
        if (err) {
            done(false, 500, "Error finding thread", err);
        } else {
            if (!thread) {
                done(false, 404, "Thread not found", null);
            } else {
                const newMessage = new Message({
                    thread: threadId,
                    content: content,
                    byUser: byUser
                });
                newMessage.save(function (errMessage, message) {
                    if (errMessage) {
                        done(false, 500, "Error creating message", errMessage);
                    } else {
                        thread.messages.push(message._id);
                        thread.save(function (errSaveThread, newThread) {
                            if (errSaveThread) {
                                done(false, 500, "Error updating thread", errSaveThread);
                            } else {
                                done(true, 200, "Message added successfully", null);
                            }
                        });
                    }
                });
            }
        }
    });
}


/* Body: {
      userId
      businessId
}*/
// api/thread/findExistingThread
module.exports.findExistingThread = function (req, res) {

  var userID;
  var businessID;

  if (req.user.constructor.modelName === "User") {
    businessID = req.body.businessID;
  }
  else {
    userID = req.body.userID;
  }

  if(!businessID){
    businessID = req.user._id;
  }
  else {
    userID = req.user._id;
  }

    Thread.find({
        "user": "userID",
        "business": "businessID"
    }, function (err, thread) {
        if (err) return res.status(404).json({
            error: err,
            msg: "No existent thread",
            data: null
        });
        else return res.status(200).json({
            error: null,
            msg: "thread Retrieved Successfully",
            data: thread
        });
    });
}

// api/thread/addMessage/:threadId
module.exports.addMessage = function (req, res) {
    req.checkBody('content', 'Message content is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
        res.status(500).json({
            error: errors,
            msg: "Incomplete Input",
            data: null
        });
    } else {
        Thread.findById(req.params.threadId, function (err, thread) {
            if (err) {
                res.status(500).json({
                    error: err,
                    msg: "Error finding thread",
                    data: null
                });
            } else {
                if (!thread) {
                    res.status(404).json({
                        error: err,
                        msg: "Thread not found",
                        data: null
                    });
                } else {
                    var byUser;
                    if (req.user.constructor.modelName === "User") {
                        byUser = true;
                    } else {
                        byUser = false;
                    }
                    addMessage(thread._id, req.body.content, byUser, function (success, status, msg, data) {
                        if (!success) {
                            res.status(status).json({
                                error: data,
                                msg: msg,
                                data: null
                            });
                        } else {
                            res.status(200).json({
                                error: null,
                                msg: "Message added successfully",
                                data: null
                            });
                        }

                    });


                }
            }
        });

    }
}

// api/thread/markRead/:threadId
module.exports.markRead = function (req, res) {
    Thread.findById(req.params.threadId)
        .populate({
            path: 'messages'
        })
        .exec(function (err, thread) {
            if (err) {
                res.status(500).json({
                    error: err,
                    msg: "Error finding thread",
                    data: null
                });
            } else {
                if (!thread) {
                    res.status(404).json({
                        error: err,
                        msg: "Thread not found",
                        data: null
                    });
                } else {
                    if (req.user.constructor.modelName === "User") {
                        for (var i = 0; i < thread.messages.length; i++) {
                            thread.messages[i].readUser = true;
                        }
                    } else {
                        thread.messages[i].readBusiness = true;
                    }
                }
            }
        });
}


// api/thread/deleteThread/:threadId
module.exports.deleteThread = function (req, res) {
    Thread.findByIdAndRemove(req.params.threadId, function (err, threadToDel) {
        if (err) return res.status(500).json({
            error: err,
            msg: "There was a problem with deleting the thread",
            data: null
        });
        if (threadToDel) {
            User.findByIdAndUpdate(threadToDel.user, {
                    $pull: {
                        "threads": threadToDel._id
                    }
                }, {
                    safe: true,
                    upsert: true,
                    new: true
                },
                function (err, user) {
                    if (err) return res.status(500).json({
                        error: err,
                        msg: "Error occured while updating User concerned",
                        data: null
                    });
                    if (user) {
                        Business.findByIdAndUpdate(threadToDel.business, {
                                $pull: {
                                    'threads': threadToDel._id
                                }
                            }, {
                                safe: true,
                                upsert: true,
                                new: true
                            },
                            function (err, business) {
                                if (err) return res.status(500).json({
                                    error: err,
                                    msg: "Error occured while updating Business concerned",
                                    data: null
                                });
                                if (business)
                                    res.status(200).json({
                                        error: err,
                                        msg: 'Business successfully deleted',
                                        data: null
                                    });
                                else
                                    res.status(404).json({
                                        error: null,
                                        msg: 'Business not found, thread was not removed from Business',
                                        data: null
                                    });
                            });
                    } else
                        res.status(404).json({
                            error: null,
                            msg: 'User not found, thread was not removed from user',
                            data: null
                        });
                });
        } else
            res.status(404).json({
                error: null,
                msg: "Thread not found",
                data: null
            })
    });
}


// api/thread/deleteMessage/:messageId
module.exports.deleteMessage = function (req, res) {
    Message.findByIdAndRemove(req.params.messageId, function (err, messageToDel) {
        if (err) return res.status(500).json({
            error: err,
            msg: "There was a problem with deleting the message",
            data: null
        });
        if (messageToDel) {
            Thread.findByIdAndUpdate(threadToDel.thread, {
                    $pull: {
                        "messages": threadToDel._id
                    }
                }, {
                    safe: true,
                    upsert: true,
                },
                function (err, thread) {
                    if (err) return res.status(500).json({
                        error: err,
                        msg: "Error occured while updating User concerned",
                        data: null
                    });
                    if (thread) return res.status(200).json({
                        error: null,
                        msg: 'Message successfully deleted',
                        data: null
                    });
                    else {
                        res.status(404).json({
                            error: null,
                            msg: 'Thread not found',
                            data: null
                        });
                    }
                })
        } else {
            res.status(404).json({
                error: null,
                msg: "Message not found",
                data: null
            });
        }
    })
}

// api/thread/getUnread/:userId
module.exports.getUnreadCount = function (req, res) {
    var count = 0;
    User.findById(req.params.userId)
        .populate({
            path: 'threads'
        })
        .exec(function (err, threads) {
            if (err) return res.status(500).json({
                error: err,
                msg: "Cannot Retrieve threads",
                data: null
            });
            else if (!threads) return res.status(404).json({
                error: null,
                msg: "User did not create any threads",
                data: null
            });
            else {
                for (var i = 0; i < threads.length; i++) {
                    var options = {
                        path: 'threads[i].messages',
                        model: 'Message'
                    }
                    User.populate(threads[i], options, function (err, populatedMessages) {
                        if (err) return res.status(500).json({
                            error: err,
                            msg: "Cannot retrieve thread",
                            data: null
                        });
                        else {
                            res.status(200).json({
                                error: null,
                                msg: "Successful Retrieval",
                                data: populatedMessages
                            });

                            for (var j = 0; j < populatedMessages.length; j++) {
                                if (req.user.constructor.modelName === "User") {
                                    if (!populatedMessages[j].readUser) {
                                        count++;
                                    }
                                } else if (req.user.constructor.modelName == "Business") {
                                    if (!populatedMessages[j].readBusiness) {
                                        count++;
                                    }
                                }
                            }

                        }
                    });

                }
            }
        });
    return count;
}


// api/thread/getThreads/:userId
module.exports.getThreads = function (req, res) {
    if (req.user.constructor.modelName === "User") {
        User.findById(req.params.userId)
            .populate({
                path: 'threads'
            }).exec(function (err, threads) {
                if (err) return res.status(500).json({
                    error: err,
                    msg: "Error retrieving desired threads",
                    data: null
                });
                else {
                    res.status(200).json({
                        error: null,
                        msg: "Threads retrieved Successfully",
                        data: threads
                    });
                }
            })
    } else {
        Business.findById(req.params.userId)
            .populate({
                path: 'threads'
            }).exec(function (err, threads) {
                if (err) return res.status(500).json({
                    error: err,
                    msg: "Error retrieving desired threads",
                    data: null
                });
                else {
                    res.status(200).json({
                        error: null,
                        msg: "Threads retrieved Successfully",
                        data: threads
                    });
                }
            });
    }
}

// api/thread/getMessages/:threadId
module.exports.getMessages = function (req, res) {
    Thread.findById(req.params.threadIdid)
        .populate({
            path: "messages"
        })
        .exec(function (err, messages) {
            if (err) return res.status(500).json({
                error: err,
                msg: "Error retrieving desired messages",
                data: null
            });
            else {
                res.status(200).json({
                        error: null,
                        msg: "messages retrieved Successfully",
                        data: message
                });
            }
        })
}
