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
      message: "Error from server!",
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
      message: "Error from server!",
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
      message: "Error from server!",
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
      message: "Error from server!",
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
      message: "Error from server!",
    });
  }
};
let handleDeteleUser = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Missing user id!",
      });
    } else {
      let message = await userService.deleteUserService(req.body.id);
      res.status(200).json(message);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Error from server!",
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
      message: "Error from server!",
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
      message: "Error from server!",
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
      message: "Error from server!",
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
      message: "Error from server!",
    });
  }
};
module.exports = {
  handleRegister,
  handleLogin,
  handleGetAllUsers,
  handleGetUserById,
  handleGetAllCode,
  handleDeteleUser,
  handleUpdateUser,
  handleGetTotalDonation,
  handleGetTotalDonor,
  handleGetTotalRecipient,
};
