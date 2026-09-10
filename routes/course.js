const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { Courses, validateObj } = require("../models/course");

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];

router.get("/", async (req, res) => {
  try {
    const courses = await Courses.find();
    res.send(courses);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await Courses.findById(req.params.id);
    if (!course) return res.status(404).send("Course not found");

    res.send(course);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  const { error } = validateObj(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  try {
    let course = await Courses.findOne({ name });

    if (course)
      return res
        .status(400)
        .send({ message: "Course with same name already exist" });

    course = new Courses(req.body);
    course = await course.save();

    res.send(course);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const allowedFields = ["name", "author", "tags"];
  const updates = {};

  for (const fields of allowedFields) {
    if (req.body[fields] !== undefined) updates[fields] = req.body[fields];
  }

  try {
    const updatedCourse = await Courses.findByIdAndUpdate(
      id,
      { $set: updates },
      { runValidators: true },
    );
    if (!updatedCourse)
      return res.status(404).send({ message: "Course not found" });

    res.send(updatedCourse);
  } catch (error) {
    res.status(500).send("Error occured while updating");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Courses.findByIdAndDelete(id);

    if (!course) return res.status(404).send({ message: "Course not found" });
    res.send(course);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
