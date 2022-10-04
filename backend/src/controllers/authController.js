import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();

const hashPassword = (password) => bcrypt.hashSync(password, 10);

const comparePassword = (password, hashPassword) =>
  bcrypt.compareSync(password, hashPassword);
const generateToken = (data) => {
  const token = jwt.sign({ data }, process.env.SECRET_KEY, {
    expiresIn: "365d",
  });
  return token;
};
const decodeToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (err) {
    return null;
  }
};
const verifyTokenAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  const checkToken = decodeToken(token);
  if (checkToken) {
    // check role
    if (checkToken.data.maLoaiNguoiDung === "QuanTri") {
      next();
    } else {
      res.send({
        statusCode: 401,
        message: "Bạn không có quyền truy cập",
      });
    }
  } else {
    res.send({
      statusCode: 400,
      message: "Token không tồn tại",
    });
  }
};
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  const checkToken = decodeToken(token);
  if (checkToken) {
    // check role
    if (
      checkToken.data.maLoaiNguoiDung === "QuanTri" ||
      checkToken.data.maLoaiNguoiDung === "KhachHang"
    ) {
      next();
    } else {
      res.send({
        statusCode: 401,
        message: "Bạn không có quyền truy cập",
      });
    }
  } else {
    res.send({
      statusCode: 400,
      message: "Token không tồn tại",
    });
  }
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  decodeToken,
  verifyTokenAdmin,
  verifyToken,
};
