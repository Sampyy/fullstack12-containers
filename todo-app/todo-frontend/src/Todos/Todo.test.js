import Todo from "./Todo"
import renderer from "react-test-renderer"
import React from "react"

test("Todo has correct text", () => {
  const todo = renderer.create(
    <Todo todo={{ text: "Some text on todo", done: false }} />
  )

  expect(JSON.stringify(todo)).toContain(
    "Some text on todo"
  )
})
