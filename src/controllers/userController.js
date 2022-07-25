const { isValidObjectId } = require("mongoose");
const userModel = require("../models/userModel");

const getUser = async (req, res) => {
  try {
    let userId = req.params.userId;
    if (!isValidObjectId(userId))
      return res
        .status(400)
        .send({ status: false, msg: `Oops! ${userId} This Not Valid UserId ` });
    let userDetail = await userModel.findById({ userId });
    if (!userDetail) {
      return res.status(404).send({ status: false, msg: "User you are searching for is not here" });
    } else {
      res.status(200).send({
        status: true,
        msg: "Your details is here",
        data:userDetail
      });
    }
  } catch (error) {
    console.log({ status: false, msg: error.message });
  }
};
