const express = require("express");
const logger = require("./middleware/logger");
const morgan = require("morgan");
const config = require("config");
const courses = require("./routes/courses");
const homepage = require('./routes/homepage')
const startDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const authenticator = require("./middleware/authenticator");
const app = express();
const port = process.env.PORT || 4000;

//* populating request body as json
app.use(express.json());

//* serving static files
app.use(express.static("public"));

//* parsing url encoded request
app.use(express.urlencoded({ extended: true }));

//* configuration
console.log(`Application name ${config.get("name")}`);
console.log(`Mail server ${config.get("mail.host")}`);
// console.log(`Mail Password ${config.get("mail.password")}`)

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  // console.log("---: Morgan enabled");
  startDebugger("---: Morgan enabled");
}

dbDebugger("Connected to the database");
app.use(logger);
app.use(authenticator);


app.use("/api/courses", courses);
app.use("/", homepage)

app.listen(port, () => console.log(`Listening on port ${port}...`));
