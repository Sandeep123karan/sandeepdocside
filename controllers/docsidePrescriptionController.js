// controllers/docsidePrescriptionController.js

const DocsidePrescription =
  require(
    "../models/docsidePrescriptionModel"
  );

const Appointment =
  require(
    "../models/appointmentModel"
  );



/* =========================
   ✅ CREATE PRESCRIPTION
========================= */

exports.createPrescription =
  async (req, res) => {

    try {

      const {

        appointmentId,

        chiefComplaints,

        examinationFindings,

        provisionalDiagnosis,

        clinicalNotes,

        medicines,

        labInvestigations,

        dietaryInstructions,

        doctorsAdvice,

      } = req.body;



      /* =========================
         ✅ CHECK APPOINTMENT
      ========================= */

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



      /* =========================
         ✅ CHECK DOCTOR OWNER
      ========================= */

      if (
        appointment.doctorId.toString() !==
        req.doctor._id.toString()
      ) {

        return res.status(403).json({

          success: false,

          message:
            "Not authorized",

        });

      }



      /* =========================
         ✅ CHECK EXISTING
      ========================= */

      const existingPrescription =
        await DocsidePrescription.findOne({

          appointmentId,

        });

      if (existingPrescription) {

        return res.status(400).json({

          success: false,

          message:
            "Prescription already exists",

        });

      }



      /* =========================
         ✅ CREATE PRESCRIPTION
      ========================= */

      const prescription =
        await DocsidePrescription.create({

          appointmentId,

          doctorId:
            req.doctor._id,

          userId:
            appointment.userId,

          chiefComplaints,

          examinationFindings,

          provisionalDiagnosis,

          clinicalNotes,

          medicines,

          labInvestigations,

          dietaryInstructions,

          doctorsAdvice,

        });



      /* =========================
         ✅ COMPLETE APPOINTMENT
      ========================= */

      appointment.status =
        "completed";

      await appointment.save();



      /* =========================
         ✅ RESPONSE
      ========================= */

      res.status(201).json({

        success: true,

        message:
          "Prescription created successfully",

        data:
          prescription,

      });

    } catch (error) {

      console.log(
        "CREATE PRESCRIPTION ERROR =>",
        error
      );

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };





/* =========================
   ✅ GET PRESCRIPTION
========================= */

exports.getPrescriptionByAppointment =
  async (req, res) => {

    try {

      const prescription =
        await DocsidePrescription.findOne({

          appointmentId:
            req.params.appointmentId,

        })

          .populate(
            "doctorId",
            "name email"
          )

          .populate(
            "userId",
            "fullname email phone"
          );



      if (!prescription) {

        return res.status(404).json({

          success: false,

          message:
            "Prescription not found",

        });

      }



      res.status(200).json({

        success: true,

        data:
          prescription,

      });

    } catch (error) {

      console.log(
        "GET PRESCRIPTION ERROR =>",
        error
      );

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };





/* =========================
   ✅ UPDATE PRESCRIPTION
========================= */

exports.updatePrescription =
  async (req, res) => {

    try {

      const prescription =
        await DocsidePrescription.findById(
          req.params.id
        );

      if (!prescription) {

        return res.status(404).json({

          success: false,

          message:
            "Prescription not found",

        });

      }



      // ✅ CHECK OWNER
      if (
        prescription.doctorId.toString() !==
        req.doctor._id.toString()
      ) {

        return res.status(403).json({

          success: false,

          message:
            "Not authorized",

        });

      }



      // ✅ UPDATE DATA
      prescription.chiefComplaints =
        req.body.chiefComplaints ||
        prescription.chiefComplaints;

      prescription.examinationFindings =
        req.body.examinationFindings ||
        prescription.examinationFindings;

      prescription.provisionalDiagnosis =
        req.body.provisionalDiagnosis ||
        prescription.provisionalDiagnosis;

      prescription.clinicalNotes =
        req.body.clinicalNotes ||
        prescription.clinicalNotes;

      prescription.medicines =
        req.body.medicines ||
        prescription.medicines;

      prescription.labInvestigations =
        req.body.labInvestigations ||
        prescription.labInvestigations;

      prescription.dietaryInstructions =
        req.body.dietaryInstructions ||
        prescription.dietaryInstructions;

      prescription.doctorsAdvice =
        req.body.doctorsAdvice ||
        prescription.doctorsAdvice;



      await prescription.save();



      res.status(200).json({

        success: true,

        message:
          "Prescription updated successfully",

        data:
          prescription,

      });

    } catch (error) {

      console.log(
        "UPDATE PRESCRIPTION ERROR =>",
        error
      );

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };





/* =========================
   ✅ DELETE PRESCRIPTION
========================= */

exports.deletePrescription =
  async (req, res) => {

    try {

      const prescription =
        await DocsidePrescription.findById(
          req.params.id
        );

      if (!prescription) {

        return res.status(404).json({

          success: false,

          message:
            "Prescription not found",

        });

      }



      // ✅ CHECK OWNER
      if (
        prescription.doctorId.toString() !==
        req.doctor._id.toString()
      ) {

        return res.status(403).json({

          success: false,

          message:
            "Not authorized",

        });

      }



      await prescription.deleteOne();



      res.status(200).json({

        success: true,

        message:
          "Prescription deleted successfully",

      });

    } catch (error) {

      console.log(
        "DELETE PRESCRIPTION ERROR =>",
        error
      );

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  };