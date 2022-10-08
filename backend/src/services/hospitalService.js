import db from "../models/index";
import _ from "lodash";
import emailService from "../services/emailService";
require("dotenv").config();

let bulkCreateScheduleService = async (data) => {
  try {
    let scheduleCreate = {};
    if (!data.arrSchedule || !data.hospitalId || !data.formatedDate) {
      scheduleCreate.statusCode = 422;
      scheduleCreate.message = "Missing schedules data";
    } else {
      let schedule = data.arrSchedule;

      // check existing in database
      let existing = await db.Schedule.findAll({
        where: { hospitalId: data.hospitalId, date: data.formatedDate },
        attributes: ["timeType", "date", "hospitalId", "maxNumber"],
        raw: true,
      });

      // convert date
      // if (existing && existing.length > 0) {
      //   existing = existing.map((item) => {
      //     item.date = new Date(item.date).getTime();
      //     return item;
      //   });
      // }
      // compare different schedules: (+) to convert to int
      let toCreate = _.differenceWith(schedule, existing, (a, b) => {
        return a.timeType === b.timeType && +a.date === +b.date;
      });
      // create data
      if (toCreate && toCreate.length > 0) {
        let dataCreate = await db.Schedule.bulkCreate(toCreate);
        if (dataCreate) {
          scheduleCreate.statusCode = 201;
          scheduleCreate.message = "Schedule sent successfully";
        }
      } else {
        scheduleCreate.statusCode = 409;
        scheduleCreate.message =
          "This calendar has already been created, please create with another time!";
      }
      return scheduleCreate;
    }
  } catch (e) {
    console.log(e);
  }
};
let getScheduleByDateService = async (hospitalId, date) => {
  try {
    let scheduleData = {};
    if (!hospitalId || !date) {
      scheduleData.statusCode = 422;
      scheduleData.message = "Missing require parameters!";
    } else {
      let data = await db.Schedule.findAll({
        where: {
          hospitalId,
          date,
        },
        include: [
          {
            model: db.Allcode,
            as: "timeTypeData",
            attributes: ["valueVi", "valueEn"],
          },
          {
            model: db.User,
            as: "hospitalData",
            // attributes: ["firstName", "lastName"],
            attributes: ["hospitalName"],
          },
        ],
        raw: false,
        nest: true,
      });
      if (!data || data.length === 0) {
        scheduleData.statusCode = 404;
        scheduleData.message = "Not found!";
        data = [];
      } else {
        scheduleData.statusCode = 200;
        scheduleData.message = "Get schedule data successfully!";
        scheduleData.content = data;
      }
      return scheduleData;
    }
  } catch (e) {
    console.log(e);
  }
};
let createEventService = async (data) => {
  try {
    let eventCreate = {};
    if (!data.hospitalId) {
      eventCreate.statusCode = 422;
      eventCreate.message = "Missing hospitalId!";
    } else {
      await db.Event.create(data);
      eventCreate.statusCode = 201;
      eventCreate.message = "Event created successfully!";
    }
    return eventCreate;
  } catch (e) {
    console.log(e);
  }
};
let getEventByDateService = async (date) => {
  try {
    let eventData = {};
    if (!date) {
      eventData.statusCode = 422;
      eventData.message = "Missing require parameters!";
    } else {
      let data = await db.Event.findAll({
        where: {
          date,
        },
        include: [
          {
            model: db.User,
            as: "hospitalData",
            // attributes: ["firstName", "lastName"],
            attributes: ["hospitalName"],
          },
        ],
        raw: false,
        nest: true,
      });
      if (!data || data.length === 0) {
        eventData.statusCode = 404;
        eventData.message = "Not found!";
        data = [];
      } else {
        eventData.statusCode = 200;
        eventData.message = "Get event data successfully!";
        eventData.content = data;
      }
      return eventData;
    }
  } catch (e) {
    console.log(e);
  }
};
let deleteEventService = async (inputId) => {
  try {
    let message = {};
    let event = await db.Event.findOne({
      where: { id: inputId },
    });
    if (!event) {
      message.statusCode = 404;
      message.message = "Event not found!";
    } else {
      await db.Event.destroy({
        where: { id: inputId },
      });
      message.statusCode = 200;
      message.message = "Event deleted successfully!";
    }
    return message;
  } catch (e) {
    console.log(e);
  }
};
let updateEventService = async (data) => {
  try {
    let eventUpdated = {};
    let checkEventId = await db.Event.findOne({
      where: { id: data.id },
      raw: false,
    });
    if (checkEventId) {
      checkEventId.hospitalId = data.hospitalId;
      checkEventId.location = data.location;
      checkEventId.date = data.date;
      checkEventId.description = data.description;
      checkEventId.nameEvent = data.nameEvent;
      await checkEventId.save();
      let getEventInforAgain = await db.Event.findOne({
        where: { id: data.id },
        raw: true,
      });
      eventUpdated.content = getEventInforAgain;
      eventUpdated.statusCode = 200;
      eventUpdated.message = "Updated successfully!";
    } else {
      eventUpdated.statusCode = 404;
      eventUpdated.message = "Couldn't find event";
    }
    return eventUpdated;
  } catch (e) {
    console.log("err update: ", e);
  }
};
let getAllEventsService = async () => {
  try {
    let allEvents = await db.Event.findAll();
    return allEvents;
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  bulkCreateScheduleService,
  getScheduleByDateService,
  createEventService,
  getEventByDateService,
  deleteEventService,
  updateEventService,
  getAllEventsService,
};
