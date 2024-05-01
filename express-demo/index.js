const express = require("express");
const Joi = require("joi");
const logger = require("./logger");
const morgan = require("morgan");
const authenticator = require("./authenticator");
const app = express();
const port = process.env.PORT || 4000;

//* populating request body as json
app.use(express.json());

//* serving static files
app.use(express.static("public"));

//* parsing url encoded request
app.use(express.urlencoded({ extended: true }));

if(app.get('env') === 'development'){
  app.use(morgan('short'));
  console.log('---: Morgan enabled')
}

app.use(logger);

app.use(authenticator);

const courses = [
  { id: 2, title: "a" },
  { id: 4, title: "a" },
  { id: 11, title: "a" },
];

const validateCourse = (req) => {
  const schema = Joi.object({
    title: Joi.string().required(),
  });

  return schema.validate(req.body);
};

const lookUpCourse = (id) => {
  return courses.find((c) => c.id === parseInt(id));
};

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/courses", (req, res) => {
  res.send(JSON.stringify(courses));
});

app.get("/api/courses/:id", (req, res) => {
  const course = lookUpCourse(req.params.id);
  if (!course) res.status(404).send("Could not find course :(");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req);

  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    title: req.body.title,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = lookUpCourse(req.params.id);
  if (!course) res.status(404).send("Could not find course :(");

  const { error } = validateCourse(req);

  if (error) return res.status(400).send(error.details[0].message);

  course.title = req.body.title;

  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = lookUpCourse(req.params.id);

  if (!course) return res.status(404).send("Could not find course :(");

  const newCourses = courses.filter((c) => c.id !== course.id);

  res.send(newCourses);
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
