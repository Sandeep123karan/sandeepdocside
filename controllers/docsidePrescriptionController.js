// // controllers/docsidePrescriptionController.js

// const DocsidePrescription =
//   require(
//     "../models/docsidePrescriptionModel"
//   );

// const Appointment =
//   require(
//     "../models/appointmentModel"
//   );
// const MedicineItem =
//   require("../models/pharmacyProductModel");


// /* =========================
//    ✅ CREATE PRESCRIPTION
// ========================= */

// exports.createPrescription =
//   async (req, res) => {

//     try {

//       const {

//         appointmentId,

//         chiefComplaints,

//         examinationFindings,

//         provisionalDiagnosis,

//         clinicalNotes,

//         medicines,
//         symptoms,

//         labInvestigations,

//         dietaryInstructions,

//         doctorsAdvice,

//       } = req.body;



//       /* =========================
//          ✅ CHECK APPOINTMENT
//       ========================= */

//       const appointment =
//         await Appointment.findById(
//           appointmentId
//         );

//       if (!appointment) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Appointment not found",

//         });

//       }



//       /* =========================
//          ✅ CHECK DOCTOR OWNER
//       ========================= */

//       if (
//         appointment.doctorId.toString() !==
//         req.doctor._id.toString()
//       ) {

//         return res.status(403).json({

//           success: false,

//           message:
//             "Not authorized",

//         });

//       }



//       /* =========================
//          ✅ CHECK EXISTING
//       ========================= */

//       const existingPrescription =
//         await DocsidePrescription.findOne({

//           appointmentId,

//         });

//       if (existingPrescription) {

//         return res.status(400).json({

//           success: false,

//           message:
//             "Prescription already exists",

//         });

//       }



//       /* =========================
//          ✅ CREATE PRESCRIPTION
//       ========================= */

//       const prescription =
//         await DocsidePrescription.create({

//           appointmentId,

//           doctorId:
//             req.doctor._id,

//           userId:
//             appointment.userId,

//           chiefComplaints,

//           examinationFindings,

//           provisionalDiagnosis,

//           clinicalNotes,

//           medicines,
//           symptoms,

//           labInvestigations,

//           dietaryInstructions,

//           doctorsAdvice,

//         });



//       /* =========================
//          ✅ COMPLETE APPOINTMENT
//       ========================= */

//       appointment.status =
//         "completed";

//       await appointment.save();



//       /* =========================
//          ✅ RESPONSE
//       ========================= */

//       res.status(201).json({

//         success: true,

//         message:
//           "Prescription created successfully",

//         data:
//           prescription,

//       });

//     } catch (error) {

//       console.log(
//         "CREATE PRESCRIPTION ERROR =>",
//         error
//       );

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };





// /* =========================
//    ✅ GET PRESCRIPTION
// ========================= */

// // exports.getPrescriptionByAppointment =
// //   async (req, res) => {

// //     try {

// //       const prescription =
// //         await DocsidePrescription.findOne({

// //           appointmentId:
// //             req.params.appointmentId,

// //         })

// //           // .populate(
// //           //   "doctorId",
// //           //   "name email"
// //           // )

// //           // .populate(
// //           //   "userId",
// //           //   "fullname email phone"
// //           // );
// // .populate({

// //   path: "doctorId",

// //   select:
// //     "name email phone speciality experience gender profileImage clinicAddress",

// // })

// // .populate({

// //   path: "userId",

// //   select:
// //     "fullname email phone gender age profileImage address",

// // })

// // .populate({

// //   path: "appointmentId",

// // });


// //       if (!prescription) {

// //         return res.status(404).json({

// //           success: false,

// //           message:
// //             "Prescription not found",

// //         });

// //       }



// //       res.status(200).json({

// //         success: true,

// //         data:
// //           prescription,

// //       });

// //     } catch (error) {

// //       console.log(
// //         "GET PRESCRIPTION ERROR =>",
// //         error
// //       );

// //       res.status(500).json({

// //         success: false,

// //         message:
// //           error.message,

// //       });

// //     }

// //   };

// /* =========================
//    ✅ GET PRESCRIPTION
// ========================= */

// exports.getPrescriptionByAppointment =
//   async (req, res) => {

//     try {

//       const prescription =
//         await DocsidePrescription.findOne({

//           appointmentId:
//             req.params.appointmentId,

//         })

//         // ================= DOCTOR =================

//         .populate({

//           path: "doctorId",

//           select:
//             "_id name email phone speciality experience gender profileImage clinicAddress fees",

//         })

//         // ================= USER =================

