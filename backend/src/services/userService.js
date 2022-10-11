import db, { sequelize } from "../models/index";
import authController from "../controllers/authController";
import { v4 as uuidv4 } from "uuid";
require("dotenv").config();
import emailService from "./emailService";

let registerService = async (data) => {
  try {
    let userSignup = {};
    let checkUserEmail = await db.User.findOne({
      where: { email: data.email },
    });
    if (checkUserEmail) {
      userSignup.statusCode = 409;
      userSignup.message = "Your Email already exist!";
    } else {
      await db.User.create({
        email: data.email,
        password: authController.hashPassword(data.password),
        roleId: data.roleId,
        firstName: data.firstName,
        lastName: data.lastName,
        hospitalName: data.hospitalName,
        gender: data.gender,
        birthday: data.birthday,
        ward: data.ward,
        district: data.district,
        city: data.city,
        address: data.address,
        phoneNumber: data.phoneNumber,
        image: data.image,
        groupBlood: data.groupBlood,
      });
      userSignup.statusCode = 201;
      userSignup.message = "Register successfully!";
    }
    return userSignup;
  } catch (e) {
    console.log(e);
  }
};
let loginService = async (email, password) => {
  try {
    let userData = {};
    let checkUserEmail = await db.User.findOne({
      where: { email },
    });
    if (!checkUserEmail) {
      userData.statusCode = 404;
      userData.message = "Your Email isn't exist";
      userData.content = {};
    } else {
      let checkPassword = await authController.comparePassword(
        password,
        checkUserEmail.password
      );
      if (!checkPassword) {
        userData.statusCode = 404;
        userData.message = "Your password is not valid!";
        userData.content = {};
      } else {
        const token = authController.generateToken(checkUserEmail);
        const data = {
          email: checkUserEmail.email,
          roleId: checkUserEmail.roleId,
          firstName: checkUserEmail.firstName,
          lastName: checkUserEmail.lastName,
          hospitalName: checkUserEmail.hospitalName,
          gender: checkUserEmail.gender,
          birthday: checkUserEmail.birthday,
          ward: checkUserEmail.ward,
          district: checkUserEmail.district,
          city: checkUserEmail.city,
          address: checkUserEmail.address,
          phoneNumber: checkUserEmail.phoneNumber,
          image: checkUserEmail.image,
          groupBlood: checkUserEmail.groupBlood,
          numberOfDonation: checkUserEmail.numberOfDonation,
          accessToken: token,
        };
        userData.statusCode = 200;
        userData.message = "Login successfully!";
        userData.content = data;
      }
    }
    return userData;
  } catch (e) {
    console.log(e);
  }
};
let getAllUsersService = async () => {
  try {
    let allUsers = await db.User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    return allUsers;
  } catch (e) {
    console.log(e);
  }
};
let getUserByIdService = async (userId) => {
  try {
    let userInfor = {};
    let user = await db.User.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      userInfor.statusCode = 404;
      userInfor.message = "User not found!";
      userInfor.content = {};
    } else {
      userInfor.statusCode = 200;
      userInfor.message = "Get user infor successfully!";
      userInfor.content = user;
    }
    return userInfor;
  } catch (e) {
    console.log(e);
  }
};
let getAllCodeService = async (typeInput) => {
  try {
    let allCode = {};
    let dataAllCode = await db.Allcode.findAll({
      where: {
        type: typeInput,
      },
    });
    if (!dataAllCode || dataAllCode.length <= 0) {
      allCode.statusCode = 404;
      allCode.message = "Type is invalid!";
    } else {
      allCode.statusCode = 200;
      allCode.message = "Get all code successfully!";
      allCode.content = dataAllCode;
    }
    return allCode;
  } catch (e) {
    console.log(e);
  }
};
let deleteUserService = async (inputId) => {
  try {
    let message = {};
    let user = await db.User.findOne({
      where: { id: inputId },
    });
    if (!user) {
      message.statusCode = 404;
      message.message = "User not found!";
    } else {
      await db.User.destroy({
        where: { id: inputId },
      });
      message.statusCode = 200;
      message.message = "User deleted successfully!";
    }
    return message;
  } catch (e) {
    console.log(e);
  }
};
let updateUserService = async (data) => {
  try {
    let userUpdated = {};
    let checkUserId = await db.User.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (checkUserId) {
      checkUserId.roleId = data.roleId;
      checkUserId.firstName = data.firstName;
      checkUserId.lastName = data.lastName;
      checkUserId.hospitalName = data.hospitalName;
      checkUserId.gender = data.gender;
      checkUserId.birthday = data.birthday;
      checkUserId.ward = data.ward;
      checkUserId.district = data.district;
      checkUserId.city = data.city;
      checkUserId.address = data.address;
      checkUserId.phoneNumber = data.phoneNumber;
      checkUserId.groupBlood = data.groupBlood;
      checkUserId.numberOfDonation = data.numberOfDonation;
      if (data.image) {
        checkUserId.image = data.image;
      }
      await checkUserId.save();
      let getUserInforAgain = await db.User.findOne({
        where: { id: data.id },
        raw: true,
      });
      userUpdated.content = getUserInforAgain;
      userUpdated.statusCode = 200;
      userUpdated.message = "Updated successfully!";
    } else {
      userUpdated.statusCode = 404;
      userUpdated.message = "Couldn't find user";
    }
    return userUpdated;
  } catch (e) {
    console.log("err update: ", e);
  }
};
let getTotalDonationService = async () => {
  try {
    let num = await db.User.findAll({
      attributes: [
        [
          sequelize.fn("sum", sequelize.col("numberOfDonation")),
          "totalDonation",
        ],
      ],
    });
    return num;
  } catch (e) {
    console.log(e);
  }
};
let getTotalDonorService = async () => {
  try {
    let num = await db.User.findAll({
      where: {
        roleId: "donor",
      },
      attributes: [[sequelize.fn("count", sequelize.col("id")), "totalDonors"]],
    });
    return num;
  } catch (e) {
    console.log(e);
  }
};
let getTotalRecipientService = async () => {
  try {
    let num = await db.User.findAll({
      where: {
        roleId: "recipient",
      },
      attributes: [
        [sequelize.fn("count", sequelize.col("id")), "totalRecipients"],
      ],
    });
    return num;
  } catch (e) {
    console.log(e);
  }
};
let buildUrlEmail = (hospitalId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&hospitalId=${hospitalId}`;
  return result;
};
let postBookingScheduleService = async (data) => {
  try {
    let booking = {};
    console.log("check data: ", data);
    if (
      !data.email ||
      !data.hospitalId ||
      !data.timeType ||
      !data.date ||
      !data.fullName ||
      !data.donorId

    ) {
      booking.statusCode = 422;
      booking.message = "Missing required information!"
    } else {
      let token = uuidv4();
      await emailService.sendSimpleEmail({
        receiverEmail: data.email,
        donorName: data.fullName,
        time: data.timeString,
        hospitalName: data.hospitalName,
        // language: data.language,
        redirectLink: buildUrlEmail(data.hospitalId, token),
      });

      await db.Booking.findOrCreate({
        where: {
          date: data.date,
          timeType: data.timeType,
        },
        defaults: {
          status: "S1",
          hospitalId: data.hospitalId,
          donorId: data.donorId,
          date: data.date,
          timeType: data.timeType,
          token: token,
        },
      });

      booking.statusCode = 201;
      booking.message = "Successfully!"
    }
    return booking;
  } catch (e) {
    console.log(e);
  }
};
let postVerifyBookingSchedule = async (data) => {
  try {
    let booking = {}
    if (!data.token || !data.hospitalId) {
      booking.statusCode = 422;
      booking.message = "Missing required parameters!"
    } else {
      let appointment = await db.Booking.findOne({
        where: {
          hospitalId: data.hospitalId,
          token: data.token,
          status: "S1",
        },
        raw: false,
      });
      if (appointment) {
        appointment.status = "S2";
        await appointment.save();
        booking.statusCode = 200;
        booking.message = "Update booking successfully";
      } else {
        booking.statusCode = 404;
        booking.message = "Booking has been activated or does not exits!";
      }
    }
    return booking;
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  loginService,
  getAllUsersService,
  getUserByIdService,
  registerService,
  getAllCodeService,
  deleteUserService,
  updateUserService,
  getTotalDonationService,
  getTotalDonorService,
  getTotalRecipientService,
  postBookingScheduleService,
  postVerifyBookingSchedule
};
