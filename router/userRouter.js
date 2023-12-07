const express = require("express");
const auth = require("../controller/controller");

const router = express.Router();


router.post("/sign-up", auth.signUp);

router.get("/get-users", auth.getUsers);

router.get("/get-user/:id", auth.getUser);

router.patch("/update-user/:id", auth.updateUser);

router.delete("/remove-user/:id", auth.removeUser);

router.post("/create-user", auth.createUser);

router.post("/login", auth.login);

module.exports = router;