//         .populate({

//           path: "userId",

//           select:
//             "_id fullname email phone gender age profileImage address",

//         })

//         // ================= APPOINTMENT =================
// .populate({
//   path: "symptoms",
//   select: "name image color",
// })
// // ✅ MEDICINES

// // ✅ MEDICINES

// .populate({

//   path:
//     "medicines.productId",

//   select:
//     `
//     productTitle
//     brand
//     category
//     mrp
//     image
//     stock
//     `,

// })


//         .populate({

//           path: "appointmentId",

//         });
        

//       // ================= CHECK =================

//       if (!prescription) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Prescription not found",

//         });

//       }

//       // ================= RESPONSE =================

//       res.status(200).json({

//         success: true,

//         data:
//           prescription,

//       });

//     } catch (error) {

//       console.log(
//         "GET PRESCRIPTION ERROR =>",
//         error
//       );

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

// };



// /* =========================
//    ✅ UPDATE PRESCRIPTION
// ========================= */

// // exports.updatePrescription =
// //   async (req, res) => {

// //     try {

// //       const prescription =
// //         await DocsidePrescription.findById(
// //           req.params.id
// //         );

// //       if (!prescription) {

// //         return res.status(404).json({

// //           success: false,

// //           message:
// //             "Prescription not found",

// //         });

// //       }



// //       // ✅ CHECK OWNER
// //       if (
// //         prescription.doctorId.toString() !==
// //         req.doctor._id.toString()
// //       ) {

// //         return res.status(403).json({

// //           success: false,

// //           message:
// //             "Not authorized",

// //         });

// //       }



// //       // ✅ UPDATE DATA
// //       prescription.chiefComplaints =
// //         req.body.chiefComplaints ||
// //         prescription.chiefComplaints;

// //       prescription.examinationFindings =
// //         req.body.examinationFindings ||
// //         prescription.examinationFindings;

// //       prescription.provisionalDiagnosis =
// //         req.body.provisionalDiagnosis ||
// //         prescription.provisionalDiagnosis;

// //       prescription.clinicalNotes =
// //         req.body.clinicalNotes ||
// //         prescription.clinicalNotes;

// //       prescription.medicines =
// //         req.body.medicines ||
// //         prescription.medicines;

// //       prescription.labInvestigations =
// //         req.body.labInvestigations ||
// //         prescription.labInvestigations;

// //       prescription.dietaryInstructions =
// //         req.body.dietaryInstructions ||
// //         prescription.dietaryInstructions;

// //       prescription.doctorsAdvice =
// //         req.body.doctorsAdvice ||
// //         prescription.doctorsAdvice;



// //       await prescription.save();



// //       res.status(200).json({

// //         success: true,

// //         message:
// //           "Prescription updated successfully",

// //         data:
// //           prescription,

// //       });

// //     } catch (error) {

// //       console.log(
// //         "UPDATE PRESCRIPTION ERROR =>",
// //         error
// //       );

// //       res.status(500).json({

// //         success: false,

// //         message:
// //           error.message,

// //       });

// //     }

// //   };
// /* =========================
//    ✅ UPDATE PRESCRIPTION
// ========================= */

// exports.updatePrescription =
//   async (req, res) => {

//     try {

//       const prescription =
//         await DocsidePrescription.findById(
//           req.params.id
//         );

//       // ✅ CHECK PRESCRIPTION
//       if (!prescription) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Prescription not found",

//         });

//       }

//       // ✅ CHECK DOCTOR OWNER
//       if (
//         prescription.doctorId.toString() !==
//         req.doctor._id.toString()
//       ) {

//         return res.status(403).json({

//           success: false,

//           message:
//             "Not authorized",

//         });

//       }

//       /* =========================
//          ✅ UPDATE FIELDS
//       ========================= */

//       prescription.chiefComplaints =
//         req.body.chiefComplaints ??
//         prescription.chiefComplaints;

//       prescription.examinationFindings =
//         req.body.examinationFindings ??
//         prescription.examinationFindings;

//       prescription.provisionalDiagnosis =
//         req.body.provisionalDiagnosis ??
//         prescription.provisionalDiagnosis;

//       prescription.clinicalNotes =
//         req.body.clinicalNotes ??
//         prescription.clinicalNotes;

//       prescription.medicines =
//         req.body.medicines ??
//         prescription.medicines;

//       // ✅ SYMPTOMS UPDATE
//       prescription.symptoms =
//         req.body.symptoms ??
//         prescription.symptoms;

//       prescription.labInvestigations =
//         req.body.labInvestigations ??
//         prescription.labInvestigations;

