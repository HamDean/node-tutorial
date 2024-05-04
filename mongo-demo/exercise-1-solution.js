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

getCourses();
