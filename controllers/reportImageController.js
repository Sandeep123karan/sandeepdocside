const ReportImage =
  require(
    "../models/reportImageModel"
  );



// ======================================================
// DOCTOR - GET ALL USER IMAGES
// ======================================================

exports.getDoctorImages =
  async (req, res) => {

    try {

      // ================= CHECK DOCTOR =================

      if (!req.user?._id) {

        return res.status(401).json({

          success: false,

          message:
            "Doctor not authenticated",

        });

      }



      // ================= FIND IMAGES =================

      const reports =
        await ReportImage.find({

          doctorId:
            req.user._id,

        })

          // USER DETAILS

          .populate({

            path: "userId",

            select:
              "fullname email phone image",

          })

          // LATEST FIRST

          .sort({

            createdAt: -1,

          });



      // ================= RESPONSE =================

      res.status(200).json({

        success: true,

        message:
          "Doctor images fetched successfully",

        total:
          reports.length,

        data:
          reports,

      });

    } catch (error) {

      console.log(
        "GET DOCTOR IMAGES ERROR:",
        error
      );

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };