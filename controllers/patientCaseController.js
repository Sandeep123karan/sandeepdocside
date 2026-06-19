const Appointment = require("../models/appointmentModel");

const DocsidePrescription = require("../models/docsidePrescriptionModel");

exports.getPatientCompleteCase = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    if (!appointmentId) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment ID required" });
    }
    const currentAppointment = await Appointment.findById(appointmentId)

      .populate({
        path: "userId",

        select: `
            fullname
            email
            phone
            image
            `,
      })

      .populate({
        path: "doctorId",

        select: `
            name
            speciality
            experience
            fees
            image
            city
            state
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

    if (!currentAppointment) {
      return res.status(404).json({
        success: false,

        message: "Appointment not found",
      });
    }

    const allAppointments = await Appointment.find({
      userId: currentAppointment.userId._id,
      _id: { $ne: currentAppointment._id },
    })

      .populate({
        path: "doctorId",

        select: `
            name
            speciality
            experience
            image
            `,
      })

      .populate({
        path: "symptoms",

        select: `
            name
            image
            color
            `,
      })

      .sort({
        createdAt: -1,
      });

    const allPrescriptions = await DocsidePrescription.find({
      userId: currentAppointment.userId._id,
    })

      .populate({
        path: "doctorId",

        select: `
            name
            speciality
            image
            `,
      })

      .populate({
        path: "symptoms",

        select: `
            name
            image
            color
            `,
      })

      .populate({
        path: "medicines.productId",

        select: `
            productTitle
            brand
            category
            mrp
            image
            stock
            `,
      })

      .sort({
        createdAt: -1,
      });

    const timeline = allAppointments.map((appointment) => {
      const prescription = allPrescriptions.find(
        (p) =>
          p.appointmentId &&
          p.appointmentId.toString() === appointment._id.toString(),
      );

      return {
        appointmentId: appointment._id,

        date: appointment.date,

        time: appointment.time,

        reason: appointment.reason,

        status: appointment.status,

        paymentStatus: appointment.paymentStatus,

        doctor: appointment.doctorId,

        symptoms: appointment.symptoms || [],

        prescription: prescription || null,

        medicines: prescription?.medicines || [],

        diagnosis: prescription?.provisionalDiagnosis || "",

        clinicalNotes: prescription?.clinicalNotes || "",

        labInvestigations: prescription?.labInvestigations || [],

        createdAt: appointment.createdAt,
      };
    });

    const summary = {
      totalAppointments: allAppointments.length,

      totalPrescriptions: allPrescriptions.length,

      completedAppointments: allAppointments.filter(
        (a) => a.status === "completed",
      ).length,

      pendingAppointments: allAppointments.filter((a) => a.status === "pending")
        .length,

      cancelledAppointments: allAppointments.filter(
        (a) => a.status === "cancelled",
      ).length,

      paidAppointments: allAppointments.filter(
        (a) => a.paymentStatus === "PAID",
      ).length,
    };

    res.status(200).json({
      success: true,

      patient: currentAppointment.userId,

      currentAppointment,

      summary,

      medicalTimeline: timeline,
    });
  } catch (error) {
    console.log("PATIENT HISTORY ERROR =>", error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
