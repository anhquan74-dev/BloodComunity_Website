import hospitalService from "../services/hospitalService";

let handleBulkCreateSchedule = async (req, res) => {
  try {
    let infor = await hospitalService.bulkCreateScheduleService(req.body);
    return res.status(200).json(infor);
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
};
