const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 2,
    maxLength: 255,
  },
  author: { type: String, required: true },
  tags: [String],
  isPublished: { type: Boolean, required: true },
  Date: { type: Date, default: Date.now() },
});

const Courses = mongoose.model("Courses", CourseSchema);

function validateObj(course) {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
    author: Joi.string().required().min(2),
    tags: Joi.array().items(Joi.string()).required(),
    isPublished: Joi.boolean().required(),
  });

  return schema.validate(course);
}

module.exports.Courses = Courses;
module.exports.validateObj = validateObj;
