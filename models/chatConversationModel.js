const mongoose =
  require("mongoose");



const chatConversationSchema =
  new mongoose.Schema({

    appointmentId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Appointment",

      required: true,

    },



    userId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,

    },



    doctorId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "Doctor",

      required: true,

    },



    lastMessage: {

      type: String,

      default: "",

    },



    lastMessageTime: {

      type: Date,

      default: Date.now,

    },

  },

  {
    timestamps: true,
  }
);



module.exports =
  mongoose.model(
    "ChatConversation",
    chatConversationSchema
  );