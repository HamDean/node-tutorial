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

// comparison operators
//* gt, gte, lt, lte, in, nin,
//* price: { $in: [10, 23, 60] }
//* { price: {$gte: 10, $lte: 20 } }

// regex
//* /pattern/ 
//* /^ham/i ---> begins with ham and is case-insensitive
//* /Nurudeen$/ --> ends with Nurudeen
//* /.*mza.*/ ---> contains mza, letters can come before or after

async function getCourses() {
  const courses = await Course.find()
    .or([{ isPublished: true }, { author: "Hamzah" }])
    .limit(10)
    .sort({ title: -1 })
  console.log("All courses:", courses);
}
getCourses();
