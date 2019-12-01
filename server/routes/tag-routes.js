const { Router } = require("express");
const TagController = require("../controllers/tag-controller");
const authHandler = require("../middlewares/auth-handler");

const router = Router();

// Configuring the routes

router.get("/", TagController.getAll.bind(TagController));

router.get(
	"/user",
	authHandler,
	TagController.getAllByUser.bind(TagController)
);

router.get("/:id", TagController.getOne.bind(TagController));

router.post("/", authHandler, TagController.create.bind(TagController));

router.patch("/:id", authHandler, TagController.update.bind(TagController));

router.delete("/:id", authHandler, TagController.delete.bind(TagController));

// Exporting the Route handler

const addTagRoutes = app => {
	app.use(`/tags`, router);
};

exports.addTagRoutes = addTagRoutes;
