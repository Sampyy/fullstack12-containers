const express = require("express")
const { Todo } = require("../mongo")
const router = express.Router()
const { getAsync, setAsync } = require("../redis/index")

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({})
  console.log("checking if its")
  res.send(todos)
})

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  const currCounter = await getAsync("added_todos")
  console.log(currCounter)
  await setAsync("added_todos", Number(currCounter) + 1 || 1)
  res.send(todo)
})

const singleRouter = express.Router()

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete()
  res.sendStatus(200)
})

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  try {
    const todo = await req.todo
    console.log("log: ", todo)
    res.send(todo)
  } catch (e) {
    console.log("error", e)
    res.send(e) // Implement this
  }
})

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  try {
    //console.log("here: ", req.todo)
    //console.log("inputs: ", req.body.text, req.body.done)
    const newTodo = await req.todo.update({
      text: req.body.text,
      done: req.body.done
    })
    res.send(newTodo)
  } catch (e) {
    //console.log("error", e)
    res.send(e, 405) // Implement this
  }
})

router.use("/:id", findByIdMiddleware, singleRouter)

module.exports = router
