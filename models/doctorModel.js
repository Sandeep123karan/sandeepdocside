// const mongoose = require("mongoose");

// const doctorSchema =
//   new mongoose.Schema(
//     {
//       // ================= BASIC =================

//       name: {
//         type: String,
//         required: true,
//         trim: true,
//       },

//       email: {
//         type: String,
//         unique: true,
//         sparse: true,
//         trim: true,
//       },

//       password: {
//         type: String,
//       },

//       phoneNumber: {
//         type: String,
//         default: "",
//       },



//       // ================= PROFESSIONAL =================

//       degree: {
//         type: String,
//         trim: true,
//       },

//       qualification: {
//         type: String,
//         default: "",
//       },

//       speciality: {
//         type: String,
//         trim: true,
//       },

//       experience: {
//         type: String,
//         trim: true,
//       },

//       fees: {
//         type: Number,
//         default: 0,
//       },



//       // ================= IMAGE =================

//       image: {
//         url: {
//           type: String,
//           default: "",
//         },

//         publicId: {
//           type: String,
//           default: "",
//         },
//       },



//       // ================= RATING =================

//       rating: {
//         type: Number,
//         default: 0,
//         min: 0,
//         max: 5,
//       },

//       reviews: {
//         type: Number,
//         default: 0,
//       },



//       // ================= LOCATION =================

//       location: {
//         type: {
//           type: String,
//           enum: ["Point"],
//           default: "Point",
//         },

//         coordinates: {
//           type: [Number],
//           required: true,
//         },
//       },

//       address: {
//         type: String,
//         default: "",
//       },

//       city: {
//         type: String,
//         default: "",
//       },

//       state: {
//         type: String,
//         default: "",
//       },

//       pincode: {
//         type: String,
//         default: "",
//       },



//       // ================= STATUS =================

//       isActive: {
//         type: Boolean,
//         default: true,
//       },

//       isApproved: {
//         type: Boolean,
//         default: false,
//       },

//       isBlocked: {
//         type: Boolean,
//         default: false,
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );



// // ================= GEO INDEX =================

// doctorSchema.index({
//   location: "2dsphere",
// });



// module.exports =
//   mongoose.models.Doctor ||
//   mongoose.model(
//     "Doctor",
//     doctorSchema
//   );





const mongoose =
  require("mongoose");



/* =========================
   WORK EXPERIENCE
========================= */

const workExperienceSchema =
  new mongoose.Schema({

    role: {
      type: String,
      default: "",
    },

    hospital: {
      type: String,
      default: "",
    },

    period: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    isCurrent: {
      type: Boolean,
      default: false,
    },

  });



/* =========================
   DOCTOR MODEL
========================= */

const doctorSchema =
  new mongoose.Schema({

    // ================= BASIC =================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      default: "",
    },



    // ================= PROFILE =================

    speciality: {
      type: String,
      default: "",
    },

    doctorImagePath: {
      type: String,
      default: "",
    },

    clinicImagePath: {
      type: String,
      default: "",
    },



    // ================= REGISTRATION =================

    registrationNumber: {
      type: String,
      default: "",
    },

    medicalCouncil: {
      type: String,
      default: "",
    },

    primaryDegree: {
      type: String,
      default: "",
    },

    postGraduate: {
      type: String,
      default: "",
    },

    licenseStatus: {
      type: String,
      default: "Pending",
    },

    idStatus: {
      type: String,
      default: "Pending",
    },

    isLicenseVerified: {
      type: Boolean,
      default: false,
    },

    isIdVerified: {
      type: Boolean,
      default: false,
    },

    // ================= DOCUMENTS =================

medicalLicenseCopy: {

  type: String,

  default: "",

},

idProof: {

  type: String,

  default: "",

},



    // ================= EXPERIENCE =================

    yearsExperience: {
      type: String,
      default: "",
    },

    surgeries: {
      type: String,
      default: "",
    },

    awards: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      default: "",
    },

    workList: [
      workExperienceSchema
    ],



    // ================= CLINIC =================

    clinicName: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    timing: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    specialties: [
      {
        type: String,
      },
    ],



    // ================= LOCATION =================

    location: {

      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },

      coordinates: {
        type: [Number],
        default: [0, 0],
      },

    },



    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    pincode: {
      type: String,
      default: "",
    },



    // ================= FEES =================

    fees: {
      type: Number,
      default: 0,
    },



    // ================= STATUS =================

    isApproved: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

  },

  {
    timestamps: true,
  }
);



doctorSchema.index({
  location: "2dsphere",
});



module.exports =
  mongoose.model(
    "Doctor",
    doctorSchema
  );