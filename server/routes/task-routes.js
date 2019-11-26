const { Router } = require("express");
const TaskController = require("../controllers/task-controller");
const authHandler = require("../middlewares/auth-handler");

const router = Router();

// Configuring the routes

router.get("/", TaskController.getAll.bind(TaskController));

router.get(
	"/user",
	authHandler,
	TaskController.getAllByUser.bind(TaskController)
);

router.get(
	"/user/queue",
	authHandler,
	TaskController.updateQueue.bind(TaskController)
);

router.get("/:id", TaskController.getOne.bind(TaskController));

router.post("/", authHandler, TaskController.create.bind(TaskController));

router.patch(
	"/complete",
	authHandler,
	TaskController.markComplete.bind(TaskController)
);

router.patch("/:id", authHandler, TaskController.update.bind(TaskController));

router.delete("/:id", authHandler, TaskController.delete.bind(TaskController));

// Exporting the Route handler

const addTaskRoutes = app => {
	app.use(`/tasks`, router);
};

exports.addTaskRoutes = addTaskRoutes;
