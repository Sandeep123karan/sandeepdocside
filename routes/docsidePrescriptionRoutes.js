const express = require("express");

const router = express.Router();

const {
  createPrescription,

  getAllMedicines,

  getPrescriptionByAppointment,

  updatePrescription,

  deletePrescription,
} = require("../controllers/docsidePrescriptionController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createPrescription);

router.get("/medicines", protect, getAllMedicines);

router.get(
  "/appointment/:appointmentId",
  protect,
  getPrescriptionByAppointment,
);

router.put("/:id", protect, updatePrescription);

router.delete("/:id", protect, deletePrescription);

module.exports = router;
