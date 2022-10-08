import hospitalService from "../services/hospitalService";

let handleBulkCreateSchedule = async (req, res) => {
  try {
    if (!req.body) {
      res.status(422).json({
        statusCode: 422,
        message: "Missing required parameters!",
      });
    } else {
      let infor = await hospitalService.bulkCreateScheduleService(req.body);
      return res.status(200).json(infor);
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      statusCode: 500,
      message: "Error from server!",
    });
  }
};
let handleGetScheduleByDate = async (req, res) => {
  try {
    if (!req.query.hospitalId || !req.query.date) {
      res.status(422).json({
        statusCode: 422,
        message: "Missing required parameters!",
      });
    } else {
      let infor = await hospitalService.getScheduleByDateService(
        req.query.hospitalId,
        req.query.date
      );
      return res.status(infor.statusCode).json(infor);
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      statusCode: 500,
      message: "Error from server!",
    });
  }
};
module.exports = {
  handleBulkCreateSchedule,
  handleGetScheduleByDate,
};
