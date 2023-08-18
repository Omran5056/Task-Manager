const express = require('express')
const app = express()
const port = 3000
require("dotenv").config()

const tRoutes =require("./routes/TaskRoutes")
const not_Found =require("./middleware/notFound")
const errorHanler= require("./middleware/errorHandler")

// middlewere
app.use(express.static("./public"))
app.use(express.json())

// routes
app.use("/api/v1/tasks",tRoutes)
app.use(not_Found)
app.use(errorHanler)

//#################################
// for auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
}); 
//#################################


//#################################
// connect to db
const mongoose = require('mongoose');
mongoose
  .connect(
    process.env.Mongo_Url
  )
  .then((result) => {
    app.listen(process.env.PORT || port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })

  .catch((err) => {
    console.log(err);
  });
//###########################

