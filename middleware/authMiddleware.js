const jwt = require("jsonwebtoken");

const Doctor = require(
  "../models/doctorModel"
);



// ================= PROTECT MIDDLEWARE =================

exports.protect = async (
  req,
  res,
  next
) => {
  try {
    let token;

    // ================= GET TOKEN =================

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {
      token =
        req.headers.authorization.split(
          " "
        )[1];
    }

    // ================= CHECK TOKEN =================

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    // ================= VERIFY TOKEN =================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ================= FIND DOCTOR =================

    const doctor =
      await Doctor.findById(
        decoded.id
      ).select("-password");

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    // ================= CHECK BLOCKED =================

    if (doctor.isBlocked) {
      return res.status(403).json({
        success: false,
        message:
          "Your account is blocked",
      });
    }

    // ================= STORE LOGIN USER =================

    req.doctor = doctor;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      success: false,
      message: "Token failed",
    });
  }
};