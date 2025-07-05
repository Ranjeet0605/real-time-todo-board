const express = require("express");
const errorMiddleware = require("./middlewares/errorMiddleware");
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extedend: true }));

app.use(errorMiddleware());
//importing routes
const userRouter = require("./routes/userrouter");
app.use("/api/v1", userRouter);





module.exports = app;