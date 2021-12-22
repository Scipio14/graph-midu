import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://scipio14:pedos23@midu.6czzq.mongodb.net/persons?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((db) => console.log("MongoDB is connected to your application"))
  .catch((err) => console.error("Connection failed", err.message));
