const express = require("express")

const router = express.Router()
const { getAsync } = require("../redis/index")

const configs = require("../util/config")

router.get("/", async (req, res) => {
  try {
    const visitAmount = await getAsync("added_todos")
    res.send({ added_todos: visitAmount })
  } catch (e) {
    res.send("Redis error: ", e)
  }
})

module.exports = router
