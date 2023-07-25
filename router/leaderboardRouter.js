const express = require("express");
const leaderboardController = require("../controllers/leaderboardController");
const router = express.Router();

router.get("/getLeaderboardPage", leaderboardController.getLeaderboardPage);

router.get("/getLeaderboard", leaderboardController.getLeaderboard);

module.exports = router;