//const { application } = require("express");

const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/places", require('./places.routes'));

module.exports = router;