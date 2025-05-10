const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error connecting to DB", error);
    process.exit(1);
  }
};

module.exports = connectToDb;
