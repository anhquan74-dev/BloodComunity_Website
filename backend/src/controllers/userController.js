import userService from "../services/userService";

let handleRegister = async (req, res) => {
  try {
    const { email, password, roleId } = req.body;
    if (!email || !password || !roleId) {
      res.send({
        statusCode: 422,
        message: "Missing require parameters!",
      });
    } else {
      let userSignup = await userService.registerService(req.body);
      res.status(userSignup.statusCode).json({
        statusCode: userSignup.statusCode,
        message: userSignup.message,
      });
    }
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email) {
      res.send({
        statusCode: 422,
        message: "Missing email address!",
      });
    } else {
      if (!password) {
        res.send({
          statusCode: 422,
          message: "Missing password!",
        });
      } else {
        let userData = await userService.loginService(email, password);
        res.status(userData.statusCode).json({
          statusCode: userData.statusCode,
          message: userData.message,
          content: userData.content,
        });
      }
    }
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleResetPassword = async (req, res) => {
  try {
    let { email } = req.body;
    if (!email) {
      res.send({
        statusCode: 422,
        message: "Missing email address!",
      });
    } else {
      let userData = await userService.postResetPasswordService(email);
      res.status(userData.statusCode).json({
        statusCode: userData.statusCode,
        message: userData.message,
        content: userData.content,
      });
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handlePostVerifyResetPassword = async (req, res) => {
  try {
    let infor = await userService.postVerifyResetPassword(req.body);
    return res.status(infor.statusCode).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      statusCode: 500,
      message: "Lỗi từ Server",
    });
  }
};
let handleGetAllCode = async (req, res) => {
  try {
    let typeInput = await req.query.type;
    if (!typeInput) {
      res.send({
        statusCode: 422,
        message: "Missing input type!",
      });
    } else {
      let content = await userService.getAllCodeService(typeInput);
      res.status(content.statusCode).json({
        statusCode: content.statusCode,
        message: content.message,
        content: content.content,
      });
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetAllUsers = async (req, res) => {
  try {
    let users = await userService.getAllUsersService();
    res.status(200).json({
      statusCode: 200,
      message: "Get all users successfully!",
      content: users,
    });
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetUserById = async (req, res) => {
  try {
    let id = req.query.id;
    if (!id) {
      res.send({
        statusCode: 422,
        message: "Missing user id!",
      });
    } else {
      let user = await userService.getUserByIdService(id);
      res.status(user.statusCode).json({
        statusCode: user.statusCode,
        message: user.message,
        content: user.content,
      });
    }
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetUserByType = async (req, res) => {
  try {
    let type = req.query.type;
    if (!type) {
      res.send({
        statusCode: 422,
        message: "Missing user type!",
      });
    } else {
      let user = await userService.getUserByTypeService(type);
      res.status(user.statusCode).json({
        statusCode: user.statusCode,
        message: user.message,
        content: user.content,
      });
    }
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleDeteleUser = async (req, res) => {
  try {
    console.log("req.body", req.body);
    if (!req.body) {
      res.send({
        statusCode: 422,
        message: "Missing user id!",
      });
    } else {
      let message = await userService.deleteUserService(req.body);
      res.status(message.statusCode).json(message);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleUpdateUser = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Missing input user id!",
      });
    } else {
      let userUpdated = await userService.updateUserService(req.body);
      res.status(200).json(userUpdated);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetTotalDonation = async (req, res) => {
  try {
    let num = await userService.getTotalDonationService();
    res.status(200).json({
      statusCode: 200,
      message: "Successfully!",
      content: num,
    });
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetTotalDonor = async (req, res) => {
  try {
    let num = await userService.getTotalDonorService();
    res.status(200).json({
      statusCode: 200,
      message: "Successfully!",
      content: num,
    });
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleGetTotalRecipient = async (req, res) => {
  try {
    let num = await userService.getTotalRecipientService();
    res.status(200).json({
      statusCode: 200,
      message: "Successfully!",
      content: num,
    });
  } catch (e) {
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handlePostBookingSchedule = async (req, res) => {
  try {
    let infor = await userService.postBookingScheduleService(req.body);
    return res.status(infor.statusCode).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      statusCode: 500,
      message: "Lỗi từ Server",
    });
  }
};
let handlePostVerifyBookingSchedule = async (req, res) => {
  try {
    let infor = await userService.postVerifyBookingSchedule(req.body);
    return res.status(infor.statusCode).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      statusCode: 500,
      message: "Lỗi từ Server",
    });
  }
};
let handleActiveUser = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Missing input user id!",
      });
    } else {
      let userUpdated = await userService.activeUserService(req.body.id);
      res.status(userUpdated.statusCode).json(userUpdated);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
let handleInActiveUser = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Missing input user id!",
      });
    } else {
      let userUpdated = await userService.inActiveUserService(req.body.id);
      res.status(userUpdated.statusCode).json(userUpdated);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Lỗi từ Server!",
    });
  }
};
module.exports = {
  handleRegister,
  handleLogin,
  handleGetAllUsers,
  handleGetUserById,
  handleGetUserByType,
  handleGetAllCode,
  handleDeteleUser,
  handleUpdateUser,
  handleGetTotalDonation,
  handleGetTotalDonor,
  handleGetTotalRecipient,
  handlePostBookingSchedule,
  handlePostVerifyBookingSchedule,
  handleActiveUser,
  handleInActiveUser,
  handleResetPassword,
  handlePostVerifyResetPassword,
};
