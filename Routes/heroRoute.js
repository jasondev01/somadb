const express = require("express");
const { 
    fetchAndUpdate,
    getHero,
} = require("../Controller/heroController")

const router = express.Router();

router.get("/update-hero", fetchAndUpdate);
router.post("/hero", getHero);

module.exports = router;