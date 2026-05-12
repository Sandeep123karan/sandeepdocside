const mongoose =
  require("mongoose");



const chatMessageSchema =
  new mongoose.Schema({

    conversationId: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref:
        "ChatConversation",

      required: true,

    },



    senderId: {

      type:
        mongoose.Schema.Types.ObjectId,

      required: true,

    },



    senderType: {

      type: String,

      enum: [
        "user",
        "doctor",
      ],

      required: true,

    },



    message: {

      type: String,

      default: "",

    },



    messageType: {

      type: String,

      enum: [
        "text",
        "image",
        "file",
      ],

      default: "text",

    },



    isSeen: {

      type: Boolean,

      default: false,

    },

  },

  {
    timestamps: true,
  }
);



module.exports =
  mongoose.model(
    "ChatMessage",
    chatMessageSchema
  );