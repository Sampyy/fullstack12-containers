const express = require("express")
const redis = require("../redis")
const router = express.Router()
const { getAsync } = require("../redis/index")

const configs = require("../util/config")

router.get("/", async (req, res) => {
  const visitAmount = await getAsync("added_todos")
  res.send({ added_todos: visitAmount })
})

module.exports = router
