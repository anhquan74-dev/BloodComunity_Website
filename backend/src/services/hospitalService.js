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
        await db.Schedule.bulkCreate(toCreate);
      }

      scheduleCreate.statusCode = 200;
      scheduleCreate.message = "Schedule sent successfully";
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

module.exports = {
  bulkCreateScheduleService,
  getScheduleByDateService,
};
