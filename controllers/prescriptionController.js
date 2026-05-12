const Prescription = require(
  "../models/prescriptionModel"
);



// =====================================================
// ============ CREATE PRESCRIPTION ====================
// =====================================================

exports.createPrescription =
  async (req, res) => {
    try {
      const {
        patient,
        patientId,
        diagnosis,
        medicines,
        type,
        instructions,
      } = req.body;

      // ================= VALIDATION =================

      if (
        !patient ||
        !patientId ||
        !diagnosis
      ) {
        return res.status(400).json({
          success: false,

          message:
            "All required fields are missing",
        });
      }

      // ================= CREATE PRESCRIPTION =================

      const prescription =
        await Prescription.create({
          patient,

          patientId,

          doctorId:
            req.doctor._id,

          doctorName:
            req.doctor.name,

          diagnosis,

          medicines,

          type,

          instructions,
        });

      // ================= RESPONSE =================

      res.status(201).json({
        success: true,

        message:
          "Prescription created successfully",

        data: {
          id:
            prescription._id,

          patient:
            prescription.patient,

          patientId:
            prescription.patientId,

          date:
            prescription.date,

          diagnosis:
            prescription.diagnosis,

          medicines:
            prescription.medicines.map(
              (med) => ({
                name:
                  med.name,

                dosage:
                  med.dosage,

                duration:
                  med.duration,
              })
            ),

          type:
            prescription.type,

          instructions:
            prescription.instructions,

          doctor: {
            name:
              prescription.doctorName,

            reg_no:
              prescription.reg_no,
          },
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };



// =====================================================
// ============ GET MY PRESCRIPTIONS ===================
// =====================================================

exports.getMyPrescriptions =
  async (req, res) => {
    try {
      // ================= FIND =================

      const prescriptions =
        await Prescription.find({
          doctorId:
            req.doctor._id,
        }).sort({
          createdAt: -1,
        });

      // ================= FORMAT =================

      const formattedData =
        prescriptions.map((item) => ({
          id:
            item._id,

          patient:
            item.patient,

          patientId:
            item.patientId,

          date:
            item.date,

          diagnosis:
            item.diagnosis,

          medicines:
            item.medicines.map(
              (med) => ({
                name:
                  med.name,

                dosage:
                  med.dosage,

                duration:
                  med.duration,
              })
            ),

          type:
            item.type,

          instructions:
            item.instructions,

          doctor: {
            name:
              item.doctorName,

            reg_no:
              item.reg_no,
          },
        }));

      // ================= RESPONSE =================

      res.status(200).json({
        success: true,

        message:
          "Prescriptions fetched successfully",

        data:
          formattedData,
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };



// =====================================================
// ============ GET SINGLE PRESCRIPTION ================
// =====================================================

exports.getSinglePrescription =
  async (req, res) => {
    try {
      // ================= FIND =================

      const prescription =
        await Prescription.findOne({
          _id:
            req.params.id,

          doctorId:
            req.doctor._id,
        });

      // ================= CHECK =================

      if (!prescription) {
        return res.status(404).json({
          success: false,

          message:
            "Prescription not found",
        });
      }

      // ================= RESPONSE =================

      res.status(200).json({
        success: true,

        data: {
          id:
            prescription._id,

          patient:
            prescription.patient,

          patientId:
            prescription.patientId,

          date:
            prescription.date,

          diagnosis:
            prescription.diagnosis,

          medicines:
            prescription.medicines.map(
              (med) => ({
                name:
                  med.name,

                dosage:
                  med.dosage,

                duration:
                  med.duration,
              })
            ),

          type:
            prescription.type,

          instructions:
            prescription.instructions,

          doctor: {
            name:
              prescription.doctorName,

            reg_no:
              prescription.reg_no,
          },
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };



// =====================================================
// ============ DELETE PRESCRIPTION ====================
// =====================================================

exports.deletePrescription =
  async (req, res) => {
    try {
      // ================= FIND =================

      const prescription =
        await Prescription.findOne({
          _id:
            req.params.id,

          doctorId:
            req.doctor._id,
        });

      // ================= CHECK =================

      if (!prescription) {
        return res.status(404).json({
          success: false,

          message:
            "Prescription not found",
        });
      }

      // ================= DELETE =================

      await prescription.deleteOne();

      // ================= RESPONSE =================

      res.status(200).json({
        success: true,

        message:
          "Prescription deleted successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,

        message:
          error.message,
      });
    }
  };