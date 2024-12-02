const mongoose = require("mongoose");
const config = require("./config.json"); // assuming config.js is in the same directory

const connectDB = async () => {
  try {
    await mongoose.connect(config.ConnectionString);  // assuming MONGO_URI is in the config file
    console.log(`Successfully connected to mongoDB 👍👍👍👍👍👍👍👍👍👍👍👍👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

module.exports= connectDB;
