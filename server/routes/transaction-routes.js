const { Router } = require("express");
const TransactionController = require("../controllers/transaction-controller");
const authHandler = require("../middlewares/auth-handler");

const router = Router();

// Configuring the routes

router.get("/", TransactionController.getAll.bind(TransactionController));

router.get(
	"/user",
	authHandler,
	TransactionController.getAllByUser.bind(TransactionController)
);

router.get("/:id", TransactionController.getOne.bind(TransactionController));

router.post(
	"/",
	authHandler,
	TransactionController.create.bind(TransactionController)
);

router.patch(
	"/:id",
	authHandler,
	TransactionController.update.bind(TransactionController)
);

router.delete(
	"/:id",
	authHandler,
	TransactionController.delete.bind(TransactionController)
);

// Exporting the Route handler

const addTransactionRoutes = app => {
	app.use(`/transactions`, router);
};

exports.addTransactionRoutes = addTransactionRoutes;
