const { default: mongoose } = require("mongoose");

const MongoConnect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/guiapics");
  } catch (error) {
    console.log(error);
  }
};
module.exports = MongoConnect;
