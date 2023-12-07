const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");
const userRouter = require("./router/userRouter");

dotenv.config({ path: "./.env" });

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Database Connection Successful");
}
).catch((e) => {
  console.log(e);
});



const app = express();

app.use(cors());
app.use(express.json());
const port = 4000;

app.use("/authenticate", userRouter);



const server = app.listen(port, "127.0.0.1", () => {
  console.log("Server started at port", port);
});




