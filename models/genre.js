const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 50 },
});

const Genres = mongoose.model("Genre", genreSchema);

function validateObj(genre) {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(50),
  });

  return schema.validate(genre);
}

module.exports.Genres = Genres;
module.exports.validateObj = validateObj;
module.exports.genreSchema = genreSchema;
