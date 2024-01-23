import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR, ALL_BOOKS } from "../queries"
import Select from "react-select"

const AuthorForm = (props) => {
  const [name, setName] = useState("")
  const [year, setYear] = useState("")

  //const authors = [{ name: "Fyodor Dostoevsky" }, {name:"Joshua Kerievsky"}, name:"Sandi Metz"]
  const options = props.authors.map((author) => {
    return { value: author.name, label: author.name }
  })

  console.log(options)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n")
      props.setError(messages)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    const yearToSet = parseInt(year)
    editAuthor({
      variables: { name: name, setBornTo: yearToSet }
    })
  }

  const handleSelect = (option) => {
    setName(option.value)
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select options={options} onChange={handleSelect} />
        </div>
        <div>
          born
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

export default AuthorForm
