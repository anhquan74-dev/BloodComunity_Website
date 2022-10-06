import express from "express";
let router = express.Router();
import userController from "../controllers/userController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";

let initWebRoutes = (app) => {
  //User
  router.post("/api/register", userController.handleRegister);
  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.get("/api/get-user-by-id", userController.handleGetUserById); //admin
  router.post("/api/create-new-user", userController.handleRegister); //admin
  router.get("/api/allcode", userController.handleGetAllCode);
  router.delete("/api/delete-user", userController.handleDeteleUser); //admin
  router.put("/api/update-user", userController.handleUpdateUser); //admin
  router.put("/api/update-profile", userController.handleUpdateUser);

  //Hospital

  // router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  // router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  // router.post("/api/save-infor-doctor", doctorController.postInforDoctor);
  // router.get(
  //   "/api/get-detail-doctor-by-id",
  //   doctorController.getDetailDoctorById
  // );
  // router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  // router.get(
  //   "/api/get-schedule-doctor-by-date",
  //   doctorController.getScheduleByDate
  // );
  // router.get(
  //   "/api/get-extra-infor-doctor-by-id",
  //   doctorController.getExtraInforDoctorById
  // );
  // router.get(
  //   "/api/get-profile-doctor-by-id",
  //   doctorController.getProfileDoctorById
  // );
  // router.get(
  //   "/api/get-list-patient-for-doctor",
  //   doctorController.getListPatientForDoctor
  // );
  // router.post("/api/send-remedy", doctorController.sendRemedy);
  //Patient
  router.post(
    "/api/patient-booking-appointment",
    patientController.postBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );

  //Specialty
  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  router.get("/api/get-specialty", specialtyController.getAllSpecialty);
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyById
  );
  //Clinic
  router.post("/api/create-new-clinic", clinicController.createClinic);
  router.get("/api/get-clinic", clinicController.getAllClinic);
  router.get(
    "/api/get-detail-clinic-by-id",
    clinicController.getDetailClinicById
  );

  //Home
  return app.use("/", router);
};

module.exports = initWebRoutes;