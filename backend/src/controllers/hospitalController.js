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
      res.status(infor.statusCode).json(infor);
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({
      statusCode: 500,
      message: "Error from server!",
    });
  }
};
let handleCreateEvent = async (req, res) => {
  try {
    let infor = await hospitalService.createEventService(req.body);
    res.status(infor.statusCode).json(infor);
  } catch (e) {
    console.log(e);
    res.status(200).json({
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
      res.status(infor.statusCode).json(infor);
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({
      statusCode: 500,
      message: "Error from server!",
    });
  }
};
let handleGetEventByDate = async (req, res) => {
  try {
    console.log("req.query.date", req.query.date);
    if (!req.query.date) {
      res.status(422).json({
        statusCode: 422,
        message: "Missing required parameters!",
      });
    } else {
      let infor = await hospitalService.getEventByDateService(req.query.date);
      res.status(infor.statusCode).json(infor);
    }
  } catch (e) {
    console.log(e);
    res.status(200).json({
      statusCode: 500,
      message: "Error from server!",
    });
  }
};
module.exports = {
  handleBulkCreateSchedule,
  handleGetScheduleByDate,
  handleCreateEvent,
  handleGetEventByDate,
};
