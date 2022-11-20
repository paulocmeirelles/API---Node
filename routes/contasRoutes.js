const express = require("express");
const router = express.Router();
const contasController = require("../controllers/contasController");

router.route("/").get(contasController.getConta);
router.route("/:id").get(contasController.getContaByCPF);
router.route("/").post(contasController.createConta);
router.route("/:id").put(contasController.updateConta);
// router.route("/:id").delete(contasController.deleteConta)
