// const Doctor = require(
//   "../models/doctorModel"
// );

// const bcrypt = require("bcryptjs");

// const jwt = require("jsonwebtoken");



// // =====================================================
// // ================= GENERATE TOKEN ====================
// // =====================================================

// const generateToken = (id) => {
//   return jwt.sign(
//     { id },

//     process.env.JWT_SECRET,

//     {
//       expiresIn: "30d",
//     }
//   );
// };



// // =====================================================
// // ================= REGISTER DOCTOR ===================
// // =====================================================

// exports.registerDoctor =
//   async (req, res) => {
//     try {
//       const {
//         name,
//         email,
//         password,
//         phoneNumber,
//         degree,
//         qualification,
//         speciality,
//         experience,
//         fees,
//         latitude,
//         longitude,
//         address,
//         city,
//         state,
//         pincode,
//       } = req.body;

//       // ================= VALIDATION =================

//       if (
//         !name ||
//         !email ||
//         !password
//       ) {
//         return res.status(400).json({
//           success: false,

//           message:
//             "All fields are required",
//         });
//       }

//       // ================= CHECK EMAIL =================

//       const existingDoctor =
//         await Doctor.findOne({
//           email,
//         });

//       if (existingDoctor) {
//         return res.status(400).json({
//           success: false,

//           message:
//             "Doctor already exists",
//         });
//       }

//       // ================= HASH PASSWORD =================

//       const hashedPassword =
//         await bcrypt.hash(
//           password,
//           10
//         );

//       // ================= IMAGE =================

//       let imageData = {
//         url: "",
//         publicId: "",
//       };

//       if (req.file) {
//         imageData.url =
//           `/uploads/${req.file.filename}`;
//       }

//       // ================= CREATE DOCTOR =================

//       const doctor =
//         await Doctor.create({
//           name,

//           email,

//           password:
//             hashedPassword,

//           phoneNumber,

//           degree,

//           qualification,

//           speciality,

//           experience,

//           fees,

//           image: imageData,

//           address,

//           city,

//           state,

//           pincode,

//           // ================= LOCATION =================

//           location: {
//             type: "Point",

//             coordinates: [
//               parseFloat(
//                 longitude || 0
//               ),

//               parseFloat(
//                 latitude || 0
//               ),
//             ],
//           },

//           isApproved: false,

//           isBlocked: false,
//         });

//       // ================= RESPONSE =================

//       res.status(201).json({
//         success: true,

//         message:
//           "Doctor registered successfully",

//         doctor,
//       });
//     } catch (error) {
//       console.log(error);

//       res.status(500).json({
//         success: false,

//         message:
//           error.message,
//       });
//     }
//   };



// // =====================================================
// // ================= LOGIN DOCTOR ======================
// // =====================================================

// exports.loginDoctor =
//   async (req, res) => {
//     try {
//       const {
//         email,
//         password,
//       } = req.body;

//       // ================= VALIDATION =================

//       if (
//         !email ||
//         !password
//       ) {
//         return res.status(400).json({
//           success: false,

//           message:
//             "Email and password are required",
//         });
//       }

//       // ================= FIND DOCTOR =================

//       const doctor =
//         await Doctor.findOne({
//           email,
//         });

//       if (!doctor) {
//         return res.status(404).json({
//           success: false,

//           message:
//             "Doctor not found",
//         });
//       }

//       // ================= CHECK PASSWORD =================

//       const isMatch =
//         await bcrypt.compare(
//           password,
//           doctor.password
//         );

//       if (!isMatch) {
//         return res.status(401).json({
//           success: false,

//           message:
//             "Invalid password",
//         });
//       }

//       // ================= BLOCK CHECK =================

//       if (doctor.isBlocked) {
//         return res.status(403).json({
//           success: false,

//           message:
//             "Doctor account blocked",
//         });
//       }

//       // ================= APPROVAL CHECK =================

//       if (!doctor.isApproved) {
//         return res.status(403).json({
//           success: false,

//           message:
//             "Waiting for admin approval",
//         });
//       }

//       // ================= TOKEN =================

//       const token =
//         generateToken(
//           doctor._id
//         );

//       // ================= RESPONSE =================

//       res.status(200).json({
//         success: true,

//         message:
//           "Login successful",

//         token,

//         doctor,
//       });
//     } catch (error) {
//       console.log(error);

//       res.status(500).json({
//         success: false,

//         message:
//           error.message,
//       });
//     }
//   };



// // =====================================================
// // ================= GET PROFILE =======================
// // =====================================================

// exports.getDoctorProfile =
//   async (req, res) => {
//     try {
//       const doctor =
//         await Doctor.findById(
//           req.doctor._id
//         ).select("-password");

//       if (!doctor) {
//         return res.status(404).json({
//           success: false,

