// const express = require("express");

// const router = express.Router();



// // ================= CONTROLLERS =================

// const {
//   createPrescription,
//   getMyPrescriptions,
//   getSinglePrescription,
//   deletePrescription,
// } = require(
//   "../controllers/prescriptionController"
// );



// // ================= MIDDLEWARE =================

// const {
//   protect,
// } = require(
//   "../middleware/authMiddleware"
// );



// // =====================================================
// // ============ CREATE PRESCRIPTION ====================
// // =====================================================

// router.post(
//   "/create",

//   protect,

//   createPrescription
// );



// // =====================================================
// // ============ GET MY PRESCRIPTIONS ===================
// // =====================================================

// router.get(
//   "/my",

//   protect,

//   getMyPrescriptions
// );



// // =====================================================


// router.get(
//   "/:id",

//   protect,

//   getSinglePrescription
// );





// router.delete(
//   "/:id",

//   protect,

//   deletePrescription
// );



// // ================= EXPORT =================

// module.exports = router;


const express = require("express");

const router = express.Router();


// ================= CONTROLLERS =================

const {

  getMyPrescriptions,

  getSinglePrescription,

} = require(
  "../controllers/prescriptionController"
);


// ================= MIDDLEWARE =================

const {

  protect,

} = require(
  "../middleware/authMiddleware"
);


// =====================================================
// ============ GET MY PRESCRIPTIONS ===================
// =====================================================

router.get(

  "/my",

  protect,

  getMyPrescriptions
);


// =====================================================
// ============ GET SINGLE PRESCRIPTION ================
// =====================================================

router.get(

  "/:id",

  protect,

  getSinglePrescription
);


// ================= EXPORT =================

module.exports = router;