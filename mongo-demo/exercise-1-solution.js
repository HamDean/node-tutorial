const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mongo-exercises")
  .then(() => console.log("Connected successfully..."))
  .catch((err) => console.log("Could not connect :(", err));

const schema = new mongoose.Schema({
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  name: String,
  author: String,
  price: Number,
});

const Course = mongoose.model("Course", schema);

async function getCourses() {
  const courses = await Course.find()
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/ }])
    .sort("-price")
    .select("name price");

  console.log(courses);
}

// getCourses();

async function updateCourse(id) {
  console.log("courseId:", id);

  try {
    const course = await Course.findById(id);
    console.log("course:", course);
  } catch (err) {
    console.log("error:", err);
  }
}

updateCourse("5a68fdc3615eda645bc6bdec");
