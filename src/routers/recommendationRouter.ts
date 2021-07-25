import express from "express"
import recommendationsController from "../controllers/recommendationsController"
var router = express.Router();
const RecController = new recommendationsController()

// define the home page route
router.post("/", RecController.createSong)
router.post("/:id/upvote", RecController.addVote)
router.post("/:id/downvote", RecController.removeVote)
router.get("/random", RecController.getRandom)
router.get("/top/:amount", RecController.getTopSongs)

module.exports = router;
