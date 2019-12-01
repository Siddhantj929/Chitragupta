const { Router } = require("express");
const UserController = require("../controllers/user-controller");
const authHandler = require("../middlewares/auth-handler");
const multipartHandler = require("../middlewares/multipart-handler");

const router = Router();

// Configuring the routes

router.get("/", UserController.getAll.bind(UserController));

router.get("/:id", UserController.getOne.bind(UserController));

router.post(
	"/report",
	authHandler,
	UserController.generateReport.bind(UserController)
);

router.post(
	"/signup",
	multipartHandler,
	UserController.signup.bind(UserController)
);

router.post("/login", UserController.login.bind(UserController));

router.patch("/", authHandler, UserController.update.bind(UserController));

router.delete("/", authHandler, UserController.delete.bind(UserController));

// Exporting the Route handler

const addUserRoutes = app => {
	app.use(`/users`, router);
};

exports.addUserRoutes = addUserRoutes;
