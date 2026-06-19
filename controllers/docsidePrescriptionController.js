const mongoose = require("mongoose");

const DocsidePrescription = require("../models/docsidePrescriptionModel");

const Appointment = require("../models/appointmentModel");

const MedicineItem = require("../models/pharmacyProductModel");

const createPrescription = async (req, res) => {
  try {
    const {
      appointmentId,
      chiefComplaints,
      examinationFindings,
      provisionalDiagnosis,
      clinicalNotes,
      medicines = [],
      symptoms = [],
      labInvestigations = [],
      dietaryInstructions,
      doctorsAdvice,
      patientId,
      patientName,
      complaints,
      findings,
      diagnosis,
      notes,
      dietInstructions,
      vitals = {},
      vitalsSummary,
      labReports = [],
      referralDoctor,
      language,
      consultationDuration,
      consultationDate,
    } = req.body;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const prescription = await DocsidePrescription.create({
      appointmentId,
      doctorId: req.doctor._id,
      userId: appointment.userId,
      chiefComplaints,
      examinationFindings,
      provisionalDiagnosis,
      clinicalNotes,
      medicines,
      symptoms,
      labInvestigations,
      dietaryInstructions,
      doctorsAdvice,
      patientId,
      patientName,
      complaints,
      findings,
      diagnosis,
      notes,
      dietInstructions,
      vitals,
      vitalsSummary,
      labReports,
      referralDoctor,
      language,
      consultationDuration,
      consultationDate,
    });

    res.status(201).json({
      success: true,
      message: "Prescription created successfully",
      data: prescription,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllMedicines = async (req, res) => {
  try {
    const medicines = await MedicineItem.find()

      .select(
        `
          _id
          productTitle
          brand
          category
          mrp
          stock
          image
          `,
      );

    res.status(200).json({
      success: true,

      data: medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getPrescriptionByAppointment = async (req, res) => {
  try {
    const prescription = await DocsidePrescription.findOne({
      appointmentId: req.params.appointmentId,
    })

      .populate({
        path: "doctorId",

        select: `
            name
            email
            speciality
            profileImage
            `,
      })

      .populate({
        path: "userId",

        select: `
            fullname
            email
            phone
            `,
      })

      .populate({
        path: "symptoms",

        select: `
            name
            image
            color
            `,
      });

    if (!prescription) {
      return res.status(404).json({
        success: false,

        message: "Prescription not found",
      });
    }

    const formattedPrescription = {
      ...prescription.toObject(),

      medicines: prescription.medicines.map((item) => ({
        productId: item.productId,

        dosage: item.dosage,

        frequency: item.frequency,

        duration: item.duration,

        instructions: item.instructions,
      })),
    };

    res.status(200).json({
      success: true,

      data: formattedPrescription,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePrescription = async (req, res) => {
  try {
    const prescription = await DocsidePrescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({
        success: false,

        message: "Prescription not found",
      });
    }

    Object.assign(prescription, req.body);

    await prescription.save();

    res.status(200).json({
      success: true,

      message: "Prescription updated successfully",

      data: prescription,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const deletePrescription = async (req, res) => {
  try {
    const prescription = await DocsidePrescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({
        success: false,

        message: "Prescription not found",
      });
    }

    await prescription.deleteOne();

    res.status(200).json({
      success: true,

      message: "Prescription deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  createPrescription,

  getAllMedicines,

  getPrescriptionByAppointment,

  updatePrescription,

  deletePrescription,
};
