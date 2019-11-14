const { Router } = require("express");
const ifAuth = require("../middlewares/auth");
const UserService = require("../../services/user");
const response = require("../response");

const router = Router();

module.exports = app => {
    router.get("/:month/:year", ifAuth, (req, res) =>
        UserService.audit({ user: req.body.user, ...req.params })
            .then(data => res.status(200).send(response(data, true, null)))
            .catch(err => res.status(400).send(response(null, false, err)))
    );

    app.use("/audit", router);
};
