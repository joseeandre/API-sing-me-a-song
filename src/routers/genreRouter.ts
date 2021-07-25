import express from "express"
import genresController from "../controllers/genresController"
var router = express.Router();
const GenresController = new genresController()

// define the home page route
router.post("/", GenresController.createGenre)
router.get("/", GenresController.showGenres)

module.exports = router;
