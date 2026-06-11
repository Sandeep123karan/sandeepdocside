// // routes/docsidePrescriptionRoutes.js

// const express =
//   require("express");

// const router =
//   express.Router();



// /* =========================
//    ✅ CONTROLLER
// ========================= */

// const controller =
//   require(
//     "../controllers/docsidePrescriptionController"
//   );


 
// /* =========================
//    ✅ MIDDLEWARE
// ========================= */

// const {
//   protect,
// } = require(
//   "../middleware/authMiddleware"
// );




// /* =========================
//    🩺 PRESCRIPTION ROUTES
// ========================= */



// // ✅ CREATE PRESCRIPTION
// router.post(
//   "/",
//   protect,
//   controller.createPrescription
// );

// // ✅ GET ALL MEDICINES
// router.get(
//   "/medicines",
//   controller.getAllMedicines
// );

// // ✅ GET PRESCRIPTION BY APPOINTMENT
// router.get(
//   "/appointment/:appointmentId",
//   protect,
//   controller.getPrescriptionByAppointment
// );



// // ✅ UPDATE PRESCRIPTION
// router.put(
//   "/:id",
//   protect,
//   controller.updatePrescription
// );



// // ✅ DELETE PRESCRIPTION
// router.delete(
//   "/:id",
//   protect,
//   controller.deletePrescription
// );



// module.exports =
//   router;




// routes/docsidePrescriptionRoutes.js

const express =
  require("express");

const router =
  express.Router();


/* =========================
   ✅ CONTROLLERS
========================= */

const {

  createPrescription,

  getAllMedicines,

  getPrescriptionByAppointment,

  updatePrescription,

  deletePrescription,

} = require(
  "../controllers/docsidePrescriptionController"
);


/* =========================
   ✅ MIDDLEWARE
========================= */

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);


/* =========================
   🩺 PRESCRIPTION ROUTES
========================= */


// ✅ CREATE PRESCRIPTION

router.post(
  "/",
  protect,
  createPrescription
);


// ✅ GET ALL MEDICINES

router.get(
  "/medicines",
  protect,
  getAllMedicines
);


// ✅ GET PRESCRIPTION BY APPOINTMENT

router.get(
  "/appointment/:appointmentId",
  protect,
  getPrescriptionByAppointment
);


// ✅ UPDATE PRESCRIPTION

router.put(
  "/:id",
  protect,
  updatePrescription
);


// ✅ DELETE PRESCRIPTION

router.delete(
  "/:id",
  protect,
  deletePrescription
);


/* =========================
   ✅ EXPORT ROUTER
========================= */

module.exports =
  router;

