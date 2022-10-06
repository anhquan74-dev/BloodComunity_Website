import db from "../models/index";
import _ from "lodash";
import emailService from "../services/emailService";
require("dotenv").config();

let bulkCreateScheduleService = async (data) => {
  try {
    let scheduleCreate = {};
    if (!data.arrSchedule || !data.hospitalId || !data.formatedDate) {
      (scheduleCreate.statusCode = 422),
        (scheduleCreate.message = "Missing schedules data");
    } else {
      let schedule = data.arrSchedule;

      // check existing in database
      let existing = await db.Schedule.findAll({
        where: { doctorId: data.doctorId, date: data.formatedDate },
        attributes: ["timeType", "date", "doctorId", "maxNumber"],
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
let getScheduleByDate = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: {
            doctorId: doctorId,
            date: date,
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueVi", "valueEn"],
            },
            {
              model: db.User,
              as: "doctorData",
              attributes: ["firstName", "lastName"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!dataSchedule) dataSchedule = [];
        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  bulkCreateScheduleService,
  getScheduleByDate,
};
