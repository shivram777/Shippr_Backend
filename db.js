const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const ConnectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      //   userUnifiedTopology: true,
      //   useFindAndModify: true,
    });
    console.log(`MongoDB Connected ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
};

module.exports = ConnectDB;