//           message:
//             "Doctor not found",
//         });
//       }

//       res.status(200).json({
//         success: true,

//         doctor,
//       });
//     } catch (error) {
//       console.log(error);

//       res.status(500).json({
//         success: false,

//         message:
//           error.message,
//       });
//     }
//   };




// controllers/doctorController.js

const Doctor =
  require("../models/doctorModel");

const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");



/* =========================
   🔑 GENERATE TOKEN
========================= */

const generateToken =
  (id) => {

    return jwt.sign(

      { id },

      process.env.JWT_SECRET,

      {
        expiresIn: "30d",
      }

    );

  };





/* =========================
   👨‍⚕️ REGISTER DOCTOR
========================= */

exports.registerDoctor =
  async (req, res) => {

    try {

      const {

        // ✅ BASIC
        name,
        email,
        password,
        phoneNumber,

        // ✅ PROFILE
        speciality,

        // ✅ REGISTRATION
        registrationNumber,
        medicalCouncil,
        primaryDegree,
        postGraduate,

        // ✅ EXPERIENCE
        yearsExperience,
        surgeries,
        awards,
        summary,

        // ✅ CLINIC
        clinicName,
        address,
        timing,

        // ✅ LOCATION
        city,
        state,
        pincode,

        latitude,
        longitude,

        // ✅ FEES
        fees,

        // ✅ SPECIALTIES
        specialties,

        // ✅ WORK LIST
        workList,

      } = req.body;



      /* =========================
         VALIDATION
      ========================= */

      if (

        !name ||
        !email ||
        !password ||
        !speciality

      ) {

        return res.status(400).json({

          success: false,

          message:
            "All required fields are mandatory",

        });

      }



      /* =========================
         CHECK EXISTING
      ========================= */

      const existingDoctor =
        await Doctor.findOne({
          email,
        });

      if (existingDoctor) {

        return res.status(400).json({

          success: false,

          message:
            "Doctor already exists",

        });

      }



      /* =========================
         HASH PASSWORD
      ========================= */

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );



      /* =========================
         IMAGES
      ========================= */

      let doctorImagePath =
        "";

      let clinicImagePath =
        "";

        let medicalLicenseCopy =
  "";

let idProof =
  "";



      // ✅ DOCTOR IMAGE
      if (
        req.files &&
        req.files[
          "doctorImagePath"
        ]
      ) {

        doctorImagePath =
          `/uploads/${
            req.files[
              "doctorImagePath"
            ][0].filename
          }`;

      }



      // ✅ CLINIC IMAGE
      if (
        req.files &&
        req.files[
          "clinicImagePath"
        ]
      ) {

        clinicImagePath =
          `/uploads/${
            req.files[
              "clinicImagePath"
            ][0].filename
          }`;

      }
      /* =========================
   ✅ MEDICAL LICENSE
========================= */

if (

  req.files &&
  req.files[
    "medicalLicenseCopy"
  ]

) {

  medicalLicenseCopy =
    `/uploads/${
      req.files[
        "medicalLicenseCopy"
      ][0].filename
    }`;

}



/* =========================
   ✅ ID PROOF
========================= */

if (

  req.files &&
  req.files[
    "idProof"
  ]

) {

  idProof =
    `/uploads/${
      req.files[
        "idProof"
      ][0].filename
    }`;

}



      /* =========================
         CREATE DOCTOR
      ========================= */

      const doctor =
        await Doctor.create({

          // ✅ BASIC
          name,

          email,

          password:
            hashedPassword,

          phoneNumber,



          // ✅ PROFILE
          speciality,

          doctorImagePath,

          clinicImagePath,



          // ✅ REGISTRATION
          registrationNumber,

          medicalCouncil,

          primaryDegree,

          postGraduate,



          licenseStatus:
            "Pending",

          idStatus:
            "Pending",

          isLicenseVerified:
            false,

          isIdVerified:
            false,
            // ✅ DOCUMENTS

medicalLicenseCopy,

idProof,



          // ✅ EXPERIENCE
          yearsExperience,

          surgeries,

          awards,

          summary,



          // ✅ WORK EXPERIENCE
       workList:
  Array.isArray(workList)
    ? workList
    : [],

specialties:
  Array.isArray(specialties)
    ? specialties
    : [],



          // ✅ CLINIC
          clinicName,

          address,

          timing,



        



          // ✅ LOCATION
          city,

          state,

          pincode,



          location: {

            type:
              "Point",

            coordinates: [

              parseFloat(
                longitude || 0
              ),

              parseFloat(
                latitude || 0
              ),

            ],

          },



          // ✅ FEES
          fees,



          // ✅ STATUS
          isApproved:
            false,

          isBlocked:
            false,

        });



      /* =========================
         RESPONSE
      ========================= */

      res.status(201).json({

        success: true,

        message:
          "Doctor registered successfully",

        doctor,

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
   🔐 LOGIN DOCTOR
========================= */

exports.loginDoctor =
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;



      /* =========================
         VALIDATION
      ========================= */

      if (
        !email ||
        !password
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Email and password are required",

        });

      }



      /* =========================
         FIND DOCTOR
      ========================= */

      const doctor =
        await Doctor.findOne({
          email,
        });

      if (!doctor) {

        return res.status(404).json({

          success: false,

          message:
            "Doctor not found",

        });

      }



      /* =========================
         PASSWORD CHECK
      ========================= */

      const isMatch =
        await bcrypt.compare(

          password,

          doctor.password

        );

      if (!isMatch) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid password",

        });

      }



      /* =========================
         BLOCK CHECK
      ========================= */

      if (doctor.isBlocked) {

        return res.status(403).json({

          success: false,

          message:
            "Doctor account blocked",

        });

      }



      /* =========================
         APPROVAL CHECK
      ========================= */

      if (!doctor.isApproved) {

        return res.status(403).json({

          success: false,

          message:
            "Waiting for admin approval",

        });

      }



      /* =========================
         TOKEN
      ========================= */

      const token =
        generateToken(
          doctor._id
        );



      /* =========================
         RESPONSE
      ========================= */

      res.status(200).json({

        success: true,

        message:
          "Login successful",

        token,

        doctor,

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
   👨‍⚕️ GET PROFILE
========================= */

exports.getDoctorProfile =
  async (req, res) => {

    try {

      const doctor =
        await Doctor.findById(
          req.doctor._id
        ).select("-password");



      if (!doctor) {

        return res.status(404).json({

          success: false,

          message:
            "Doctor not found",

        });

      }



      res.status(200).json({

        success: true,

        doctor,

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







// /* =========================
//    ✏️ UPDATE PROFILE
// ========================= */

// exports.updateDoctorProfile =
//   async (req, res) => {

//     try {

//       const doctor =
//         await Doctor.findById(
//           req.doctor._id
//         );



//       if (!doctor) {

//         return res.status(404).json({

//           success: false,

//           message:
//             "Doctor not found",

//         });

//       }



//       // ✅ UPDATE ALL FIELDS

//       Object.keys(req.body)
//         .forEach((key) => {

//           doctor[key] =
//             req.body[key];

//         });



//       await doctor.save();



//       res.status(200).json({

//         success: true,

//         message:
//           "Profile updated successfully",

//         doctor,

//       });

//     } catch (error) {

//       console.log(error);



//       res.status(500).json({

//         success: false,

//         message:
//           error.message,

//       });

//     }

//   };



/* =========================
   ✏️ UPDATE PROFILE
========================= */

exports.updateDoctorProfile =
  async (req, res) => {

    try {

      const doctor =
        await Doctor.findById(
          req.doctor._id
        );



      if (!doctor) {

        return res.status(404).json({

          success: false,

          message:
            "Doctor not found",

        });

      }



      /* =========================
         ✅ UPDATE TEXT FIELDS
      ========================= */

      Object.keys(req.body)
        .forEach((key) => {

          doctor[key] =
            req.body[key];

        });




      /* =========================
         ✅ UPDATE DOCTOR IMAGE
      ========================= */

      if (

        req.files &&
        req.files[
          "doctorImagePath"
        ]

      ) {

        doctor.doctorImagePath =
          `/uploads/${
            req.files[
              "doctorImagePath"
            ][0].filename
          }`;

      }




      /* =========================
         ✅ UPDATE CLINIC IMAGE
      ========================= */

      if (

        req.files &&
        req.files[
          "clinicImagePath"
        ]

      ) {

        doctor.clinicImagePath =
          `/uploads/${
            req.files[
              "clinicImagePath"
            ][0].filename
          }`;

      }




      /* =========================
         ✅ UPDATE MEDICAL LICENSE
      ========================= */

      if (

        req.files &&
        req.files[
          "medicalLicenseCopy"
        ]

      ) {

        doctor.medicalLicenseCopy =
          `/uploads/${
            req.files[
              "medicalLicenseCopy"
            ][0].filename
          }`;

      }




      /* =========================
         ✅ UPDATE ID PROOF
      ========================= */

      if (

        req.files &&
        req.files[
          "idProof"
        ]

      ) {

        doctor.idProof =
          `/uploads/${
            req.files[
              "idProof"
            ][0].filename
          }`;

      }




      /* =========================
         ✅ SAVE
      ========================= */

      await doctor.save();




      /* =========================
         ✅ RESPONSE
      ========================= */

      res.status(200).json({

        success: true,

        message:
          "Profile updated successfully",

        doctor,

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