const express = require("express");
const Joi = require("joi");
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

const courses = [
  { id: 2, title: "a" },
  { id: 4, title: "a" },
  { id: 11, title: "a" },
];

const validateReqBody = (req) => {
  const schema = Joi.object({
    title: Joi.string().required(),
  });

  return schema.validate(req.body);
};

const lookUpCourse = (id) => {
  return courses.find((c) => c.id === parseInt(req.params.id));
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
  const {error} = validateReqBody(req);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

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

  const { error } = validateReqBody(req);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  course.title = req.body.title;

  res.send(course);
});

console.log(courses);

app.listen(port, () => console.log(`Listening on port ${port}...`));
