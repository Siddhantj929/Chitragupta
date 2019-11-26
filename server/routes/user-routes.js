const { Router } = require("express");
const UserController = require("../controllers/user-controller");

const router = Router();

// Configuring the routes

router.get("/", UserController.getAll.bind(UserController));

router.get("/:id", UserController.getOne.bind(UserController));

router.post("/signup", UserController.signup.bind(UserController));

router.post("/login", UserController.login.bind(UserController));

router.patch("/:id", UserController.update.bind(UserController));

router.delete("/:id", UserController.delete.bind(UserController));

// Exporting the Route handler

const addUserRoutes = app => {
	app.use(`/users`, router);
};

exports.addUserRoutes = addUserRoutes;
