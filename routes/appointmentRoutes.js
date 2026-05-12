const express = require("express");

const router = express.Router();

const controller =
  require(
    "../controllers/appointmentController"
  );

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);



/* =========================
   👨‍⚕️ DOCTOR ROUTES
========================= */

// ✅ GET APPOINTMENTS
router.get(
  "/my-appointments",
  protect,
  controller.getDoctorAppointments
);

// ✅ UPDATE VITALS
router.put(
  "/:id/vitals",
  protect,
  controller.updateVitals
);

// ✅ COMPLETE
router.put(
  "/:id/complete",
  protect,
  controller.completeAppointment
);

// ✅ CANCEL
router.put(
  "/:id/cancel",
  protect,
  controller.cancelAppointment
);

module.exports =
  router;