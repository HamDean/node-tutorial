const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/playground");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({ isPublished: true })
    .or([{ tags: "frontend" }, { tags: "backend" }])
    .sort("-price")
    .select("name author price");
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

// run()

//*  query firt approach
async function updateCourse(id) {
  try {
    const course = await Course.findById(id);
    if (!course) return;
    course.name = "Another author";
    course.isPublished = false;

    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log("error:", err);
  }
}

//* document update approach
async function updateCourseDA(id) {
  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      author: "dean?",
      isPublished: true,
    },
  }, { new: true});
  console.log(course);
}

updateCourseDA("6634d904659e1383e38d3414");
