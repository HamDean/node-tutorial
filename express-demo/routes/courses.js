const express = require('express')
const router = express.Router()
const Joi = require("joi");


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
  

  
  router.get("/", (req, res) => {
    res.send(JSON.stringify(courses));
  });
  
  router.get("/:id", (req, res) => {
    const course = lookUpCourse(req.params.id);
    if (!course) res.status(404).send("Could not find course :(");
    res.send(course);
  });
  
  router.post("/", (req, res) => {
    const { error } = validateCourse(req);
  
    if (error) return res.status(400).send(error.details[0].message);
  
    const course = {
      id: courses.length + 1,
      title: req.body.title,
    };
    courses.push(course);
    res.send(course);
  });
  
  router.put("/:id", (req, res) => {
    const course = lookUpCourse(req.params.id);
    if (!course) res.status(404).send("Could not find course :(");
  
    const { error } = validateCourse(req);
  
    if (error) return res.status(400).send(error.details[0].message);
  
    course.title = req.body.title;
  
    res.send(course);
  });
  
  router.delete("/:id", (req, res) => {
    const course = lookUpCourse(req.params.id);
  
    if (!course) return res.status(404).send("Could not find course :(");
  
    const newCourses = courses.filter((c) => c.id !== course.id);
  
    res.send(newCourses);
  });

  module.exports = router;