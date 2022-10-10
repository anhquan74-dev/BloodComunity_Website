import express from "express";
let router = express.Router();
import userController from "../controllers/userController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import hospitalController from "../controllers/hospitalController";

let initWebRoutes = (app) => {
  //forgot password
  //login with socials
  // verify-book-schedule
  // donor-booking-schedule"

  //Home page
  router.get("/api/get-total-donation", userController.handleGetTotalDonation);
  router.get("/api/get-total-donor", userController.handleGetTotalDonor);
  router.get(
    "/api/get-total-recipient",
    userController.handleGetTotalRecipient
  );

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

  //Event
  router.get("/api/get-all-events", hospitalController.handleGetAllEvents);
  router.get(
    "/api/get-event-hospital-by-date",
    hospitalController.handleGetEventByDate
  );
  router.post("/api/create-event", hospitalController.handleCreateEvent); //hospital, admin
  router.put("/api/update-event", hospitalController.handleUpdateEvent); //admin,hospital
  router.delete("/api/delete-event", hospitalController.handleDeteleEvent); //admin,hospital

  //Schedule
  router.get(
    "/api/get-all-schedules",
    hospitalController.handleGetAllSchedules
  );
  router.get(
    "/api/get-schedule-hospital-by-date",
    hospitalController.handleGetScheduleByDate
  );
  router.get(
    "/api/get-schedule-hospital-by-id",
    hospitalController.handleGetScheduleById
  );
  router.post(
    "/api/create-schedule",
    hospitalController.handleBulkCreateSchedule
  ); //hospital, admin
  router.put("/api/update-schedule", hospitalController.handleUpdateSchedule); //admin,hospital
  router.delete(
    "/api/delete-schedule",
    hospitalController.handleDeteleSchedule
  ); //admin,hospital

  // trước khi ấn submit form, gọi api: get-schedule-by-id lấy currentNumber so sánh với maxNumber để tiếp tục
  router.post(
    "/api/donor-booking-schedule",
    userController.handlePostBookingSchedule
  );
  router.post(
    "/api/verify-book-appointment",
    userController.handlePostVerifyBookingSchedule
  );

  // router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  // router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  // router.post("/api/save-infor-doctor", doctorController.postInforDoctor);
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
