const ChatConversation =
  require(
    "../models/chatConversationModel"
  );

const ChatMessage =
  require(
    "../models/chatMessageModel"
  );

const Appointment =
  require(
    "../models/appointmentModel"
  );



/* =========================
   ✅ START CHAT
========================= */

exports.startChat =
  async (req, res) => {

    try {

      const {
        appointmentId
      } = req.body;



      const appointment =
        await Appointment.findById(
          appointmentId
        );

      if (!appointment) {

        return res.status(404).json({

          success: false,

          message:
            "Appointment not found",

        });

      }



      let conversation =
        await ChatConversation.findOne({

          appointmentId,

        });

      if (!conversation) {

        conversation =
          await ChatConversation.create({

            appointmentId,

            userId:
              appointment.userId,

            doctorId:
              appointment.doctorId,

          });

      }



      res.status(200).json({

        success: true,

        message:
          "Chat started",

        data:
          conversation,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };





/* =========================
   ✅ SEND MESSAGE
========================= */

exports.sendMessage =
  async (req, res) => {

    try {

      const {
        conversationId,
        message,
      } = req.body;



      const newMessage =
        await ChatMessage.create({

          conversationId,

          senderId:
            req.user?._id ||
            req.doctor?._id,

          senderType:
            req.doctor
              ? "doctor"
              : "user",

          message,

        });



      await ChatConversation.findByIdAndUpdate(

        conversationId,

        {

          lastMessage:
            message,

          lastMessageTime:
            new Date(),

        }

      );



      res.status(201).json({

        success: true,

        message:
          "Message sent",

        data:
          newMessage,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };





/* =========================
   ✅ GET MESSAGES
========================= */

exports.getMessages =
  async (req, res) => {

    try {

      const messages =
        await ChatMessage.find({

          conversationId:
            req.params.conversationId,

        }).sort({
          createdAt: 1,
        });



      res.status(200).json({

        success: true,

        count:
          messages.length,

        data:
          messages,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };





/* =========================
   ✅ GET MY CHATS
========================= */

exports.getMyChats =
  async (req, res) => {

    try {

      let chats;



      if (req.doctor) {

        chats =
          await ChatConversation.find({

            doctorId:
              req.doctor._id,

          })

            .sort({
              updatedAt: -1,
            });

      } else {

        chats =
          await ChatConversation.find({

            userId:
              req.user._id,

          })

            .sort({
              updatedAt: -1,
            });

      }



      res.status(200).json({

        success: true,

        count:
          chats.length,

        data:
          chats,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };