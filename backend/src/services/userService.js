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
      userSignup.message = "Email này đã tồn tại trong hệ thống!";
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
      userSignup.message = "Tạo tài khoản thành công!";
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
      userData.message = "Email này không tồn tại trong hệ thống!";
      userData.content = {};
    } else {
      if (checkUserEmail.status === "inactive") {
        userData.statusCode = 403;
        userData.message = "Tài khoản của bạn đã bị khóa!"
      }
      if (checkUserEmail.status === "active") {
        let checkPassword = await authController.comparePassword(
          password,
          checkUserEmail.password
        );
        if (!checkPassword) {
          userData.statusCode = 404;
          userData.message = "Mật khẩu của bạn không khớp!";
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
          userData.message = "Đăng nhập thành công!";
          userData.content = data;
        }
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
      userInfor.message = "Không tìm thấy!";
      userInfor.content = {};
    } else {
      userInfor.statusCode = 200;
      userInfor.message = "Lấy thông tin người dùng thành công!";
      userInfor.content = user;
    }
    return userInfor;
  } catch (e) {
    console.log(e);
  }
};
let getUserByTypeService = async (userType) => {
  try {
    let userInfor = {};
    let users = await db.User.findAll({
      where: {
        roleId: userType,
      },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!users || users.length <= 0) {
      userInfor.statusCode = 404;
      userInfor.message = "Không tìm thấy!";
      userInfor.content = {};
    } else {
      userInfor.statusCode = 200;
      userInfor.message = "Lấy thông tin người dùng thành công!";
      userInfor.content = users;
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
      allCode.message = "Vai trò không đúng!";
    } else {
      allCode.statusCode = 200;
      allCode.message = "Lấy dữ liệu thành công!";
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
      message.message = "Không tìm thấy!!";
    } else {
      await db.User.destroy({
        where: { id: inputId },
      });
      message.statusCode = 200;
      message.message = "Xóa thành công!";
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
      checkUserId.status = data.status;
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
      userUpdated.message = "Cập nhật thành công!";
    } else {
      userUpdated.statusCode = 404;
      userUpdated.message = "Không tìm thấy!";
    }
    return userUpdated;
  } catch (e) {
    console.log("err update: ", e);
  }
};
let inActiveUserService = async (inputId) => {
  try {
    let userUpdated = {};
    let checkUserId = await db.User.findOne({
      where: { id: inputId },
      raw: false,
    });
    if (checkUserId) {
      checkUserId.status = "inactive";
      await checkUserId.save();
      let getUserInforAgain = await db.User.findOne({
        where: { id: inputId },
        raw: true,
      });
      userUpdated.content = getUserInforAgain;
      userUpdated.statusCode = 200;
      userUpdated.message = "Khóa tài khoản thành công!";
    } else {
      userUpdated.statusCode = 404;
      userUpdated.message = "Không tìm thấy!";
    }
    return userUpdated;
  } catch (e) {
    console.log("err update: ", e);
  }
};
let activeUserService = async (inputId) => {
  try {
    let userUpdated = {};
    let checkUserId = await db.User.findOne({
      where: { id: inputId },
      raw: false,
    });
    if (checkUserId) {
      checkUserId.status = "active";
      await checkUserId.save();
      let getUserInforAgain = await db.User.findOne({
        where: { id: inputId },
        raw: true,
      });
      userUpdated.content = getUserInforAgain;
      userUpdated.statusCode = 200;
      userUpdated.message = "Mở khóa thành công!";
    } else {
      userUpdated.statusCode = 404;
      userUpdated.message = "Không tìm thấy!";
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
    if (
      !data.email ||
      !data.hospitalId ||
      !data.timeType ||
      !data.date ||
      !data.fullName ||
      !data.donorId

    ) {
      booking.statusCode = 422;
      booking.message = "Thiếu thông số bắt buộc!"
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
      booking.message = "Thành công!"
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
      booking.message = "Thiếu thông số bắt buộc!"
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
        booking.message = "Cập nhật trạng thái lịch hẹn thành công!";
      } else {
        booking.statusCode = 404;
        booking.message = "Lịch hẹn đã được xác nhận hoặc không tồn tại!";
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
  postVerifyBookingSchedule,
  getUserByTypeService,
  inActiveUserService,
  activeUserService
};
