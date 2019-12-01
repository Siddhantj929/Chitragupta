const mongoose = require("mongoose");
const tagSchema = require("../schemas/tag-schema");

const tagModel = mongoose.model("Tags", tagSchema);

module.exports = tagModel;
