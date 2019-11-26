const mongoose = require("mongoose");
const taskSchema = require("../schemas/task-schema");

const taskModel = mongoose.model("Tasks", taskSchema);

module.exports = taskModel;
