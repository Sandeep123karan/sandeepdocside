// routes/docsidePrescriptionRoutes.js

const express =
  require("express");

const router =
  express.Router();



/* =========================
   ✅ CONTROLLER
========================= */

const controller =
  require(
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
  controller.createPrescription
);



// ✅ GET PRESCRIPTION BY APPOINTMENT
router.get(
  "/appointment/:appointmentId",
  protect,
  controller.getPrescriptionByAppointment
);



// ✅ UPDATE PRESCRIPTION
router.put(
  "/:id",
  protect,
  controller.updatePrescription
);



// ✅ DELETE PRESCRIPTION
router.delete(
  "/:id",
  protect,
  controller.deletePrescription
);



module.exports =
  router;