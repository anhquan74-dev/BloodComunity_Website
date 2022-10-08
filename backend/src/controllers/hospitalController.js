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
let handleDeteleEvent = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Missing event id!",
      });
    } else {
      let message = await hospitalService.deleteEventService(req.body.id);
      res.status(message.statusCode).json(message);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Error from server!",
    });
  }
};
let handleUpdateEvent = async (req, res) => {
  try {
    if (!req.body.id) {
      res.send({
        statusCode: 422,
        message: "Missing input event id!",
      });
    } else {
      let eventUpdated = await hospitalService.updateEventService(req.body);
      res.status(eventUpdated.statusCode).json(eventUpdated);
    }
  } catch (e) {
    console.log(e);
    res.send({
      statusCode: 500,
      message: "Error from server!",
    });
  }
};
let handleGetAllEvents = async (req, res) => {
  try {
    let events = await hospitalService.getAllEventsService();
    res.status(200).json({
      statusCode: 200,
      message: "Get all events successfully!",
      content: events,
    });
  } catch (e) {
    res.send({
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
  handleUpdateEvent,
  handleDeteleEvent,
  handleGetAllEvents,
};
