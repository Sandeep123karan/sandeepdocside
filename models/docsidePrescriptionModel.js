const mongoose = require("mongoose");

const prescribedMedicineSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MedicineItem",
    required: true,
  },

  medicineName: {
    type: String,
    default: "",
  },

  dosage: {
    type: String,
    default: "",
  },

  frequency: {
    type: String,
    default: "",
  },

  duration: {
    type: String,
    default: "",
  },

  instructions: {
    type: String,
    default: "",
  },
});

const docsidePrescriptionSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    patientName: {
      type: String,
      default: "",
    },

    patientAge: {
      type: Number,
      default: 0,
    },

    patientGender: {
      type: String,
      default: "",
    },

    patientImage: {
      type: String,
      default: "",
    },

    chiefComplaints: {
      type: String,
      default: "",
    },

    examinationFindings: {
      type: String,
      default: "",
    },

    provisionalDiagnosis: {
      type: String,
      default: "",
    },

    clinicalNotes: {
      type: String,
      default: "",
    },

    complaints: {
      type: String,
      default: "",
    },

    findings: {
      type: String,
      default: "",
    },

    diagnosis: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    dietInstructions: {
      type: String,
      default: "",
    },

    dietaryInstructions: {
      type: String,
      default: "",
    },

    doctorsAdvice: {
      type: String,
      default: "",
    },

    vitals: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    vitalsSummary: {
      type: String,
      default: "",
    },

    allergies: [
      {
        type: String,
      },
    ],

    comorbidities: [
      {
        type: String,
      },
    ],

    labReports: [
      {
        type: String,
      },
    ],

    labInvestigations: [
      {
        type: String,
      },
    ],

    referralDoctor: {
      type: String,
      default: "",
    },

    symptoms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OnlineSymptom",
      },
    ],

    medicines: [prescribedMedicineSchema],

    language: {
      type: String,
      default: "English",
    },

    consultationDuration: {
      type: Number,
      default: 0,
    },

    consultationDate: {
      type: Date,
    },

    pdfUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  "DocsidePrescription",
  docsidePrescriptionSchema,
);
