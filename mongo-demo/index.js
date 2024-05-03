const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("--- connected to mongodb database"))
  .catch((err) => console.log("could not connect to mongodb :(", err));

const schema = new mongoose.Schema({
  title: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
const Course = mongoose.model("Course", schema);
async function createCourse() {
  const course = new Course({
    title: "Nodjs",
    author: "Hamzah",
    tags: ["node", "backend"],
    isPublished: true,
  });
  await course.save();
}

//* gt, gte, lt, lte, in, nin,
//* price: { $in: [10, 23, 60] }
//* { price: {$gte: 10, $lte: 20 } }

async function getCourses() {
  const courses = await Course.find()
    .limit(10)
    .sort({ title: -1 })
    .select({ title: 1, tags: 1 });
  console.log("All courses:", courses);
}
getCourses();
