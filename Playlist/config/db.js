const mongoose = require("mongoose");
require("dotenv").config()
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://Turbold:Hello0220@cluster0.lr3z2ms.mongodb.net/?retryWrites=true&w=majority";

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGODB_URI);

    console.log("Database is successfully connected");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = connect;
