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
  isPublished: Boolean
});
const Course = mongoose.model('Course', schema)
async function createCourse() {
    const course = new Course({
        title: 'Nodjs',
        author: 'Hamzah', 
        tags: ['node', 'backend'],
        isPublished: true
    })
    await course.save()
}

createCourse()

console.log(Course.find({ title: 'Nodejs' }))
