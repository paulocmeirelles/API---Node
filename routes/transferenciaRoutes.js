const express = require("express");
const router = express.Router();
const transferenciaController = require("../controllers/transferenciaController");

router.route("/:id").put(transferenciaController.transferBetweenConta);
