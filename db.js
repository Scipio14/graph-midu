import mongoose from "mongoose";

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("MongoDB is connected to your application"))
  .catch((err) => console.error("Connection failed", err.message));