//       prescription.dietaryInstructions =
//         req.body.dietaryInstructions ??
//         prescription.dietaryInstructions;

//       prescription.doctorsAdvice =
//         req.body.doctorsAdvice ??
//         prescription.doctorsAdvice;

//       /* =========================
//          ✅ SAVE
//       ========================= */

//       await prescription.save();

//       /* =========================
//          ✅ RESPONSE
//       ========================= */

//       res.status(200).json({

//         success: true,

//         message:
//           "Prescription updated successfully",

//         data:
//           prescription,

//       });

//     } catch (error) {

//       console.log(
//         "UPDATE PRESCRIPTION ERROR =>",
//         error
//       );

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };




// /* =========================
//    ✅ DELETE PRESCRIPTION
// ========================= */

// exports.deletePrescription =
//   async (req, res) => {

//     try {

//       const prescription =
//         await DocsidePrescription.findById(
//           req.params.id
//         );

//       if (!prescription) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Prescription not found",

//         });

//       }



//       // ✅ CHECK OWNER
//       if (
//         prescription.doctorId.toString() !==
//         req.doctor._id.toString()
//       ) {

//         return res.status(403).json({

//           success: false,

//           message:
//             "Not authorized",

//         });

//       }



//       await prescription.deleteOne();



//       res.status(200).json({

//         success: true,

//         message:
//           "Prescription deleted successfully",

//       });

//     } catch (error) {

//       console.log(
//         "DELETE PRESCRIPTION ERROR =>",
//         error
//       );

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };

// /* =========================
//    ✅ GET ALL MEDICINES
// ========================= */

// exports.getAllMedicines =
//   async (req, res) => {

//     try {

//       const medicines =
//         await MedicineItem.find()

//         .select(
//           "_id productTitle brand category mrp image stock"
//         )

//         .sort({
//           createdAt: -1,
//         });

//       res.status(200).json({

//         success: true,

//         total:
//           medicines.length,

//         data:
//           medicines,

//       });

//     } catch (error) {

//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };



// controllers/docsidePrescriptionController.js

const mongoose =
  require("mongoose");

const DocsidePrescription =
  require(
    "../models/docsidePrescriptionModel"
  );

const Appointment =
  require(
    "../models/appointmentModel"
  );

const MedicineItem =
  require(
    "../models/pharmacyProductModel"
  );


/* =========================
   ✅ CREATE PRESCRIPTION
========================= */

const createPrescription =
  async (req, res) => {

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

      } = req.body;


      // ✅ CHECK APPOINTMENT

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


      // ✅ CREATE

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

          symptoms,

          labInvestigations,

          dietaryInstructions,

          doctorsAdvice,

        });


      res.status(201).json({

        success: true,

        message:
          "Prescription created successfully",

        data:
          prescription,

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



/* =========================
   ✅ GET ALL MEDICINES
========================= */

const getAllMedicines =
  async (req, res) => {

    try {

      const medicines =
        await MedicineItem.find()

        .select(
          `
          _id
          productTitle
          brand
          category
          mrp
          stock
          image
          `
        );

      res.status(200).json({

        success: true,

        data:
          medicines,

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
   ✅ GET PRESCRIPTION
========================= */

const getPrescriptionByAppointment =
  async (req, res) => {

    try {

      const prescription =
        await DocsidePrescription.findOne({

          appointmentId:
            req.params.appointmentId,

        })

        .populate({

          path: "doctorId",

          select:
            `
            name
            email
            speciality
            profileImage
            `,
        })

        .populate({

          path: "userId",

          select:
            `
            fullname
            email
            phone
            `,
        })

        .populate({

          path: "symptoms",

          select:
            `
            name
            image
            color
            `,
        })

        .populate({

          path:
            "medicines.productId",

          select:
            `
            productTitle
            brand
            category
            mrp
            image
            stock
            `,
        });


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

      console.log(error);

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

const updatePrescription =
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


      Object.assign(
        prescription,
        req.body
      );

      await prescription.save();


      res.status(200).json({

        success: true,

        message:
          "Prescription updated successfully",

        data:
          prescription,

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
   ✅ DELETE PRESCRIPTION
========================= */

const deletePrescription =
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

      await prescription.deleteOne();

      res.status(200).json({

        success: true,

        message:
          "Prescription deleted successfully",

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
   ✅ EXPORTS
========================= */

module.exports = {

  createPrescription,

  getAllMedicines,

  getPrescriptionByAppointment,

  updatePrescription,

  deletePrescription,

};

