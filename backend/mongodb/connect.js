import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose
    .connect(url)
    .then(function () {
      console.log("Database connection established");
    })
    .catch(function (err) {
      console.log("Error connecting to database: " + err);
    });
};

export default connectDB;
