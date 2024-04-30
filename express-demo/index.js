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

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/courses", (req, res) => {
  res.send(JSON.stringify(courses));
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Could not find course :(");
  res.send(course);
});

app.post("/api/courses", (req, res) => {
  const schema = Joi.object({
    title: Joi.string().required(),
  });

  const result = schema.validate(req.body)
  console.log(result)

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    title: req.body.title,
  };
  courses.push(course);
  res.send(course);
});

console.log(courses);

app.listen(port, () => console.log(`Listening on port ${port}...`));
